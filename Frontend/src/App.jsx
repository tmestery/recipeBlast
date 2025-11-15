import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import ScanPage from './pages/ScanPage'

function App() {
  const [userInfo, setUserInfo] = useState({
    username: ""
  })

  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage userInfo={userInfo} />} />
          <Route path='history' element={<HistoryPage userInfo={userInfo} />} />
          <Route path='profile' element={<ProfilePage userInfo={userInfo} />} />
          <Route path='scan' element={<ScanPage />} />
        </Route>
        <Route path='/auth/'>
          <Route path='login' element={<LoginPage setUserInfo={setUserInfo} />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App

// import { Leaf } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center overflow-hidden">
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center gap-8">
        
//         {/* Logo/Icon Area */}
//         <div className="relative">
//           {/* Outer rotating ring */}
//           <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-500 animate-spin" />
          
//           {/* Inner icon container */}
//           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
//             <Leaf className="w-12 h-12 text-white animate-pulse" />
//           </div>

//           {/* Glow effect */}
//           <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/30 blur-xl -z-10 animate-pulse" />
//         </div>

//         {/* Loading Text */}
//         <div className="text-center space-y-2">
//           <h1 className="text-gray-900 animate-fade-in">Loading</h1>
//           <p className="text-gray-500">Preparing your experience...</p>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         {/* Progress Percentage */}
//         <div className="text-sm text-gray-400">
//           {progress}%
//         </div>
//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }