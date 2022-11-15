export interface Autor {
    _id: string;
    nombre: string
}

export interface Autores {
    existen: string;
    error: string;
    mensajes: Autor[];
}
