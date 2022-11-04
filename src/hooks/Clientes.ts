import { Cliente } from "../types/Types"

// salvar cliente
export async function salvarCliente(cliente: Cliente | undefined) {
  fetch(`${process.env.REACT_APP_SERVER}/salvarCliente`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

// pegar todos os clientes
export async function todosClientes() {
  return fetch(`${process.env.REACT_APP_SERVER}/todosClientes`, {
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
export async function getCliente(id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/getCliente/${id}`, {
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
export async function atualizarCliente(cliente: Cliente | undefined , cnpj: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/atualizarCliente/${cnpj}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}