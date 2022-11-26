import { Verba } from './../types/Types';

// salvar verba
export async function salvarVerba(verba: Verba | undefined) {
  fetch(`${process.env.REACT_APP_SERVER}/salvarVerba`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verba),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
}

// pegar todos os verbas
export async function todasVerbas() {
  return fetch(`${process.env.REACT_APP_SERVER}/todasVerbas`, {
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

// pegar um verba por id
export async function getVerba(numero: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/getVerba/${numero}`, {
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

// atualizar verba
export async function atualizarVerba(verba: Verba | undefined , numero: string | undefined) {
    return fetch(`${process.env.REACT_APP_SERVER}/atualizarVerba/${numero}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verba),
      })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    .catch((err) => console.log(err))
}

// horas trabalhadas pela verba especifica
export async function horasLancamentoVerba(matricula: string | undefined, modalidade: string | undefined, numero: string) {
  return fetch(`${process.env.REACT_APP_SERVER}/horasLancamentoVerba/${matricula}/${modalidade}/${numero}`, {
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