import React, { useEffect, useState } from "react";
import axios from "axios";
import ListUgovori from "./ugovori/ListUgovori.tsx";
import { StatusType, UgovorType } from "../types.ts";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [ugovori, setUgovori] = useState<UgovorType[]>([]);
  const [aktivniUgovori, setAktivniUgovori] = useState<UgovorType[]>([]);
  const [neaktivniUgovori, setNeaktivniUgovori] = useState<UgovorType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("svi");
  const [kupacFilter, setKupacFilter] = useState<string>("svi");

  const navigate = useNavigate();

  const getUgovori = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/ugovori");
      setUgovori(response.data);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
    // Simuliranje dohvat podataka sa "servera"
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleKupacFilter = (event) => {
    setKupacFilter(event.target.value);
  };

  useEffect(() => {
    getUgovori();
  }, []);

  useEffect(() => {
    const aktivniUgovori = ugovori.filter(
      (u) =>
        u.status === StatusType.KREIRANO || u.status === StatusType.NARUCENO
    );
    setAktivniUgovori(aktivniUgovori);

    const neaktivniUgovori = ugovori.filter(
      (u) => u.status === StatusType.ISPORUCENO
    );
    setNeaktivniUgovori(neaktivniUgovori);
  }, [ugovori]);

  const ugovor_last_item = ugovori.length;

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg bg-gray-200 my-10 p-8 max-w-lg w-full">
        <div className="flex justify-center items-center mb-4">
          {/* Filters */}

          <form>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Po kupcu
            </label>

            <select
              value={kupacFilter}
              onChange={handleKupacFilter}
              className="p-1 mr-1.5 text-sm rounded-xl dark:bg-gray-500 dark:text-white"
            >
              <option value="svi">Svi</option>

              {ugovori.map((u: UgovorType) => {
                return (
                  <option key={u.id} value={u.kupac}>
                    {u.kupac}
                  </option>
                );
              })}
            </select>
          </form>

          <form>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Po aktivnosti
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="p-1 text-sm rounded-xl dark:bg-gray-500 dark:text-white"
            >
              <option value="svi">Svi</option>
              <option value="aktivni">Aktivni</option>
              <option value="neaktivni">Neaktivni</option>
            </select>
          </form>
        </div>

        {/* Data */}

        {isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <ListUgovori
              ugovori={
                statusFilter === "aktivni"
                  ? aktivniUgovori.filter((u) =>
                      kupacFilter === "svi" ? true : u.kupac === kupacFilter
                    )
                  : statusFilter === "neaktivni"
                  ? neaktivniUgovori.filter((u) =>
                      kupacFilter === "svi" ? true : u.kupac === kupacFilter
                    )
                  : statusFilter === "svi"
                  ? ugovori.filter((u) =>
                      kupacFilter === "svi" ? true : u.kupac === kupacFilter
                    )
                  : []
              }
            />
          </div>
        )}

        <button
          onClick={() =>
            navigate("create-ugovor", {
              state: { ugovor_id: ugovor_last_item },
            })
          }
          className="mx-1 mt-3 px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
        >
          Novi ugovor
        </button>
      </div>
    </div>
  );
};

export default Home;
