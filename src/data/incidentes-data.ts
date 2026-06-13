import type { Incidente } from "../interfaces/incidente-interface";

export const incidentesData: Incidente[] = [];

let ultimoId = 0;

export const generarIdIncidente = (): number => {
    ultimoId++;
    return ultimoId;
};