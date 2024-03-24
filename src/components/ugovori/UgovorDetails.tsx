import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArtiklType, StatusType, UgovorType } from "../../types.ts";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function UgovorDetails() {
  const { id } = useParams<{ id: string }>();
  const [ugovor, setUgovor] = useState<UgovorType>();
  const [artikli, setArtikli] = useState<ArtiklType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getUgovor = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/ugovori/${id}`);

      setUgovor(response.data);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }

    // Simuliranje dohvat podataka sa "servera"
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const getArtikli = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/artikli`);
      setArtikli(response.data);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }

    // Simuliranje dohvat podataka sa "servera"
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    getUgovor();
    getArtikli();
  }, []);

  const format_rok_isporuke = ugovor?.rok_isporuke
    .split("-")
    .reverse()
    .join("-");

  // Filter artikli u odnosu na broj_ugovora
  const filteredArtikli = artikli.filter((artikal: ArtiklType) => {
    if (artikal && ugovor) {
      return artikal.broj_ugovora === ugovor.broj_ugovora;
    }
  });

  const handleDeleteUgovora = async () => {
    try {
      await axios.delete(`http://localhost:4000/ugovori/${id}`);
      navigate(-1);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  const handleEditUgovora = async () => {};

  return (
    <div className="flex justify-center items-center my-10">
      {isLoading ? (
        <CircularProgress />
      ) : ugovor ? (
        <div className="bg-gray-200 rounded-xl mb-5 pt-5 px-16 border-2 border-gray-300">
          <div className="mb-4 font-semibold text-lg flex justify-between items-center">
            <div>Detalji ugovora</div>
            <div className="flex">
              <button onClick={handleDeleteUgovora}>
                <DeleteIcon style={{ color: "red" }} />
              </button>
              <button onClick={handleEditUgovora}>
                <EditIcon style={{ color: "blue" }} />
              </button>
            </div>
          </div>

          <div className="font-normal ">
            <b className="font-semibold">Kupac: </b>
            {ugovor.kupac}
          </div>
          <div className="font-normal">
            <b className="font-semibold">Broj ugovora: </b>
            {ugovor.broj_ugovora}
          </div>
          <div className="font-normal">
            <b className="font-semibold">Datum akontacije: </b>
            {ugovor.datum_akontacije}
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
               ugovor.status === StatusType.KREIRANO
                 ? "text-green-500"
                 : ugovor.status === StatusType.NARUCENO
                 ? "text-yellow-500"
                 : ugovor.status === StatusType.ISPORUCENO
                 ? "text-gray-500"
                 : ""
             }
           `}
            >
              {ugovor.status}
            </span>
          </div>

          <br />

          <section>
            {filteredArtikli.map((artikal: ArtiklType) => {
              return (
                <section
                  key={artikal.id}
                  className="bg-gray-100 rounded-xl py-5 px-16 mb-5 border-2 border-gray-300 hover:border-blue-400 "
                >
                  <div className="mb-4 font-semibold text-lg">
                    Detalji artikla
                  </div>
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
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-5 mx-1.5 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Nazad
          </button>
        </div>
      ) : (
        <div>Nisu pronađeni detalji ugovora.</div>
      )}
    </div>
  );
}

export default UgovorDetails;
