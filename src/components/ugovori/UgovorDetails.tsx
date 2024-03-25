import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArtiklType, StatusType, UgovorType } from "../../types.ts";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditUgovori from "./EditUgovori.tsx";
import Artikli from "../artikli/Artikli.tsx";

const UgovorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ugovor, setUgovor] = useState<UgovorType>();
  const [artikli, setArtikli] = useState<ArtiklType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editRokIsporuke, setEditRokIsporuke] = useState<string>("");
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const getUgovor = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/ugovori/${id}`);

      setUgovor(response.data);
    } catch (error: any) {
      setErrorMessage(error.message);
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
    } catch (error: any) {
      setErrorMessage(error.message);
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
    .join("-") as string;

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
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const toggleEdit = () => {
    setIsEditVisible(!isEditVisible);
  };

  return (
    <div className="flex justify-center items-center my-10">
      {isLoading ? (
        <CircularProgress />
      ) : errorMessage !== "" ? (
        <div className="font-semibold text-lg text-red-500">{errorMessage}</div>
      ) : ugovor ? (
        <div className="bg-gray-200 rounded-xl mb-5 pt-5 px-16 border-2 border-gray-300">
          <div className="mb-4 font-semibold text-lg flex justify-between items-center">
            <div>Detalji ugovora</div>
            <div className="flex">
              <button onClick={handleDeleteUgovora} className="mr-2.5">
                <DeleteIcon style={{ color: "red" }} />
              </button>
              <button onClick={toggleEdit}>
                <EditIcon style={{ color: "blue" }} />
              </button>
            </div>
          </div>

          {isEditVisible ? (
            <EditUgovori
              ugovor={ugovor}
              editRokIsporuke={editRokIsporuke}
              setEditRokIsporuke={setEditRokIsporuke}
              format_rok_isporuke={format_rok_isporuke}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              isEditVisible={isEditVisible}
              setIsEditVisible={setIsEditVisible}
              id={id as string}
            />
          ) : (
            <>
              <div className="font-normal ">
                <span className="font-semibold">Kupac: </span>
                {ugovor.kupac}
              </div>
              <div className="font-normal">
                <span className="font-semibold">Broj ugovora: </span>
                {ugovor.broj_ugovora}
              </div>
              <div className="font-normal">
                <span className="font-semibold">Datum akontacije: </span>
                {ugovor.datum_akontancije}
              </div>
              <div className="font-normal">
                <span className="font-semibold">Rok isporuke: </span>
                {format_rok_isporuke}
              </div>
              <div className="font-normal">
                <span className="font-semibold">Status: </span>
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
              <br />{" "}
            </>
          )}

          <Artikli filteredArtikli={filteredArtikli} />

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Nazad
          </button>
        </div>
      ) : (
        <div>Nisu pronađeni detalji ugovora.</div>
      )}
    </div>
  );
};

export default UgovorDetails;
