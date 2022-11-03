import Navbar from "../../components/menu/Navbar";
import "./styles.css";

export const Cliente = () => {
    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela Clientes</p>
            <a href="/cadastro-cliente" className='btn btn-primary cadastrar' data-bs-toggle="tooltip" data-bs-placement="top" title="Cadastrar novo Usuário"><p className="icon">+</p></a>

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