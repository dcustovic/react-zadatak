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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const location = useLocation();
  const { ugovor_id } = location.state;
  const ugovorId = (ugovor_id + 1).toString();

  const postData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:4000/ugovori", {
        id: ugovorId,
        kupac: kupac,
        broj_ugovora: brojUgovora,
        datum_akontacije: datumAkontacije,
        rok_isporuke: rokIsporuke,
        status: StatusType.KREIRANO,
      });

      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return errorMessage !== "" ? (
    <div className="font-semibold text-lg text-red-500">{errorMessage}</div>
  ) : (
    <div className="flex justify-center items-center my-10">
      <form
        onSubmit={postData}
        className="bg-gray-200 rounded-lg border-2 border-gray-300 p-8"
      >
        <div className="mx-1 mb-4 font-semibold text-gray-800">
          <label>
            Kupac:
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKupac(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBrojUgovora(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDatumAkontacije(e.target.value)
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRokIsporuke(e.target.value)
              }
              className="w-full p-2 mt-1 text-sm rounded-xl dark:bg-gray-100 text-gray-500"
              required
            />
          </label>
        </div>

        <br />

        <div className="flex justify-between">
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
