import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id="center">
      <h1>PETTERIN TYÖ</h1>
      <p>Laskuri: {count}</p>
      <button type="button" onClick={() => setCount((currentCount) => currentCount + 1)}>
        Kasvata laskuria
      </button>
    </main>
  )
}

export default App
