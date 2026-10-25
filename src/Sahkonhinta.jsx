import { useState, useEffect } from "react";

function Sahkonhinta() {
  const [hinta, setHinta] = useState(null);
  const [virhe, setVirhe] = useState("");

  useEffect(() => {
    async function haeHinta() {
      try {
        const res = await fetch("/api/porssisahko");
        if (!res.ok) throw new Error(`Rajapinta vastasi virheellä ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.prices)) {
          throw new Error("Rajapinnan vastauksessa ei ole hintatietoja");
        }
        const nyt = new Date();
        const nykyinen = data.prices.find(
          (p) => new Date(p.startDate) <= nyt && nyt < new Date(p.endDate)
        );
        if (!nykyinen || !Number.isFinite(nykyinen.price)) {
          throw new Error("Nykyistä hintaa ei löytynyt");
        }
        setHinta(nykyinen.price);
        setVirhe("");
      } catch (error) {
        setVirhe(error instanceof Error ? error.message : "Tuntematon virhe");
      }
    }

    haeHinta();
    const id = setInterval(haeHinta, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Sähkön hinta nyt</h2>
      {virhe && <p>Hinnan haku epäonnistui: {virhe}</p>}
      {hinta === null && !virhe && <p>Ladataan...</p>}
      {hinta !== null && <p>{hinta.toFixed(2)} c/kWh</p>}
    </div>
  );
}

export default Sahkonhinta;

