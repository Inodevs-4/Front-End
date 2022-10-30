import Navbar from "../../components/menu/Navbar";
import "./styles.css";

export const Cliente = () => {
    return(
        <body>
            <Navbar/>
            <a href="/cadastro-cliente" className="btn btn-primary"> + </a>
            <h3>Clientes</h3>
            <hr />

            <div className="clientes">
                 <div className="row titles">
                    <div className="col">CNPJ</div>
                    <div className="col">Nome</div>
                    <div className="col">Contato</div>
                    <div className="col">Projetos</div>
                 </div>
            </div>
        </body>
    )
}

export default Cliente;