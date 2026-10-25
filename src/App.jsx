import { useEffect, useState } from 'react'
import heroImg from './assets/Untitled.png'
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
    <main
      id="center"
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${heroImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
      }}
    >
      <section
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '24px 32px',
          borderRadius: '6px',
        }}
      >
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
      </section>
    </main>
  )
}

export default App
