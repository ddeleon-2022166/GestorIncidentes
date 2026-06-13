import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import type { CreateIncidenteDTO } from "./dto/create-incidente";
import type { IncidenteResponseDTO } from "./dto/incidente-response";
import type { EstadoIncidente } from "./types/estado-type";
import type { Prioridad } from "./types/prioridad-type";

import { IncidenteService } from "./services/incidente-service";
import { ReporteService } from "./services/reporte-service";

import {
    obtenerEstado,
    obtenerNumeroPositivo,
    obtenerPrioridad,
    validarTexto
} from "./utils/incidente-utils";

const rl = readline.createInterface({ input, output });

const incidenteService = new IncidenteService();
const reporteService = new ReporteService(incidenteService);

const mostrarMenu = (): void => {
    console.log("\n===== GESTOR DE INCIDENTES =====\n");
    console.log("1. Registrar incidente");
    console.log("2. Listar incidentes");
    console.log("3. Cambiar estado");
    console.log("4. Generar reporte");
    console.log("5. Salir");
};

const preguntarTexto = async (mensaje: string): Promise<string> => {
    while (true) {
    const respuesta = await rl.question(mensaje);

    if (validarTexto(respuesta)) {
        return respuesta.trim();
    }

    console.log("El campo no puede estar vacío.");
}
};

const preguntarPrioridad = async (): Promise<Prioridad> => {
    while (true) {
    const respuesta = await rl.question("Prioridad (Alta, Media, Baja): ");
    const prioridad = obtenerPrioridad(respuesta);

    if (prioridad !== null) {
        return prioridad;
    }

    console.log("Prioridad inválida. Usa: Alta, Media o Baja.");
}
};

const preguntarEstado = async (): Promise<EstadoIncidente> => {
    while (true) {
    const respuesta = await rl.question(
        "Nuevo estado (Abierto, En Progreso, Resuelto): "
    );

    const estado = obtenerEstado(respuesta);

    if (estado !== null) {
        return estado;
    }

    console.log("Estado inválido. Usa: Abierto, En Progreso o Resuelto.");
}
};

const preguntarId = async (): Promise<number> => {
    while (true) {
    const respuesta = await rl.question("ID del incidente: ");
    const id = obtenerNumeroPositivo(respuesta);

    if (id !== null) {
        return id;
    }

    console.log("ID inválido. Debe ser un número entero positivo.");
}
};

const imprimirIncidente = (incidente: IncidenteResponseDTO): void => {
    console.log("----------------------------------------");
    console.log(`ID: ${incidente.id}`);
    console.log(`Título: ${incidente.titulo}`);
    console.log(`Descripción: ${incidente.descripcion}`);
    console.log(`Reportado por: ${incidente.reportadoPor}`);
    console.log(`Prioridad: ${incidente.prioridad}`);
    console.log(`Estado: ${incidente.estado}`);
    console.log(`Fecha creación: ${incidente.fechaCreacion}`);
};

const registrarIncidente = async (): Promise<void> => {
    console.log("\n--- Registrar incidente ---");

    const titulo = await preguntarTexto("Título: ");
    const descripcion = await preguntarTexto("Descripción: ");
    const reportadoPor = await preguntarTexto("Reportado por: ");
    const prioridad = await preguntarPrioridad();

    const dto: CreateIncidenteDTO = {
    titulo,
    descripcion,
    reportadoPor,
    prioridad
};

    const incidenteCreado = incidenteService.registrarIncidente(dto);

    console.log("\nIncidente registrado correctamente.");
    imprimirIncidente(incidenteCreado);
};

const listarIncidentes = (): void => {
    console.log("\n--- Listado de Incidentes ---");

    const incidentes = incidenteService.listarIncidentes();

    if (incidentes.length === 0) {
        console.log("No hay incidentes registrados.");
    return;
}

    for (const incidente of incidentes) {
        imprimirIncidente(incidente);
}
};

const cambiarEstado = async (): Promise<void> => {
    console.log("\n--- Cambiar estado de incidente ---");

    const id = await preguntarId();
    const nuevoEstado = await preguntarEstado();

    const incidenteActualizado = incidenteService.cambiarEstado(id, {
    estado: nuevoEstado
});

    if (incidenteActualizado === null) {
        console.log("No existe un incidente con ese ID.");
    return;
}

    console.log("\nEstado actualizado correctamente.");
    imprimirIncidente(incidenteActualizado);
};

const generarReporte = (): void => {
    console.log("\n========== REPORTE DE INCIDENTES ==========");

    const reporte = reporteService.generarReporte();

    console.log(`Total de incidentes: ${reporte.total}`);
    console.log(`Incidentes abiertos: ${reporte.abiertos}`);
    console.log(`Incidentes en progreso: ${reporte.enProgreso}`);
    console.log(`Incidentes resueltos: ${reporte.resueltos}`);

    console.log("\nCantidad por prioridad:");
    console.log(`Alta: ${reporte.cantidadPorPrioridad.Alta}`);
    console.log(`Media: ${reporte.cantidadPorPrioridad.Media}`);
    console.log(`Baja: ${reporte.cantidadPorPrioridad.Baja}`);

    console.log("\nListado completo ordenado por prioridad:");

    if (reporte.incidentes.length === 0) {
        console.log("No hay incidentes registrados.");
    return;
}

    for (const incidente of reporte.incidentes) {
    imprimirIncidente(incidente);
}
};

const main = async (): Promise<void> => {
    let continuar = true;

    while (continuar) {
    mostrarMenu();

    const opcion = await rl.question("\nSelecciona una opción: ");

    switch (opcion.trim()) {
    case "1":
        await registrarIncidente();
        break;

    case "2":
        listarIncidentes();
        break;

    case "3":
        await cambiarEstado();
        break;

    case "4":
        generarReporte();
        break;

    case "5":
        continuar = false;
        console.log("Saliendo...");
        break;

    default:
        console.log("Opción inválida. Intente de nuevo.");
        break;
    }
}
    rl.close();
};

main().catch((error: unknown) => {
    const mensaje =
    error instanceof Error ? error.message : "Error desconocido.";
    console.error(`Error inesperado: ${mensaje}`);
    rl.close();
});