import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import ScanPage from './pages/ScanPage'
import ScanResultPage from './pages/ScanResultPage.jsx'

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
          <Route path='scan/result' element={<ScanResultPage />} />
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
