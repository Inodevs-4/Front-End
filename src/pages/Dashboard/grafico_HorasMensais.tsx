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


const CustomTooltip:any = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label"><strong>Data: </strong>{` ${label}`}</p>
          <p className="label"><strong>Quantidade de horas: </strong> {` ${payload[0].value}`}h</p>
          <p className="desc"></p>
        </div>
      );
    }
}
export const Grafico_HorasMensais = () => {
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

    return (<>
    <h4>Gráfico Somatório de Horas/Extras e Sobreavisos Mensais</h4>
        <div style={{width: 1300, height:500}}>
      <ResponsiveContainer width="80%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dictionary_horas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Data" />
          <YAxis dataKey="Horas"/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Horas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        </div>
        </>
        )
    
    
}


export default Grafico_HorasMensais