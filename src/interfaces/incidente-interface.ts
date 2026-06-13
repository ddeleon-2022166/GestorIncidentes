import type { EstadoIncidente } from "../types/estado-type";
import type { Prioridad } from "../types/prioridad-type";

export interface Incidente {
    readonly id: number;
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}