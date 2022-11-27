import { Lancamento } from "../types/Types"

// salvar lancamento
export async function salvarLancamento(lancamento: any) {
  fetch(`${process.env.REACT_APP_SERVER}/salvarLancamento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lancamento),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

// meus lancamentos
export async function meusLancamentos(matricula: string | undefined){
  return fetch(`${process.env.REACT_APP_SERVER}/meusLancamentos/${matricula}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data
    })
}

// todos lancamentos de um colaborador
export async function todosLancamentosColab(matricula: string | undefined){
  return fetch(`${process.env.REACT_APP_SERVER}/todosLancamentosColab/${matricula}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data
    })
}

// pegar todos os lancamentos
export async function todosLancamentos() {
  return fetch(`${process.env.REACT_APP_SERVER}/todosLancamentos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data
    })
}

// pegar um lancamento por id
export async function getLancamento(id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/getLancamento/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            return data
    })
}

// atualizar lancamento
export async function atualizarLancamento(lancamento: Lancamento | undefined , id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/atualizarLancamento/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lancamento),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}

// aprovar lancamento
export async function aprovarLancamento(lancamento: Lancamento | undefined , id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/aprovarLancamento/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lancamento),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}

// reprovar lancamento
export async function reprovarLancamento(lancamento: Lancamento | undefined , id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/reprovarLancamento/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lancamento),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}

// pegar a soma das horas trabalhadas do usuario logado
export async function horasTrabalhadas(id: string | undefined) {
  return fetch(`${process.env.REACT_APP_SERVER}/horasTrabalhadas/${id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          return data
  })
}

// pegar os lancamentos de um gestor
export async function gestorLancamentos(matricula: string | undefined){
  return fetch(`${process.env.REACT_APP_SERVER}/gestorLancamentos/${matricula}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data
    })
}

// dados do grafico geral
export async function graficoGeral() {
  return fetch(`${process.env.REACT_APP_SERVER}/graficoGeral`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          return data
  })
}

// dados do grafico individual
export async function graficoIndividual(matricula: string | undefined) {
  return fetch(`${process.env.REACT_APP_SERVER}/graficoIndividual/${matricula}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          return data
  })
}

// pesquisar lancamento no dash
export async function todosLancamentosFiltro(colaborador: String, cliente: String, cr: String) {
  return fetch(`${process.env.REACT_APP_SERVER}/todosLancamentosFiltro/${colaborador}/${cliente}/${cr}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          return data
  })
}

export async function todosLancamentosColabPeriodo(matricula: String, data1: String, data2: String, modalidade: String) {
  return fetch(`${process.env.REACT_APP_SERVER}/todosLancamentosColabPeriodo/${matricula}/${data1}/${data2}/${modalidade}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
  })
      .then((resp) => resp.json())
      .then((data) => {
          return data
  })
}
