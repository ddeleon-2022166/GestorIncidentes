import type { Incidente } from "../interfaces/incidente-interface";
import type { EstadoIncidente } from "../types/estado-type";
import type { Prioridad } from "../types/prioridad-type";

const pesoPrioridad: Record<Prioridad, number> = {
    Alta: 1,
    Media: 2,
    Baja: 3
};

export const ordenarPorPrioridad = (
    incidentes: readonly Incidente[]
): Incidente[] => {
    return [...incidentes].sort((a, b) => {
    return pesoPrioridad[a.prioridad] - pesoPrioridad[b.prioridad];
});
};

export const formatearFecha = (fecha: Date): string => {
    return fecha.toLocaleString("es-GT");
};

export const validarTexto = (texto: string): boolean => {
    return texto.trim().length > 0;
};

export const obtenerPrioridad = (valor: string): Prioridad | null => {
    const texto = valor.trim();

    if (texto === "Alta" || texto === "Media" || texto === "Baja") {
    return texto;
}

    return null;
};

export const obtenerEstado = (valor: string): EstadoIncidente | null => {
    const texto = valor.trim();

    if (
    texto === "Abierto" ||
    texto === "En Progreso" ||
    texto === "Resuelto"
) {
    return texto;
}

    return null;
};

export const obtenerNumeroPositivo = (valor: string): number | null => {
    const numero = Number(valor.trim());

    if (!Number.isInteger(numero) || numero <= 0) {
    return null;
}

    return numero;
};