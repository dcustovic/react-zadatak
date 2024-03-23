 export enum StatusType {
    KREIRANO = "KREIRANO",
    NARUCENO = "NARUČENO",
    ISPORUCENO = "ISPORUČENO",
}

export type UgovorType = {
    id: number;
    kupac: string;
    broj_ugovora: string;
    datum_akontacije: string;
    rok_isporuke: string;
    status: string;
  }