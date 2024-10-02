export interface IPlataforma {
    idPlataforma?: number;
    nombre: string;
}

export interface IJuego {
    idJuego?: number;
    nombre: string;
    precio: number;
    disponible: boolean;
    lanzamiento: Date;
    pegi: number;
    caratula?: string | null;
    caratulaFile?: File | null;
    eliminarCaratula?: boolean;
    idCategoria: number;
    nombreCategoria?: string;
    idPlataforma: number;
    nombrePlataforma?: string;
    idDesarrolladora: number;
    nombreDesarrolladora?: string;
}

export interface ICategoria {
    idCategoria?: number;
    genero: string;
    subgenero?: string;
}

export interface IDesarrolladora {
    idDesarrolladora: number;
    nombre :string;
    Indie :boolean;
    pais : string ;
}