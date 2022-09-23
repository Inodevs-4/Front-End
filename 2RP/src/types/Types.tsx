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

export type Status = 'aprovado' | 'pendente' | 'reprovado'
export type Modalidade = 'hora extra' | 'sobreaviso'

export type Lancamento = {
    id?: number,
    modalidade?: Modalidade,
    data_inicio?: Date,
    data_fim?: Date,
    observacoes?: string,
    status?: Status,
	colaborador?: Colaborador,
	projeto?: Projeto
	verbas?: Verba[]
	gestor?: Colaborador
}

export type Verba = {
    id?: number,
    verba?: number,
    adicional?: number,
    quantidadehoras?: number,
    inicio?: Date,
    fim?: Date,
	lancamentos?: Lancamento[]
}