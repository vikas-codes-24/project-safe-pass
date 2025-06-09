import { useState } from 'react'
import Navbar from "./Components/Navbar.jsx"
import Manager from "./Components/Manager.jsx"
import Footer from "./Components/Footer.jsx"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className="min-w-[80vh]">
     <Manager/>
     </div>
     <Footer/>
    </>
  )
}

export default App
