
export const formatarDataHora = (dataHora: string | undefined) => {
    if (dataHora === undefined){
    return ''
    } else {
    const horas = String(Number(dataHora.split('T')[1].split(':')[0]) - 3)
    const minutos = dataHora.split('T')[1].split(':')[1]
    const ano = dataHora.split('T')[0].split('-')[0]
    const mes = dataHora.split('T')[0].split('-')[1]
    const dia = dataHora.split('T')[0].split('-')[2]
    return horas + ':' + minutos + ' ' + dia + '/' + mes + '/' + ano
    }
}

export const formatarInicial = (status: string | undefined) => {
    if (status === undefined){
      return ''
    } else {
      return status[0].toUpperCase() + status.substring(1, status.length) 
    }
}