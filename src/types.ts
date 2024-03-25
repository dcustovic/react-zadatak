export enum StatusType {
  KREIRANO = "KREIRANO",
  NARUCENO = "NARUČENO",
  ISPORUCENO = "ISPORUČENO",
}

export type UgovorType = {
  id: string;
  kupac: string;
  broj_ugovora: string;
  datum_akontancije: string;
  rok_isporuke: string;
  status: string;
};

export type ArtiklType = {
  id: string;
  naziv: string;
  dobavljac: string;
  status: string;
  broj_ugovora: string;
};
