import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StatusType } from "../../types.ts";

const CreateUgovor = () => {
  const [kupac, setKupac] = useState<string>("");
  const [brojUgovora, setBrojUgovora] = useState<string>("");
  const [datumAkontacije, setDatumAkontacije] = useState<string>("");
  const [rokIsporuke, setRokIsporuke] = useState<string>("");

  const navigate = useNavigate();

  const location = useLocation();
  const { ugovorId } = location.state;

  const handleKupacChange = (event) => {
    setKupac(event.target.value);
  };

  const handleBrojUgovoraChange = (event) => {
    setBrojUgovora(event.target.value);
  };

  const handleDatumAkontacijeChange = (event) => {
    setDatumAkontacije(event.target.value);
  };

  const handleRokIsporukeChange = (event) => {
    setRokIsporuke(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3300/ugovori", {
        id: ugovorId + 1,
        kupac: kupac,
        broj_ugovora: brojUgovora,
        datum_akontancije: datumAkontacije,
        rok_isporuke: rokIsporuke,
        status: StatusType.KREIRANO,
      });

      setKupac("");
      setBrojUgovora("");
      setDatumAkontacije("");
      setRokIsporuke("");
      navigate("/");
    } catch (error) {
      // TODO: handle errors
      console.error("Error creating kupac:", error);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg p-8">
        <div className="mx-1 mb-4 font-semibold text-gray-800">
          <label>
            Kupac:
            <input
              type="text"
              onChange={handleKupacChange}
              className=" w-full p-2 mt-1 text-sm rounded-xl dark:bg-gray-100 text-gray-500"
              required
            />
          </label>
        </div>

        <div className="mx-1 mb-4 font-semibold text-gray-800">
          <label>
            Broj ugovora:
            <input
              type="text"
              onChange={handleBrojUgovoraChange}
              className="w-full p-2 mt-1 text-sm rounded-xl dark:bg-gray-100 text-gray-500"
              required
            />
          </label>
        </div>

        <div className="mx-1 mb-4 font-semibold text-gray-800">
          <label>
            Datum akontacije:
            <input
              type="text"
              onChange={handleDatumAkontacijeChange}
              className="w-full p-2 mt-1 text-sm rounded-xl dark:bg-gray-100 text-gray-500"
              required
            />
          </label>
        </div>

        <div className="mx-1 mb-4 font-semibold text-gray-800">
          <label>
            Rok isporuke:
            <input
              type="text"
              onChange={handleRokIsporukeChange}
              className="w-full p-2 mt-1 text-sm rounded-xl dark:bg-gray-100 text-gray-500"
              required
            />
          </label>
        </div>

        <br />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mx-1.5 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Nazad
          </button>

          <button
            type="submit"
            className="mx-1.5 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Kreiraj
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUgovor;
