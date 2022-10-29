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
