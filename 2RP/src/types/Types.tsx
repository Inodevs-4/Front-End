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
    lancamentos?: Lancamento[],
    cr?: any,
    gestor?: Colaborador
}

export type Status = 'aprovado' | 'pendente' | 'reprovado'
export type StatusUsuario = 'ativo' | 'inativo'
export type Modalidade = 'hora extra' | 'sobreaviso'
export type Tipo = 'continuo' | 'escalonado'

export type Lancamento = {
    id?: number,
    modalidade?: Modalidade,
    data_inicio?: Date,
    data_fim?: Date,
    tipo?: Tipo,
    data_inicio2?: Date,
    data_fim2?: Date,
    observacoes?: string,
    status?: Status,
	colaborador?: Colaborador,
	projeto?: Projeto
	verbas?: Verba[]
	gestor?: Colaborador
}

export type Verba = {
    numero?: number,
    verba?: number,
    adicional?: number,
    quantidadehoras?: number,
    inicio?: Date,
    fim?: Date,
	lancamentos?: Lancamento[]
}