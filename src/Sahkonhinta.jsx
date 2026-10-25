import { useState, useEffect } from "react";

function Sahkonhinta() {
  const [hinta, setHinta] = useState(null);
  const [virhe, setVirhe] = useState(false);

  useEffect(() => {
    async function haeHinta() {
      try {
        const res = await fetch("https://api.porssisahko.net/v2/latest-prices.json");
        const data = await res.json();
        const nyt = new Date();
        const nykyinen = data.prices.find(
          (p) => new Date(p.startDate) <= nyt && nyt < new Date(p.endDate)
        );
        setHinta(nykyinen.price);
        setVirhe(false);
      } catch {
        setVirhe(true);
      }
    }

    haeHinta();
    const id = setInterval(haeHinta, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Sähkön hinta nyt</h2>
      {virhe && <p>Hinnan haku epäonnistui</p>}
      {hinta === null && !virhe && <p>Ladataan...</p>}
      {hinta !== null && <p>{hinta.toFixed(2)} c/kWh</p>}
    </div>
  );
}

export default Sahkonhinta;

