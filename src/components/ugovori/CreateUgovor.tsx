import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateUgovor = () => {
  const [kupac, setKupac] = useState<string>("");
  const [brojUgovora, setBrojUgovora] = useState<string>("");
  const [datumAkontacije, setDatumAkontacije] = useState<string>("");
  const [rokIsporuke, setRokIsporuke] = useState<string>("");
  const [status, setStatus] = useState<string>("KREIRANO");
  const [formFilled, setFormFilled] = useState<boolean>(false);

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
        status: status,
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Kupac:
            <input type="text" onChange={handleKupacChange} required />
          </label>
        </div>

        <div>
          <label>
            Broj ugovora:
            <input type="text" onChange={handleBrojUgovoraChange} required />
          </label>
        </div>

        <div>
          <label>
            Datum akontacije:
            <input
              type="text"
              onChange={handleDatumAkontacijeChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Rok isporuke:
            <input type="text" onChange={handleRokIsporukeChange} required />
          </label>
        </div>

        <div>
          <label>
            Status:
            <input type="text" value={status} disabled />
          </label>
        </div>

        <br />

        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mx-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Nazad
          </button>

          <button
            type="submit"
            className="mx-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Kreiraj
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUgovor;
