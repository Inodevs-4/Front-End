
export async function validateToken(token: String | undefined) {
    return await fetch(`${process.env.REACT_APP_SERVER}/validateToken`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => resp.json())
    .then((data) => {
        return data
    }).catch(err => console.log(err))
}

export async function login(email: string, senha: string) {
    return await fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, senha}),
    })
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err))
}