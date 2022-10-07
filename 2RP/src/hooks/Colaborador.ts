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

