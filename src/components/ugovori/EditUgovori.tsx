import React, { useState } from "react";
import { StatusType, UgovorType } from "../../types.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UgovorProps = {
  ugovor: UgovorType;
  editRokIsporuke: string;
  setEditRokIsporuke: React.Dispatch<React.SetStateAction<string>>;
  format_rok_isporuke: string;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  isEditVisible: boolean;
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const EditUgovori = ({
  ugovor,
  editRokIsporuke,
  setEditRokIsporuke,
  format_rok_isporuke,
  selectedStatus,
  setSelectedStatus,
  isEditVisible,
  setIsEditVisible,
  id,
}: UgovorProps) => {
  const navigate = useNavigate();
  const toggleEdit = () => {
    setIsEditVisible(!isEditVisible);
  };
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEditUgovora = async () => {
    try {
      await axios.put(`http://localhost:4000/ugovori/${id}`, {
        ...ugovor,
        rok_isporuke: editRokIsporuke ? editRokIsporuke : format_rok_isporuke,
        status: selectedStatus ? selectedStatus : ugovor?.status,
      });

      toggleEdit();

      navigate(0);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return errorMessage !== "" ? (
    <div className="font-semibold text-lg text-red-500">{errorMessage}</div>
  ) : (
    <div>
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

      {/* Editable rok_isporuke */}
      <div className="font-normal">
        <span className="font-semibold">Rok isporuke: </span>
        {ugovor.status !== StatusType.ISPORUCENO ? (
          <input
            type="text"
            className="p-0.5 mt-1 text-sm rounded-md dark:bg-gray-100 text-gray-500"
            value={editRokIsporuke ? editRokIsporuke : format_rok_isporuke}
            onChange={(e) => setEditRokIsporuke(e.target.value)}
          />
        ) : (
          <span className="font-normal">{format_rok_isporuke}</span>
        )}
      </div>

      {/* Editable status */}
      <div className="font-normal">
        <span className="font-semibold">Status: </span>
        <select
          value={selectedStatus ? selectedStatus : ugovor.status}
          className="p-0.5 mt-1 text-sm rounded-md dark:bg-gray-100 text-gray-500"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {ugovor.status === StatusType.KREIRANO && (
            <>
              <option value={StatusType.KREIRANO}>KREIRANO</option>
              <option value={StatusType.NARUCENO}>NARUCENO</option>
            </>
          )}
          {ugovor.status === StatusType.NARUCENO && (
            <>
              <option value={StatusType.NARUCENO}>NARUCENO</option>
              <option value={StatusType.ISPORUCENO}>ISPORUCENO</option>
            </>
          )}
          {ugovor.status === StatusType.ISPORUCENO && (
            <option value={StatusType.ISPORUCENO}>ISPORUCENO</option>
          )}
        </select>
      </div>

      <div>
        <button
          onClick={handleEditUgovora}
          className="mt-3 mr-2 mb-7 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
        >
          Ažuriraj
        </button>
        <button
          onClick={toggleEdit}
          className="mr-2 px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-300 outline outline-1"
        >
          Poništi
        </button>
      </div>
    </div>
  );
};

export default EditUgovori;
