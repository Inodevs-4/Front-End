import { CR } from "../types/Types"

// salvar cliente
export async function salvarCR(cr: CR | undefined) {
  fetch(`${process.env.REACT_APP_SERVER}/salvarCR`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cr),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

export async function selectColaboradoresCr(numero: string) {
  return fetch(`${process.env.REACT_APP_SERVER}/selectColaboradoresCr/${numero}`, {
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

// pegar todos os clientes
export async function todosCRs() {
  return fetch(`${process.env.REACT_APP_SERVER}/todosCRs`, {
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

// pegar um cliente por id
export async function getCR(id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/getCR/${id}`, {
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

// atualizar cliente
export async function atualizarCR(cr: CR | undefined , id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/atualizarCR/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cr),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}