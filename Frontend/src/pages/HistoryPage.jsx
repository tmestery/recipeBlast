import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/homepage.css'

export default function HistoryPage({userInfo}){
    const [scanList, setScanList] = useState([])
    const [filtered, setFiltered] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getScans()
    }, [])

    async function getScans(){
        try {
            const response = await fetch('url') 
            const result = await response.json()
            setScanList(result)
            setFiltered(result)
        } catch (error) {
            console.log(error.message)
        }
    }

    function handleChange(event){

    }
    

    return(
    <>
    <Navbar />
    {userInfo.username ? 
    <h1 className="page-header">Welcome, {userInfo.username}!</h1> : 
    <h1 className="page-header">Welcome to RecipeBlast!</h1>}
    <input type="text" name="searchbar" placeholder="Search for some scans" onChange={handleChange} />
    <hr />

    <div className="page-content">

    </div>
    </>
    )
}