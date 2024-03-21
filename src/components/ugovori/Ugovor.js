import React from "react";

function Ugovor({ ugovori }) {
  return (
    <>
      {ugovori.map((u) => {
        return (
          <div key={u.id}>
            <div>{u.kupac}</div>
            <div>{u.broj_ugovora}</div>
            <div>{u.rok_isporuke}</div>
            <div>{u.status}</div>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Ugovor;
