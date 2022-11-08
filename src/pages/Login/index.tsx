
import './style.css';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../login/AuthContext';
import Loading from '../../components/Loading';


export const Login = () =>{
  
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [removeLoading, setRemoveLoading] = useState(true)

  const handleLogin = async (e: any) => {
      setRemoveLoading(false)
      e.preventDefault()
      if (email) {
          const isLogged = await auth.signin(email, senha);
          if (isLogged) {
              navigate('/');
          } else {
              alert("Email ou senha inválidos");
          }
      } else {
          alert("Preencha o email");
      }
      setRemoveLoading(true)
  }

    return(
      <body className="corpo">
        {!removeLoading && <Loading/>}
        <div className="logo">
        </div>
      <main className="container">
      <img src="https://www.2rpnet.com.br/assets/images/2rp-net.svg" alt="logo" />
        <h1>Entrar:</h1>
            <form action="">
              <div className="input-field">
                <input type="text" name="username" id="username"
                placeholder="Usuário: " onChange={e => setEmail(e.target.value)}/>
                <div className="underline"></div>
              </div>
               
                <div className="input-field">
                <input type="password" name="password" id="password"
                placeholder="Senha: " onChange={e => setSenha(e.target.value)}/>
                <div className="underline"></div>
              </div>
              <a href="/pagina-inicial">
              <input  type="button" value="Entrar" onClick={handleLogin}/>
              </a>
              {/* <a href="/pagina-inicial">
              <input  type="submit" value="Entrar" />
              </a> */}
            </form>


      </main>
      </body>      





        
        
    );
    }
    export default Login