import React from "react";

function Ugovor({ ugovori }) {
  return (
    <>
      {ugovori.map((u) => {
        return (
          <div key={u.id}>
            <div>
              <b>Kupac: </b>
              {u.kupac}
            </div>
            <div>
              <b>Broj ugovora: </b>
              {u.broj_ugovora}
            </div>
            <div>
              <b>Rok isporuke: </b>
              {u.rok_isporuke}
            </div>
            <div>
              <b>Status: </b>
              {u.status}
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Ugovor;
