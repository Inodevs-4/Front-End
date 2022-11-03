export type Projeto = {
    id?: number,
    nome?: string,
    status?: string,
    cliente?: any,
    cr?: any
}

export type Colaborador = {
    matricula?: number,
    nome?: string,
    status?:string,
    turno?: string,
    email?: string,
    telefone?: string,
    perfil?: string,
    senha?: string,
    lancamentos?: Lancamento[],
    cr?: any,
}

export type Status = 'aprovado' | 'pendente' | 'reprovado'
export type StatusUsuario = 'ativo' | 'inativo'
export type Modalidade = 'hora extra' | 'sobreaviso'
export type Acionado = 'sim' | 'nao'

export type Lancamento = {
    id?: number,
    modalidade?: Modalidade,
    data_inicio?: Date,
    data_fim?: Date,
    acionado?: Acionado,
    data_inicio2?: Date,
    data_fim2?: Date,
    observacoes?: string,
    status?: Status,
	colaborador?: Colaborador,
	projeto?: Projeto,
	verbas?: Verba,
	gestor?: Colaborador,
}

export type Verba = {
    id?:number,
    numero?: number,
    verba?: number,
    adicional?: number,
    quantidadehoras?: number,
    inicio?: Date,
    fim?: Date,
	lancamentos?: Lancamento[]
}

export type Cliente = {
    nome?:string,
    cnpj?: string,
    status?:string,
    numero?: number,
    contato?: string,
    projetos?: Projeto[]
}

export type CR = {
    numero?: number,
    nome?: string,
    colaboradores ?: Colaborador[],
    status ?: StatusUsuario
}