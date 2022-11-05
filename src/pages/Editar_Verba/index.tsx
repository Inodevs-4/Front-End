import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./editar-verba.css";
import {  Verba } from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarVerba, getVerba } from '../../hooks/Verba';
import { formatarHoraInput } from '../../functions/formatar';
export const Editar_Verbas = () =>{

    const { numero } = useParams()

    const [verba, setVerba] = useState<Verba>()
    const [verbaIncio, setVerbaIncio] = useState<Verba>()

    useEffect(() => {
        (async() => {
            const data = await getVerba(numero)
            setVerba(data)
            setVerbaIncio(data)  
        })()
    }, [])

    function handleChange(e: any) {
        setVerba({...verba, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setVerba({...verba, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const editarVerba = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    const cancelar = () => {
        setVerba(verbaIncio)
        editarVerba()
    }

    const salvarVerba = () => {
        atualizarVerba(verba, numero)
        setVerbaIncio(verba)
        editarVerba()
    }

    return(
        <body>
        <Navbar/>
        <div className="area">
            <div className="linha">
            <div className="aviso">
                    <h3>IMPORTANTE!</h3>
                    <hr />
                    <p>Valor fixo p/ hora:</p>
                    <ul>
                        <li><strong>Segunda à Sexta: </strong>R$12,00</li>
                        <li><strong>Sábado: </strong>R$17,00</li>
                        <li><strong>Domingo: </strong>R$22,00</li>
                        <li><strong>Feriado: </strong>15% sobre o valor do dia + adicional</li>
                    </ul>
                </div>
                <div className="form-group ">
                    <label className="titulo"htmlFor="exampleFormControlInput1">Número</label>
                    <input type="number" className="form-control" onChange={handleChange} id="numero" value={verba?.numero} />
                </div>
                <div className="form-group ">
                    <label className="titulo"htmlFor="exampleFormControlInput1">Adicional</label>
                    <input type="number" className="form-control" onChange={handleChange} id="adicional" value={verba?.adicional} placeholder='0%' />
                </div>
            </div>
            <div className="linha">
                <div className="form-group ">
                    <label className="titulo"htmlFor="exampleFormControlInput1">Início</label>
                    <input type="time" className="form-control" id="Inicio" onChange={handleChange}  value={formatarHoraInput(String(verba?.inicio))} name="inicio"  />
                </div>
                <div className="form-group ">
                    <label className="titulo"htmlFor="exampleFormControlInput1">Fim</label>
                    <input type="time" className="form-control" onChange={handleChange} value={formatarHoraInput(String(verba?.fim))} id="fim" name="fim" />
                </div>
            </div>
            <div className="linha">
                <p>Eventos:</p> 
                <div className="form-check">
                    <input className="form-check-input" onChange={handleSelect} type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Feriado
                    </label>
                </div>
                <p>Período Semanal:</p>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleSelect} type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                    <label className="form-check-label" htmlFor="gridRadios1">
                        Segunda à Sexta
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleSelect} type="radio" name="gridRadios" id="gridRadios1" value="option2" />
                    <label className="form-check-label" htmlFor="gridRadios1">
                        Sábado
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"  onChange={handleSelect} type="radio" name="gridRadios" id="gridRadios2" value="option3"/>
                    <label className="form-check-label"htmlFor="gridRadios2">
                        Domingo
                    </label>
                </div>
                <hr />
            </div>
            
            <div className="bottons">
                <div className="form-group">
                    <label className='titulo' htmlFor="exampleFormControlInput1">Cálculo(R$)</label>
                    <input className="form-control" type="text" onChange={handleChange} placeholder="00,00" id='exampleFormControlInput1' readOnly/>
                </div>
                <div className='alteracao' hidden={isVisible}>
                    <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                    <button onClick={salvarVerba} className='btn btn-success'>Concluir</button>
                </div>
                </div>
        </div>
    </body>
    )
    }
    export default Editar_Verbas