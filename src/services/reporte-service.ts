import type { IncidenteResponseDTO } from "../dto/incidente-response";
import type { ReporteC27 } from "../interfaces/reporte-interface";
import type { Prioridad } from "../types/prioridad-type";

import { IncidenteService } from "./incidente-service";

export class ReporteService {
    constructor(private readonly incidenteService: IncidenteService) {}

    generarReporte(): ReporteC27 {
    const incidentes: IncidenteResponseDTO[] =
        this.incidenteService.listarIncidentes();

    const cantidadPorPrioridad: Record<Prioridad, number> = {
        Alta: 0,
        Media: 0,
        Baja: 0
    };

    for (const incidente of incidentes) {
        cantidadPorPrioridad[incidente.prioridad]++;
    }

    return {
        total: incidentes.length,
        abiertos: incidentes.filter(
        (incidente) => incidente.estado === "Abierto"
        ).length,
        enProgreso: incidentes.filter(
        (incidente) => incidente.estado === "En Progreso"
        ).length,
        resueltos: incidentes.filter(
        (incidente) => incidente.estado === "Resuelto"
        ).length,
        cantidadPorPrioridad,
        incidentes
    };
}
}