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