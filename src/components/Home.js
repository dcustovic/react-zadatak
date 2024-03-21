import React, { useEffect, useState } from "react";
import axios from "axios";
import ListUgovori from "./ugovori/ListUgovori";

const Home = () => {
  const [ugovori, setUgovori] = useState([]);
  const [isLoading, setIsLoading] = useState();

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

  return <>{isLoading ? "Loading..." : <ListUgovori ugovori={ugovori} />}</>;
};

export default Home;
