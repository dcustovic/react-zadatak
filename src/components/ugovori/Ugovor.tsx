import React from "react";
import { StatusType } from "../../types.ts";

const Ugovor = ({ ugovori }) => {
  return (
    <>
      {ugovori.map((u, index) => {
        const format_rok_isporuke = u.rok_isporuke
          .split("-")
          .reverse()
          .join("-");

        return (
          <section key={u.id}>
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
              <span
                className={`
             ${
               u.status === StatusType.KREIRANO
                 ? "text-green-400"
                 : u.status === StatusType.NARUCENO
                 ? "text-yellow-400"
                 : u.status === StatusType.ISPORUCENO
                 ? "text-gray-400"
                 : ""
             }
           `}
              >
                {u.status}
              </span>
            </div>
            <br />
          </section>
        );
      })}
    </>
  );
};

export default Ugovor;
