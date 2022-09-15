export type Projeto = {
    id?: number,
    nome?: string,
    status?: string,
    cliente?: any,
    cr?: any
}

export type Colaborador = {
    id?: number
    nome?: string,
    matricula?: number,
    turno?: string,
    email?: string,
    telefone?: string,
    perfil?: string,
    lancamentos?: any,
    cr?: any,
    gestor?: Colaborador
}