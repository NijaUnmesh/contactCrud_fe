import { Route, Routes } from 'react-router-dom'
import './App.css'
import Contact from './pages/Contact'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contact/>}  />
      </Routes>
    </>
  )
}

export default App
