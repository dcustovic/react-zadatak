import React from "react";
import { ArtiklType, StatusType } from "../../types.ts";

type ArtikliProps = {
  filteredArtikli: ArtiklType[];
};

function Artikli({ filteredArtikli }: ArtikliProps) {
  return (
    <section>
      {filteredArtikli.map((artikal: ArtiklType) => {
        return (
          <section
            key={artikal.id}
            className="bg-gray-100 rounded-xl py-5 px-16 mb-5 border-2 border-gray-300 hover:border-blue-400 "
          >
            <div className="mb-4 font-semibold text-lg">Detalji artikla</div>
            <div className="font-normal ">
              <b className="font-semibold">Naziv: </b>
              {artikal.naziv}
            </div>
            <div className="font-normal">
              <b className="font-semibold">Dobavljac: </b>
              {artikal.dobavljac}
            </div>
            <div className="font-normal">
              <b className="font-semibold">Broj ugovora: </b>
              {artikal.broj_ugovora}
            </div>

            <div className="font-normal">
              <b className="font-semibold">Status: </b>
              <span
                className={`
                ${
                  artikal.status === StatusType.KREIRANO
                    ? "text-green-500"
                    : artikal.status === StatusType.NARUCENO
                    ? "text-yellow-500"
                    : artikal.status === StatusType.ISPORUCENO
                    ? "text-gray-500"
                    : ""
                }
            `}
              >
                {artikal.status}
              </span>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default Artikli;
