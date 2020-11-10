import analisadorLexico from "../lexico/lexico.js";
import gramatica from "./gramatica.js";
import obterTabelaSintatica from "./tabelaSintatica.js";
import { retornaHoraAtual } from "../index.js";

let pilhaEstados = [];
let indiceAtual = 0;
let colunaAtual = 0;
let linhaAtual = 0;
let tokenAtual = "";
let codigoFonteString = "";
let tabelaSintatica = obterTabelaSintatica();
let saidaLexica;
let leituraCodigoFonteFinalizada = false;
let entradaLexica = {
  indice: 0,
  linha: 0,
  coluna: 0,
  codigoFonte: "",
};

const analisadorSintatico = (codigoFonte) => {
  codigoFonteString = codigoFonte;
  codigoFonteString += "$";
  pilhaEstados.push("$");
  pilhaEstados.push(0);

  entradaLexica.indice = indiceAtual;
  entradaLexica.coluna = colunaAtual;
  entradaLexica.linha = linhaAtual;
  entradaLexica.codigoFonte = codigoFonteString;

  obterProximoToken();

  while (1) {
    if (tokenAtual == "ERRO") continue;
    if (leituraCodigoFonteFinalizada) break;
    let topoPilhaEstados = topoPilha();
    let resultadoAcao = tabelaSintatica[[topoPilhaEstados, tokenAtual]];

    if (resultadoAcao) {
      // CASO ACCEPT
      if (resultadoAcao == "ACCEPT") {
        break;
      }

      // CASO SHIFT
      else if (resultadoAcao.charAt(0) == "S") {
        let estadoShift  = parseInt(resultadoAcao.split("S")[1]);
        pilhaEstados.push(estadoShift);
        obterProximoToken();
      }

      // CASO REDUCE
      else if (resultadoAcao.charAt(0) == "R") {
        let estadoReduce = parseInt(resultadoAcao.split("R")[1]);
        let tamanhoProducao = gramatica[estadoReduce].length - 1;

        for (let i = 0; i < tamanhoProducao; i++) {
          pilhaEstados.pop();
        }

        
        let gotoTopoPilhaParaNaoTerminal = tabelaSintatica[[topoPilha(), gramatica[estadoReduce][0]]];
        pilhaEstados.push(gotoTopoPilhaParaNaoTerminal);

        msgProducaoGramatica(estadoReduce);
      }
    } else {
      // document.querySelector(
      //   "#output-codigo-fonte"
      // ).value += `${retornaHoraAtual()} - ERRO SINTÁTICO: ${topoPilha} => ${tokenAtual}\n`;
      // modoPanico();
      break;
    }
  }
  console.table(topoPilha(), tokenAtual)
  resetaParametros();
  return;
};

const obterProximoToken = () => {
  saidaLexica = analisadorLexico(entradaLexica);
  if (saidaLexica) {
    entradaLexica = atualizaEntradaLexica(saidaLexica);
    tokenAtual = saidaLexica.token.toLowerCase();
  }
};

const modoPanico = () => {
  msgEntrandoModoPanico();
  while (1) {
    if (tokenAtual == "pt_v" || tokenAtual == "fim") {
      break;
    } else if (indiceAtual == codigoFonteString.length) {
      leituraCodigoFonteFinalizada = true;
      msgSaindoModoPanico();
      break;
    } else {
      msgSaindoModoPanico();
      break;
    }
  }
  obterProximoToken();
};

const atualizaEntradaLexica = (saidaLexica) => {
  if (saidaLexica) {
    indiceAtual = saidaLexica.indice;
    let novaEntradaLexica = {
      indice: saidaLexica.indice,
      coluna: saidaLexica.linha,
      linha: saidaLexica.coluna,
      codigoFonte: codigoFonteString,
    };
    return novaEntradaLexica;
  }
  return;
};

const msgProducaoGramatica = (numeroRegra) => {
  let producao = gramatica[numeroRegra];
  // let stringProducao = `${producao[0]} => `;
  // producao.forEach(item => {

  // });
  console.log(producao);

  // document.querySelector(
  //   "#output-codigo-fonte"
  // ).value += `${retornaHoraAtual()} - Iniciando analise léxica...\n`;
};

const msgEntrandoModoPanico = () => {
  document.querySelector(
    "#output-codigo-fonte"
  ).value += `${retornaHoraAtual()} - Entrando no Modo Pânico...\n`;
};

const msgSaindoModoPanico = () => {
  document.querySelector(
    "#output-codigo-fonte"
  ).value += `${retornaHoraAtual()} - Saindo do Modo Pânico...\n`;
};

const resetaParametros = () => {
  pilhaEstados = [];
  indiceAtual = 0;
  colunaAtual = 0;
  linhaAtual = 0;
  codigoFonteString = "";
  tokenAtual = "";
  entradaLexica.indice = 0;
  entradaLexica.linha = 0;
  entradaLexica.coluna = 0;
  entradaLexica.codigoFonte = "";
  leituraCodigoFonteFinalizada = false;
};

const topoPilha = () =>{
  return pilhaEstados[pilhaEstados.length-1];
}

export default analisadorSintatico;
