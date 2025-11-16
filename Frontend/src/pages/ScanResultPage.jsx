import { ArrowLeft, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import {useLocation, Link} from 'react-router-dom'
import '../styles/scanresult.css'

const SCORE_WHEEL_RADIUS = 90

export default function ScanResultPage() {
  const location = useLocation()
  const {scanResult} = location.state || {}

  console.log(scanResult)

  const score = scanResult.score
  const analysis = scanResult.analysis
  const badIngredients = scanResult.ingredients_of_concern
  const recommendations = scanResult.recommended_alternative
  
  // Dynamic color based on score
  const getScoreColor = (score) => {
    if (score >= 70) return { from: '#10b981', to: '#059669', text: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 40) return { from: '#f59e0b', to: '#d97706', text: 'text-amber-600', bg: 'bg-amber-500' };
    return { from: '#ef4444', to: '#dc2626', text: 'text-red-600', bg: 'bg-red-500' };
  };

  const scoreColor = getScoreColor(score);
  const circumference = 2 * Math.PI * SCORE_WHEEL_RADIUS;
  const offset = circumference - (score / 100) * circumference;


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50/30">
      {/* Mobile Container */}
      <div className="mx-auto min-h-screen flex-col" style={{display:"grid", gridTemplateColumns:2+'fr '+3+'fr '+2+'fr'}}>

        {/* Bad Ingredients Section */}
        <div className="px-6 pb-6 flex-col" style={{marginTop:12+"px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div className="p-5 flex items-center gap-2 mb-4">
            <AlertCircle className="w-10 h-10 text-amber-600" />
            <h1 className="text-gray-900 text-lg" style={{fontSize:30+"px"}}>Bad Ingredients</h1>
          </div>
          
          <div className="space-y-3">
            {badIngredients.map((ingredient, index) => (
              <div 
                key={index}
                
                className="bg-white rounded-2xl p-4  border border-gray-100 hover:shadow-md transition-shadow scan-result-list-item"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    ingredient.severity === score > 35 ? 'text-yellow-600' :
                      ingredient.severity === score > 15 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      ingredient.severity === score > 35 ? 'text-yellow-600' :
                      ingredient.severity === score > 15 ? 'text-amber-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{ingredient.name}</h3>
                    <p className="text-sm text-gray-600">{ingredient.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 flex-col" style={{marginTop:12+"px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4" style={{width:"100%"}}>
                    <div className="flex items-center gap-3" style={{width:"100%"}}>
                        <div style={{width:"100%"}}>
                            <h1 className="text-right text-gray-900" style={{fontSize:42+"px", textAlign:"center"}}>Quest Protein Bar</h1>
                            {/* <p className="text-sm text-gray-500 text-right">Chocolate Chip</p> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Circle */}
            <div className="px-8 py-10">
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                    {/* Background Circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                        cx="96"
                        cy="96"
                        r={SCORE_WHEEL_RADIUS}
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                        />
                        {/* Progress Circle */}
                        <circle
                        cx="96"
                        cy="96"
                        r={SCORE_WHEEL_RADIUS}
                        stroke={`url(#scoreGradient)`}
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                        />
                        <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={scoreColor.from} />
                            <stop offset="100%" stopColor={scoreColor.to} />
                        </linearGradient>
                        </defs>
                    </svg>
                    
                    {/* Score Number */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={`text-5xl ${scoreColor.text}`}>{score}</div>
                        <div className="text-sm text-gray-500 mt-1">out of 100</div>
                    </div>

                    {/* Glow Effect */}
                    <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-20 -z-10"
                        style={{ backgroundColor: scoreColor.from }}
                    />
                </div>

                {/* Summary Text */}
                <div className="mt-6 text-center">
                <p className="text-gray-700 px-6 scan-result-desc">
                    {analysis}
                </p>
                </div>
            </div>
            </div>
            {/* Bottom Button */}
            <div className="px-6 pb-8 mt-auto">
                <Link to="/">
                    <button className="w-full py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-98 scan-result-button"> {/**bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white */}
                        Try Another Scan
                    </button>
                </Link>
            </div>
        </div>

        {/* Recommendations Section */}
        <div className="px-6 pb-6 flex-col" style={{marginTop:12+"px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div className="p-5 flex items-center gap-2 mb-4">
            <Sparkles className="w-10 h-10 text-amber-600" />
            <h1 className="text-gray-900 text-lg" style={{fontSize:30+"px"}}>Healthy Alternatives</h1>
          </div>

          <div className="space-y-3">
            {recommendations.map((product, index) => (
              <button
                key={index}
                className="w-full bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all flex items-center gap-4 group scan-result-list-item"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {score - product.score} Healthier
                    </span>
                    <span className="text-sm text-gray-500">Score: {product.score}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
