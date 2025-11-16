import { ArrowLeft, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

export default function ScanResultPage() {
  const score = 1100; // 0-100 scale
  
  // Dynamic color based on score
  const getScoreColor = (score) => {
    if (score >= 70) return { from: '#10b981', to: '#059669', text: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 40) return { from: '#f59e0b', to: '#d97706', text: 'text-amber-600', bg: 'bg-amber-500' };
    return { from: '#ef4444', to: '#dc2626', text: 'text-red-600', bg: 'bg-red-500' };
  };

  const scoreColor = getScoreColor(score);
  const circumference = 2 * Math.PI * 70; // radius = 70
  const offset = circumference - (score / 100) * circumference;

  const badIngredients = [
    {
      name: 'Palm Oil',
      description: 'Linked to deforestation and high in saturated fat',
      severity: 'high'
    },
    {
      name: 'Sucralose (Artificial Sweetener)',
      description: 'May affect gut bacteria and glucose metabolism',
      severity: 'medium'
    },
    {
      name: 'Soy Lecithin',
      description: 'Often GMO, possible allergen for some individuals',
      severity: 'low'
    }
  ];

  const recommendations = [
    {
      name: 'RXBAR Chocolate Sea Salt',
      image: 'https://images.unsplash.com/photo-1621470626617-5cee4f3af434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZ3Jhbm9sYSUyMGJhcnxlbnwxfHx8fDE3NjI5MjYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+28',
      score: 86
    },
    {
      name: 'KIND Dark Chocolate',
      image: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZW5lcmd5JTIwYmFyfGVufDF8fHx8MTc2MjkyNjIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+22',
      score: 80
    },
    {
      name: 'Lärabar Peanut Butter',
      image: 'https://images.unsplash.com/photo-1729010807571-3b61bf01e2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcHJvdGVpbiUyMHNuYWNrfGVufDF8fHx8MTc2MjkyNjIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+20',
      score: 78
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50/30">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen flex flex-col">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-right text-gray-900">Quest Protein Bar</h1>
                <p className="text-sm text-gray-500 text-right">Chocolate Chip</p>
              </div>
              {/* <ImageWithFallback
                src="https://images.unsplash.com/photo-1704650312560-4414980bab95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwYmFyJTIwbnV0cml0aW9ufGVufDF8fHx8MTc2MjkyNjIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Quest Protein Bar"
                className="w-16 h-16 rounded-2xl object-cover shadow-md"
              /> */}
            </div>
          </div>
        </div>

        {/* Score Circle */}
        <div className="px-6 py-8">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              {/* Background Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="70"
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
              <p className="text-gray-700 px-6">
                Moderate processing. Contains a few questionable additives.
              </p>
            </div>
          </div>
        </div>

        {/* Bad Ingredients Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-gray-900">Ingredients to Watch</h2>
          </div>
          
          <div className="space-y-3">
            {badIngredients.map((ingredient, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    ingredient.severity === 'high' ? 'bg-red-100' :
                    ingredient.severity === 'medium' ? 'bg-amber-100' : 'bg-yellow-100'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      ingredient.severity === 'high' ? 'text-red-600' :
                      ingredient.severity === 'medium' ? 'text-amber-600' : 'text-yellow-600'
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

        {/* Recommendations Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-600" />
            <h2 className="text-gray-900">Healthier Alternatives</h2>
          </div>

          <div className="space-y-3">
            {recommendations.map((product, index) => (
              <button
                key={index}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all flex items-center gap-4 group"
              >
                {/* <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                /> */}
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {product.improvement} Healthier
                    </span>
                    <span className="text-sm text-gray-500">Score: {product.score}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 pb-8 mt-auto">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all active:scale-98">
            Try Another Scan
          </button>
        </div>
      </div>
    </div>
  );
}
