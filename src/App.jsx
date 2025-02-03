import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AiChat from './component/AiChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center'>
<AiChat/>
      
    </div>
    </>
  )
}

export default App
