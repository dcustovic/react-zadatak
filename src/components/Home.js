import React, { useEffect, useState } from "react";
import axios from "axios";
import ListUgovori from "./ugovori/ListUgovori";
import { StatusType } from "../types.d.ts";

const Home = () => {
  const [ugovori, setUgovori] = useState([]);
  const [aktivniUgovori, setAktivniUgovori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filteredUgovori = ugovori.filter(
      (u) =>
        u.status === StatusType.KREIRANO || u.status === StatusType.NARUCENO
    );
    setAktivniUgovori(filteredUgovori);
  }, [ugovori]);

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Svi ugovori" : "Aktivni ugovori"}
      </button>

      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ListUgovori ugovori={isActive ? aktivniUgovori : ugovori} />
        </>
      )}
    </>
  );
};

export default Home;
