import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(() => {
    const savedCount = window.localStorage.getItem('petterin-tyo-counter')
    return savedCount === null ? 0 : Number(savedCount)
  })

  useEffect(() => {
    window.localStorage.setItem('petterin-tyo-counter', String(count))
  }, [count])

  return (
    <main id="center">
      <h1>PETTERIN TYÖ</h1>
      <p>Laskuri: {count}</p>
      <button type="button" onClick={() => setCount((currentCount) => currentCount + 1)}>
        Kasvata laskuria
      </button>
      <button
        type="button"
        onClick={() => setCount((currentCount) => Math.max(0, currentCount - 1))}
      >
        Vähennä laskuria
      </button>
    </main>
  )
}

export default App
