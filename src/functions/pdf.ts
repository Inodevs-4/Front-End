import { jsPDF } from 'jspdf'
import { getCR } from '../hooks/CR';
import { getProjeto, horasTrabalhadasProjeto, todosProjetos } from '../hooks/Projeto';
import * as htmlToImage from 'html-to-image';
import { getColaborador } from '../hooks/Colaborador';
import { horasLancamentoVerba, todasVerbas } from '../hooks/Verba';

async function creatPdf({
    doc,
    elements,
    margin
  }: {
    doc: jsPDF;
    elements: HTMLCollectionOf<Element>;
    margin: number
  }) {
    let top = margin+10;
    const padding = 10;
  
    for (let i = 0; i < elements.length; i++) {
      const el = elements.item(i) as HTMLElement;
      const imgData = await htmlToImage.toPng(el);
  
      let elHeight = el.offsetHeight - 50;
      let elWidth = el.offsetWidth - 50;
  
      const pageWidth = doc.internal.pageSize.getWidth();
  
      if (elWidth > pageWidth) {
        const ratio = pageWidth / elWidth;
        elHeight = elHeight * ratio - padding;
        elWidth = elWidth * ratio - padding;
      }
  
      const pageHeight = doc.internal.pageSize.getHeight();
  
      if (top + elHeight > pageHeight) {
        doc.addPage();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Horas Extras e Sobreaviso trabalhadas na empresa em 2022", 25, top-10);
        top = 25;
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Horas Extras e Sobreaviso trabalhadas na empresa em 2022", 25, top-10);
      }
  
      doc.addImage(imgData, "PNG", padding, top, elWidth, elHeight, `image${i}`);
      top += elHeight;
    }
  }

export async function exportPdfGeral() {
    const doc= new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Relatório Geral Mensal", 70, 25);

    const data = Date.now();
    const hoje = new Date(data);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Data: ${hoje.getMonth()}/${hoje.getFullYear()}`, 20, 40);

    const projetos = await todosProjetos();
    let m = 52;

    for(let i = 0; i < projetos.length; i++) {

        const pageHeight = doc.internal.pageSize.getHeight();

        if (m+50 > pageHeight) {
            doc.addPage();
            m = 20
        }

        let p = projetos[i]
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`Nome do Projeto: ${p.nome}`, 20, m);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        m += 12;
        doc.text(`Nome do Cliente: ${p.cliente.nome}`, 20, m);
        m += 8;
        doc.text(`Nome do Centro de Resultado: ${p.cr.nome}`, 20, m);
        m += 8;
        doc.text(`Integrantes do Centro de Resultado:`, 20, m);
        m += 8;

        let cr = await getCR(p.cr.numero);
        for(let j = 0; j < cr.colaboradores.length; j++) {
            doc.text(`Nome do Colaborador: ${cr.colaboradores[j].nome}`, 30, m);
            m += 8;
        }
        m += 4;

        let horasE = await horasTrabalhadasProjeto(p.id, 'horaextra');
        doc.text(`Horas extras trabalhadas no projeto: ${horasE.horas}h`, 20, m);
        m += 8;

        let horasS = await horasTrabalhadasProjeto(p.id, 'sobreaviso');
        doc.text(`Horas de sobreaviso trabalhadas no projeto: ${horasS.horas}h`, 20, m);
        m += 18;
        
    }
      
    const elements = document.getElementsByClassName("recharts-wrapper");

    const margin = m
    await creatPdf({ doc, elements, margin });

    doc.save(`${data}.pdf`);
}

export async function exportPdfColaborador(matricula: string) {
    const doc= new jsPDF();

    const c = await getColaborador(matricula);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`Relatório Individual`,70, 25);

    const data = Date.now();
    const hoje = new Date(data);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Data: ${hoje.getMonth()}/${hoje.getFullYear()}`, 20, 40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Nome: ${c.nome}`, 20, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Matricula: ${c.matricula}`, 20, 64);
    doc.text(`Turno: ${c.turno}`, 20, 72);
    doc.text(`Email: ${c.email}`, 20, 80);
    doc.text(`Telefone: ${c.telefone}`, 20, 88);
    doc.text(`Centro de Resultado: ${c.cr.nome}`, 20, 96);

    let m = 112;

    const verbas = await todasVerbas();

    for(let i = 0; i < verbas.length; i++) {
        let v = verbas[i]

        const pageHeight = doc.internal.pageSize.getHeight();

        if (m+50 > pageHeight) {
            doc.addPage();
            m = 20
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`Verba: ${v.numero}`, 20, m);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        m += 12;

        let horasEx = await horasLancamentoVerba(matricula, 'horaextra', v.numero)
        doc.text(`Horas extras trabalhadas: ${horasEx.horas}`, 20, m);
        m += 8;

        let horasSo = await horasLancamentoVerba(matricula, 'sobreaviso', v.numero)
        doc.text(`Horas de sobreaviso trabalhadas: ${horasSo.horas}`, 20, m);
        m += 8;

        const cr = await getCR(c.cr.numero)
        const projeto = await getProjeto(cr.projeto.id)
        doc.text(`Projeto: ${projeto.nome}`, 20, m);
        m += 18;
        
    }
      
    const elements = document.getElementsByClassName("recharts-wrapper");

    const margin = m
    await creatPdf({ doc, elements, margin });

    doc.save(`${data}.pdf`);
}

