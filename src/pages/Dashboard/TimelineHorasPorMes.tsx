import { 
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Legend
} from "recharts";
import { AuthContext } from '../../login/AuthContext';
import {format, parseISO, subDays} from "date-fns";
import { useEffect, useState,useContext } from "react";
import { Lancamento } from "../../types/Types";
import { meusLancamentos, todosLancamentos } from "../../hooks/Lancamento";
import { formatarDataHora, formatarHora } from "../../functions/formatar";
import { hi } from "date-fns/locale";
import { Fragment } from "react";
export const TimelineHorasPorMes = () => {


    // Armazem de horas por dia
    var dictionary_horas:any[]= []
    // Id do colaborador
    const auth = useContext(AuthContext)
    //lancamentos do colaborador
    const [mlancamentos, setMeusLancamentos] = useState<Lancamento[]>([])
    useEffect(() => {
        (async() => {
          setMeusLancamentos(await todosLancamentos())
        })()
    }, [])

    // Funcao para separar a quantidade de horas por mes durante o mes atual
    const formatacao_hora = () => {
        let hora_inicio:any = []                    //vetor de horas inicias
        let hora_fim:any = []                       //vetor de horas finais
        const lanc:any = []                         //vetor para armazenar as horas por dia, do mes atual
        const date = new Date();                    
        const currentMonth = date.getMonth() + 1;  // Mes atual
        // Verifica qual e o colaborador logado e separa suas horas do mes
        mlancamentos.map((v: any) => (
           console.log(String(v.data_inicio.slice(5,7))),
           v.colaborador.matricula === auth.colaborador?.matricula && String(v.data_inicio.slice(5,7)) === String(currentMonth) ? lanc.push(v) : null
        ))
        lanc.map((l: any) => 
        (
        String(l.data_inicio).slice(-10) === String(l.data_fim).slice(-10) ?
                (
                    //Verifica de hora está abaixo de 2 digitos
                    parseInt(formatarDataHora(String(l?.data_inicio)).slice(0,2)) < 10 && parseInt(formatarDataHora(String(l?.data_fim)).slice(0,2)) < 10 ? 
                    (            
                        hora_inicio.push(formatarDataHora(String(l?.data_inicio)).slice(0,1)),
                        hora_fim.push(formatarDataHora(String(l?.data_fim)).slice(0,1))
                    )
                    : 
                    (
                        parseInt(formatarDataHora(String(l?.data_inicio)).slice(0,2)) < 10 && parseInt(formatarDataHora(String(l?.data_fim)).slice(0,2)) >= 10 ?
                        (
                            hora_inicio.push(formatarDataHora(String(l?.data_inicio)).slice(0,1)),
                            hora_fim.push(formatarDataHora(String(l?.data_fim)).slice(0,2))
                        )
                    :
                        (
                            parseInt(formatarDataHora(String(l?.data_inicio)).slice(0,2)) >= 10 && parseInt(formatarDataHora(String(l?.data_fim)).slice(0,2)) < 10 ?
                            (
                                hora_inicio.push(formatarDataHora(String(l?.data_inicio)).slice(0,2)),
                                hora_fim.push(formatarDataHora(String(l?.data_fim)).slice(0,1))
                            )
                            :
                            (
                                hora_inicio.push(formatarDataHora(String(l?.data_inicio)).slice(0,2)),
                                hora_fim.push(formatarDataHora(String(l?.data_fim)).slice(0,2))
                            )
                        )
                    )
                ) : null
                
        ))
        //Variaveis para contabilizar as horas e os minutos e o somarem separando por dia                       
        let horas:number[] = []
        let hora = 0
        let minutos:number[] = []
        let minuto = 0
        let dia:string[] = []

        lanc.map((la:any) => 
        (
            //Define os dias do mes que serao contabilizadas as horas
            !(dia.includes(String(la?.data_inicio).slice(0,10)))) ? dia.push(String(la?.data_inicio).slice(0,10)) : null,
        )
        dia.map((d:any) => (
            lanc.map((l:any) => (
                //Se a data do do lancamento for igual a data do dicionario
                d === String(l?.data_inicio).slice(0,10) ? 
                //Conversao de minutos para horas
                (
                    minuto += (parseInt(String(l.data_fim).slice(-13).slice(0,-11))  * 60 + parseInt(String(l.data_fim).slice(-10).slice(0,-8))) - (parseInt(String(l.data_inicio).slice(-13).slice(0,-11))  * 60 + parseInt(String(l.data_inicio).slice(-10).slice(0,-8)))
                )
                    : null
            )),
            minutos.push(minuto),       //Adiciona as horas calculadas ao vetor de minutos 
            minuto = 0
        ))


        minutos.map((m:any) => (
            //Calcula de horas, caso hora seja quebrada. Ex: 8h30 - 9h45
            hora = Number((m/60).toFixed(2)),   //Divide os minutos calculado por 60 pra saber a hora, e deixa apenas duas casas decimais para contablizar valor menores que 1 hora
            !Number.isInteger(hora) ?           //Se a hora tiver minutos quebrados, faz o calculo deles e soma as horas
            (
            hora =  Number((Math.floor(m/60) + (((m/60) - Math.floor(m/60))/100 * 60)).toFixed(2)),
            horas.push(hora),
            hora = 0
            )
            : 
            (
            horas.push(hora),
            hora = 0
            )
        ))
          
        //Adiciona as horas calculadas de acordo com seus respectivos dias
        dia.map((di:any, index_d) => (
            horas.map((h:any, index_h) => (
                index_h === index_d ? 
                (
                dictionary_horas[index_d] = { Data: di, Horas : h }
                )
                : null
            ))
        ))
    }
    formatacao_hora();  
    console.log(dictionary_horas)

    const meses = [1,2,3,4,5,6,7,8,9,10,11,12]
    const data_atual = new Date()
    const mes_atual = data_atual.getMonth() + 1
    const ano_atual = data_atual.getFullYear()
    console.log("Mes atual: " + mes_atual)
    console.log("Ano atual: " + ano_atual)
    var lancamentos:any[] = []
    const somaHorasMes = (mes:number) => {
        var lanc:any[] = []
        console.log("Teste")
        mlancamentos.map((v: any) => (
            console.log(String(v.data_inicio.slice(5,7))),
            v.colaborador.matricula === auth.colaborador?.matricula && String(v.data_inicio.slice(5,7)) === String(mes) ? 
           (
                lanc.push(v)
           )
            
            : null
         ))
         console.log("Lancamentos do mes: " + mes)
         console.log(lanc)

         let horas:number[] = []
         let hora = 0
         let minutos:number[] = []
         let minuto = 0
         let mes_hora:string[] = []
        

         lanc.map((la:any) => 
         (
             //Define os meses que serao contabilizadas as horas
             !(mes_hora.includes(String(la?.data_inicio).slice(5,7)))) ? mes_hora.push(String(la?.data_inicio).slice(5,7)) : null,
         )

         mes_hora.map((m:any) => (
            lanc.map((l:any) => (
                //Se a data do do lancamento for igual a data do dicionario
                m === String(l?.data_inicio).slice(5,7) ? 
                //Conversao de minutos para horas
                (
                    minuto += (parseInt(String(l.data_fim).slice(-13).slice(0,-11))  * 60 + parseInt(String(l.data_fim).slice(-10).slice(0,-8))) - (parseInt(String(l.data_inicio).slice(-13).slice(0,-11))  * 60 + parseInt(String(l.data_inicio).slice(-10).slice(0,-8)))
                )
                    : null
            ))
            //Adiciona as horas calculadas ao vetor de minutos 
        ))

        //Calcula de horas, caso hora seja quebrada. Ex: 8h30 - 9h45
        hora = Number((minuto/60).toFixed(2)) //Divide os minutos calculado por 60 pra saber a hora, e deixa apenas duas casas decimais para contablizar valor menores que 1 hora
        !Number.isInteger(hora) ? hora += Number((Math.floor(hora/60) + (((hora/60) - Math.floor(hora/60))/100 * 60)).toFixed(2)): console.log(hora)
        switch (mes) {
            case 1:
                lancamentos[mes] = { mes: 'Janeiro', hora: hora }
                break;
            case 2:
                lancamentos[mes] = { mes: 'Fevereiro', hora: hora }
                break;
            case 3:
                lancamentos[mes] = { mes: 'Março', hora: hora }
                break;
            case 4:
                lancamentos[mes] = { mes: 'Abril', hora: hora }
                break;
            case 5:
                lancamentos[mes] = { mes: 'Maio', hora: hora }
                break;
            case 6:
                lancamentos[mes] = { mes: 'Junho', hora: hora }
                break;
            case 7:
                lancamentos[mes] = { mes: 'Julho', hora: hora }
                break;
            case 8:
                lancamentos[mes] = { mes: 'Agosto', hora: hora }
                break;
            case 9:
                lancamentos[mes] = { mes: 'Setembro', hora: hora }
                break;
            case 10:
                lancamentos[mes] = { mes: 'Outubro', hora: hora }
                break;
            case 11:
                lancamentos[mes] = { mes: 'Novembro', hora: hora }
                break;
            case 12:
                lancamentos[mes] = { mes: 'Dezembro', hora: hora }
                break;

            default:
                break;
        }
        console.log(lancamentos)

    }
    meses.map((m:any) => (
        somaHorasMes(m)
    ))

    return<>
    <div className="timeline">
            <div className="row">
				<div className="col-md-12">
					<div className="page-header">
					  <h2 className="titulo">Total de Horas/Sobreaviso Por Mês</h2>
					</div>
					<div className='linha'>
					<ul className="timeline timeline-horizontal">
						{lancamentos.map((lanc:any) => (
                            <li className="timeline-item">
							<div className="timeline-badge success"><i className="glyphicon glyphicon-check"></i></div>
							<div className="timeline-panel">
								<div className="timeline-heading">
									<h4 className="timeline-title">{lanc.mes}</h4>
									<p className="alinhado-centro"><small className="text-muted"><i className="glyphicon glyphicon-time"></i>Quantidade de horas: </small></p>
								</div>
								<div className="timeline-body">
									<h4>{lanc.hora}h</h4>
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