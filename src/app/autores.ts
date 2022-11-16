export interface Cita {
    _id: string;
    cita: string
    votos:number
}

export interface Autor {
    _id: string;
    nombre: string
    citas: Cita[]
}

export interface Autores {
    existen: string;
    error: string;
    mensajes: Autor[];
}
