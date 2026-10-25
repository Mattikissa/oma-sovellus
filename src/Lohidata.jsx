import { useState, useEffect } from "react";

const URL =
  "/api/lohidata?lang=en" +
  "&valuecodes%5BTid%5D=top%288%29" +
  "&valuecodes%5BContentsCode%5D=%2A" +
  "&valuecodes%5BVaregrupper2%5D=01" +
  "&outputformat=csv" +
  "&stub=Tid" +
  "&heading=ContentsCode";

function parsiCsvRivi(rivi) {
  const arvot = [];
  let arvo = "";
  let lainausmerkeissa = false;

  for (let i = 0; i < rivi.length; i += 1) {
    const merkki = rivi[i];
    if (merkki === '"') {
      if (lainausmerkeissa && rivi[i + 1] === '"') {
        arvo += '"';
        i += 1;
      } else {
        lainausmerkeissa = !lainausmerkeissa;
      }
    } else if (merkki === "," && !lainausmerkeissa) {
      arvot.push(arvo);
      arvo = "";
    } else {
      arvo += merkki;
    }
  }

  arvot.push(arvo);
  return arvot;
}

function parsiCsv(teksti) {
  const [otsikkorivi, datarivi] = teksti.trim().split(/\r?\n/);
  if (!otsikkorivi || !datarivi) return [];

  const otsikot = parsiCsvRivi(otsikkorivi);
  const arvot = parsiCsvRivi(datarivi);
  const viikot = new Map();

  otsikot.forEach((otsikko, i) => {
    const osuma = otsikko.match(/^(Vekt|Kilopris) (\d{4}U\d{2})$/);
    if (!osuma) return;

    const [, mittari, jakso] = osuma;
    const viikkodata = viikot.get(jakso) || { Tid: jakso };
    viikkodata[mittari] = arvot[i];
    viikot.set(jakso, viikkodata);
  });

  return Array.from(viikot.values()).sort((a, b) => a.Tid.localeCompare(b.Tid));
}

// "2026U38" -> "Viikko 38/2026"
function viikko(koodi) {
  const [vuosi, vko] = koodi.split("U");
  return `Viikko ${vko}/${vuosi}`;
}

function Lohidata() {
  const [rivit, setRivit] = useState(null);
  const [virhe, setVirhe] = useState(false);

  useEffect(() => {
    async function hae() {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Virhe " + res.status);
        const teksti = await res.text();
        setRivit(parsiCsv(teksti));
      } catch (e) {
        console.error(e);
        setVirhe(true);
      }
    }
    hae();
  }, []);

  return (
    <div>
      <h2>Norjan lohenvienti viikoittain</h2>
      {virhe && <p>Datan haku epäonnistui</p>}
      {!rivit && !virhe && <p>Ladataan...</p>}
      {rivit && (
        <table>
          <thead>
            <tr>
              <th>Jakso</th>
              <th>Vekt</th>
              <th>Kilopris</th>
            </tr>
          </thead>
          <tbody>
            {rivit.map((r) => (
              <tr key={r.Tid}>
                <td>{viikko(r.Tid)}</td>
                <td>{r.Vekt}</td>
                <td>{r.Kilopris}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Lohidata;
