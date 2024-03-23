import React, { useEffect, useState } from "react";
import axios from "axios";
import ListUgovori from "./ugovori/ListUgovori.tsx";
import { StatusType, UgovorType } from "../types.ts";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [ugovori, setUgovori] = useState<UgovorType[]>([]);
  const [aktivniUgovori, setAktivniUgovori] = useState<UgovorType[]>([]);
  const [neaktivniUgovori, setNeaktivniUgovori] = useState<UgovorType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("svi");
  const [kupacFilter, setKupacFilter] = useState<string>("svi");

  const navigate = useNavigate();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("kupoprodajni_ugovori.json");
      setUgovori(response.data.ugovori);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleKupacFilter = (event) => {
    setKupacFilter(event.target.value);
  };

  useEffect(() => {
    getData();
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

  const ugovorId = ugovori.length;

  return (
    <>
      <select value={"statusFilter"} onChange={handleStatusFilter}>
        <option value="svi">Svi</option>
        <option value="aktivni">Aktivni</option>
        <option value="neaktivni">Neaktivni</option>
      </select>

      <select value={kupacFilter} onChange={handleKupacFilter}>
        <option value="svi">Svi</option>

        {ugovori.map((u: UgovorType) => {
          return (
            <option key={u.id} value={u.kupac}>
              {u.kupac}
            </option>
          );
        })}
      </select>

      {isLoading ? (
        "Loading..."
      ) : (
        <>
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
        </>
      )}

      <button
        onClick={() =>
          navigate("create-ugovor", { state: { ugovorId: ugovorId } })
        }
        className="mx-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
      >
        Novi ugovor
      </button>
    </>
  );
};

export default Home;
