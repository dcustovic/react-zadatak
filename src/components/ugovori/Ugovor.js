import React from "react";

const Ugovor = ({ ugovori }) => {
  return (
    <>
      {ugovori.map((u) => {
        const format_rok_isporuke = u.rok_isporuke
          .split("-")
          .reverse()
          .join("-");

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
              {format_rok_isporuke}
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
};

export default Ugovor;
