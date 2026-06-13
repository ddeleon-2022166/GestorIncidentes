import type { CreateIncidenteDTO } from "../dto/create-incidente";
import type { UpdateIncidenteDTO } from "../dto/update-incidente";
import type { IncidenteResponseDTO } from "../dto/incidente-response";
import type { Incidente } from "../interfaces/incidente-interface";

import { incidentesData, generarIdIncidente } from "../data/incidentes-data";
import {
    formatearFecha,
    ordenarPorPrioridad
} from "../utils/incidente-utils";

export class IncidenteService {
    registrarIncidente(dto: CreateIncidenteDTO): IncidenteResponseDTO {
    const nuevoIncidente: Incidente = {
        id: generarIdIncidente(),
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        reportadoPor: dto.reportadoPor,
        prioridad: dto.prioridad,
        estado: "Abierto",
        fechaCreacion: new Date()
    };

    incidentesData.push(nuevoIncidente);

    return this.convertirARespuesta(nuevoIncidente);
}

listarIncidentes(): IncidenteResponseDTO[] {
    const incidentesOrdenados = ordenarPorPrioridad(incidentesData);

    return incidentesOrdenados.map((incidente) =>
        this.convertirARespuesta(incidente)
    );
}

    cambiarEstado(
    id: number,
    dto: UpdateIncidenteDTO
): IncidenteResponseDTO | null {
    const incidenteEncontrado = incidentesData.find(
        (incidente) => incidente.id === id
    );

    if (!incidenteEncontrado) {
        return null;
    }

    incidenteEncontrado.estado = dto.estado;

    return this.convertirARespuesta(incidenteEncontrado);   }

    private convertirARespuesta(
    incidente: Incidente
): IncidenteResponseDTO {
    return {
    id: incidente.id,
    titulo: incidente.titulo,
    descripcion: incidente.descripcion,
    reportadoPor: incidente.reportadoPor,
    prioridad: incidente.prioridad,
    estado: incidente.estado,
    fechaCreacion: formatearFecha(incidente.fechaCreacion)
    };
}
}