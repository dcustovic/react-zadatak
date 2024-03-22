import React, { useEffect, useState } from "react";
import axios from "axios";
import ListUgovori from "./ugovori/ListUgovori";
import { StatusType } from "../types.d.ts";

const Home = () => {
  const [ugovori, setUgovori] = useState([]);
  const [aktivniUgovori, setAktivniUgovori] = useState([]);
  const [neaktivniUgovori, setNeaktivniUgovori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("svi");
  const [kupacFilter, setKupacFilter] = useState("svi");

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("kupoprodajni_ugovori.json");
      setUgovori(response.data);
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

  // Use effect
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

  const uniqueKupci = [...new Set(ugovori.map((u) => u.kupac))];

  return (
    <>
      <select value={statusFilter} onChange={handleStatusFilter}>
        <option value="svi">Svi</option>
        <option value="aktivni">Aktivni</option>
        <option value="neaktivni">Neaktivni</option>
      </select>

      <select value={kupacFilter} onChange={handleKupacFilter}>
        <option value="svi">Svi</option>

        {uniqueKupci.map((kupac) => (
          <option key={kupac} value={kupac}>
            {kupac}
          </option>
        ))}
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
    </>
  );
};

export default Home;
