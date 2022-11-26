import { Projeto } from "../types/Types"

// select dos projetos
export async function selectProjetos() {
    return fetch(`${process.env.REACT_APP_SERVER}/selectProjetos`, {
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

// salvar projeto
export async function salvarProjeto(projeto: Projeto | undefined) {
  fetch(`${process.env.REACT_APP_SERVER}/salvarProjeto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projeto),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

// pegar todos os projetos
export async function todosProjetos() {
  return fetch(`${process.env.REACT_APP_SERVER}/todosProjetos`, {
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

// pegar um projeto por id
export async function getProjeto(id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/getProjeto/${id}`, {
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

// atualizar projeto
export async function atualizarProjeto(projeto: Projeto | undefined , id: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/atualizarProjeto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projeto),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}

// horas trabalhadas projeto
export async function horasTrabalhadasProjeto(id: string | undefined, modalidade: string | undefined) {
  return fetch(`${process.env.REACT_APP_SERVER}/horasTrabalhadasProjeto/${id}/${modalidade}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
          return data
      })
  .catch((err) => console.log(err))
}