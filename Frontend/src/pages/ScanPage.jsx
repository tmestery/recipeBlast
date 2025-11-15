import {useState, useEffect} from 'react'
import {Leaf} from 'lucide-react'
import {useNavigate, useLocation, Link} from 'react-router-dom'


function LoadingScreen({progress, setProgress, maxProgress}) {
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= maxProgress) {
          clearInterval(interval);
          return maxProgress;
        }
        return prev + 2;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Logo/Icon Area */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-500 animate-spin" />
          
          {/* Inner icon container */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
            <Leaf className="w-12 h-12 text-white animate-pulse" />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/30 blur-xl -z-10 animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h1 className="text-gray-900 animate-fade-in">Loading</h1>
          <p className="text-gray-500">Preparing your experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-gray-400">
          {progress}%
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function ScanPage(){
    const [scanProgress, setScanProgress] = useState(0)
    const [maxProgress, setMaxProgress] = useState(Math.floor(Math.random*20)+20)
    const [ingredients, setIngredients] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    const {file} = location.state || {};

    useEffect(()=>{
        if(maxProgress < 95 && file != {}){
            fetchParseImage()
        } else if(maxProgress >= 95){
            fetchLLMAnalyze()
        }
    }, [maxProgress])

    async function fetchParseImage(){
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://localhost:8080/imagetext/parse', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formData
            })
            const result = await response.json()
            if(response.ok){
                setIngredients(result.body)
                setMaxProgress(95)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchParseImage(){
        try {
            const response = await fetch('http://localhost:8080/llm/analyze', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ingredients)
            })
            if(response.ok){
                setMaxProgress(100)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    
    return(
    <>
    <LoadingScreen progress={scanProgress} setProgress={setScanProgress} maxProgress={maxProgress} />
    </>
    )
}