import React from "react";
import Ugovor from "./Ugovor.tsx";
import { UgovorType } from "../../types.ts";

type UgovorProps = {
  ugovori: UgovorType[];
};

const ListUgovori = ({ ugovori }: UgovorProps) => {
  return <Ugovor ugovori={ugovori} />;
};

export default ListUgovori;
