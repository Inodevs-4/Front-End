import { Colaborador } from "../types/Types"

// selecionando todos os gestores
export async function selectGestores() {
    return fetch(`${process.env.REACT_APP_SERVER}/selectGestores`, {
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

// selecionando todos os colaboradores
export async function selectColaboradores() {
  return fetch(`${process.env.REACT_APP_SERVER}/selectColaboradores`, {
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

// salvar colaborador
export async function salvarColaborador(colaborador: Colaborador | undefined) {
  return fetch(`${process.env.REACT_APP_SERVER}/salvarColaborador`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colaborador),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

// pegar um usuario pela sua matricula
export async function getColaborador(matricula: string | undefined) {
  return fetch(`${process.env.REACT_APP_SERVER}/getColaborador/${matricula}`, {
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

export async function atualizarColaborador(matricula: string | undefined, colaborador: Colaborador | undefined){
  fetch(`${process.env.REACT_APP_SERVER}/atualizarColaborador/${matricula}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colaborador),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}
