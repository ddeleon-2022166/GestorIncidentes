import type { Prioridad } from "../types/prioridad-type";

export interface CreateIncidenteDTO {
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
}