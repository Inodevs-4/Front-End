import { useState} from "react";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core/Button";
import './style.css';



export const Login = () =>{
    const [matricula,SetEmail] = useState('');
    const [password,SetPassword] = useState('');


    return(
      <body>
        <div className="logo">
        {/* <img src="/login.png" alt="logo" /> */}
        </div>
      <main className="container">
      <img src="https://www.2rpnet.com.br/assets/images/2rp-net.svg" alt="logo" />
        <h1>Login</h1>
            <form action="">
              <div className="input-field">
                <input type="text" name="username" id="username"
                placeholder="Matricula"/>
                <div className="underline"></div>
              </div>
               
                <div className="input-field">
                <input type="password" name="password" id="password"
                placeholder="Senha"/>
                <div className="underline"></div>
              </div>
              <a href="/pagina-inicial">
              <input  type="button" value="Entrar"/>
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