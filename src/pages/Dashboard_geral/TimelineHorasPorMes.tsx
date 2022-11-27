import { useEffect, useState,useContext } from "react";
import { graficoGeral, meusLancamentos, todosLancamentos } from "../../hooks/Lancamento";
export const TimelineHorasPorMes = () => {
    
    const [dadosGrafico, setDadosGrafico] = useState([])

    useEffect (() => {
        (async() => {
            setDadosGrafico(await graficoGeral())
            console.log(dadosGrafico)
        })()
    }, [])

    const meses = [
        "Janeiro",
        "Feveiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]

    return<>
    <div className="timeline">
            <div className="row">
				<div className="col-md-12">
					<div className="page-header">
					  <h2 className="titulo">Total de Horas/Sobreaviso Por Mês</h2>
					</div>
					<div className='linha'>
					<ul className="timeline timeline-horizontal">
						{dadosGrafico.map((dado:any, index) => (
                            <li className="timeline-item">
							<div className="timeline-badge success"><i className="glyphicon glyphicon-check"></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h4 className="timeline-title">{meses[index]}</h4>
									<p className="alinhado-centro"><small className="text-muted"><i className="glyphicon glyphicon-time"></i>Quantidade de horas: </small></p>
								</div>
								<div className="timeline-body">
									<h4>{dado.horaextra + dado.sobreaviso}h</h4>
								</div>
							</div>
						    </li>
                        )).reverse() }
					</ul>
				</div>
				</div>
			</div>            
            </div>
    </>
}

export default TimelineHorasPorMes