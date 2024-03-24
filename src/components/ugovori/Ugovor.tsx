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
          <section
            key={u.id}
            className="bg-gray-100 rounded-xl my-5 pt-5 px-16 border-2 border-gray-300 "
          >
            <div className="font-normal ">
              <b className="font-semibold">Kupac: </b>
              {u.kupac}
            </div>
            <div className="font-normal">
              <b className="font-semibold">Broj ugovora: </b>
              {u.broj_ugovora}
            </div>
            <div className="font-normal">
              <b className="font-semibold">Rok isporuke: </b>
              {format_rok_isporuke}
            </div>
            <div className="font-normal">
              <b className="font-semibold">Status: </b>
              <span
                className={`
             ${
               u.status === StatusType.KREIRANO
                 ? "text-green-500"
                 : u.status === StatusType.NARUCENO
                 ? "text-yellow-500"
                 : u.status === StatusType.ISPORUCENO
                 ? "text-gray-500"
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
