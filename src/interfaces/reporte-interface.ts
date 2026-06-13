import type { IncidenteResponseDTO } from "../dto/incidente-response";
import type { Prioridad } from "../types/prioridad-type";

export interface ReporteC27 {
    total: number;
    abiertos: number;
    enProgreso: number;
    resueltos: number;
    cantidadPorPrioridad: Record<Prioridad, number>;
    incidentes: IncidenteResponseDTO[];
}