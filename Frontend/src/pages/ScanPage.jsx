import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import LoadingScreen from '../components/Loading.jsx'

const MAX_PROGRESS_IMAGEPARSE = 94
const MAX_PROGRESS_LLMANALYZE = 99
const MAX_PROGRESS = 100

export default function ScanPage(){
    const [scanProgress, setScanProgress] = useState(0)
    const [maxProgress, setMaxProgress] = useState(MAX_PROGRESS_IMAGEPARSE)
    const [ingredients, setIngredients] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const {file} = location.state || {}
    const {productName} = location.state|| {}

    useEffect(()=>{
      console.log(maxProgress)
      if(maxProgress < MAX_PROGRESS_LLMANALYZE && file != {}){
        fetchParseImage()
      } else if(maxProgress >= MAX_PROGRESS_LLMANALYZE){
        fetchLLMAnalyze()
      } 
    }, [maxProgress])

    async function fetchParseImage(){
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("language", "eng")
            formData.append("isOverlayRequired", "false")
            formData.append("OCREngine", "2")

            const response = await fetch('http://localhost:8080/imagetext/parse', {
                method: "POST",
                body: formData
            })
            const result = await response.json()
            if(response.ok){
                setIngredients(result)
                console.log("Result:\n"+result)
                console.log("Response:\n"+response)
                setScanProgress(MAX_PROGRESS_IMAGEPARSE)
                setMaxProgress(MAX_PROGRESS_LLMANALYZE)
            }
        } catch(error) {
            console.error(error.message)
        }
    }

    async function fetchLLMAnalyze(){
        try {
            console.log(JSON.stringify({productName: productName, ingredientsList: ingredients.ParsedResults[0]?.ParsedText}))

            const response = await fetch('http://localhost:8080/llm/analyze', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({productName: productName, ingredientsList: ingredients.ParsedResults[0]?.ParsedText})
            })
            const result = await response.json()
            if(response.ok){
              console.log(result)
              setScanProgress(MAX_PROGRESS)
              navigate('/scan/result', {state : {scanResult: result}})
            }         
        } catch (error) {
            console.error(error.message)
        }
    }
    
    return <LoadingScreen progress={scanProgress} setProgress={setScanProgress} maxProgress={maxProgress} />
}