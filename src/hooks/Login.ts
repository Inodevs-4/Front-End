
export async function validateToken(token: string | undefined) {
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

export async function loginOauth(email: string, id: string, nome: string) {
    return await fetch(`${process.env.REACT_APP_SERVER}/loginOauth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, id, nome}),
    })
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err))
}

export async function validateGoogle(token: string | undefined) {
    return await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err))
}