import analisadorLexico from "../lexico/lexico.js";
import gramatica from "./gramatica.js";
import obterTabelaSintatica from "./tabelaSintatica.js";
import { retornaHoraAtual } from "../index.js";
import errosGramaticais from "./errosGramaticais.js";
import obterTabelaSimbolos from "../lexico/tabelaSimbolos.js";
import semantico from "../semantico/semantico.js";

let pilhaEstados = [];
let pilhaAtributos = [];
let indiceAtual = 0;
let colunaAtual = 0;
let linhaAtual = 0;
let tokenAtual = "";
let lexemaAtual = "";
let tipoAtual = "";
let codigoFonteString = "";
let codigoObjeto;
let tabelaSintatica = obterTabelaSintatica();
let tabelaSimbolos = obterTabelaSimbolos();
let saidaLexica;
let leituraCodigoFonteFinalizada = false;
let entradaLexica = {
  indice: 0,
  linha: 0,
  coluna: 0,
  codigoFonte: "",
  tabelaSimbolos: tabelaSimbolos,
};

const analisadorSintatico = (codigoFonte) => {
  resetaParametros();

  if (!validaCodigoFonte(codigoFonte)) {
    msgCodigoFonteVazio();
    return;
  }

  codigoFonteString = codigoFonte;
  codigoFonteString += " $";
  pilhaEstados.push("$");
  pilhaEstados.push(0);

  entradaLexica.indice = indiceAtual;
  entradaLexica.coluna = colunaAtual;
  entradaLexica.linha = linhaAtual;
  entradaLexica.codigoFonte = codigoFonteString;

  obterProximoToken();

  while (1) {
    if (tokenAtual == "erro") {
      obterProximoToken();
      if (indiceAtual == codigoFonteString.length) break;
      continue;
    }

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
        let estadoShift = parseInt(resultadoAcao.split("S")[1]);
        pilhaEstados.push(estadoShift);
        pilhaAtributos.push(lexemaAtual);
        // if (tokenAtual == "id") {
        //   pilhaAtributos.push(lexemaAtual);
        // }
        obterProximoToken();
      }

      // CASO REDUCE
      else if (resultadoAcao.charAt(0) == "R") {
        let estadoReduce = parseInt(resultadoAcao.split("R")[1]);
        let tamanhoProducao = gramatica[estadoReduce].length - 1;
        let naoTerminal = gramatica[estadoReduce][0];

        let retornoSemantico = semantico(
          estadoReduce,
          naoTerminal,
          tabelaSimbolos,
          pilhaAtributos
        );
        tabelaSimbolos = retornoSemantico.novaTabelaSimbolos;
        codigoObjeto = retornoSemantico.codigoObjeto;

        for (let i = 0; i < tamanhoProducao; i++) {
          pilhaEstados.pop();
          // pilhaAtributos.pop();
        }

        let gotoTopoPilhaParaNaoTerminal =
          tabelaSintatica[[topoPilha(), gramatica[estadoReduce][0]]];
        pilhaEstados.push(gotoTopoPilhaParaNaoTerminal);
        // pilhaAtributos.push(lexemaAtual);

        msgProducaoGramatica(estadoReduce);
      }
    } else {
      msgErroSintatico();
      break;
      // modoPanico();
    }
  }
  resetaParametros();
  console.log(codigoObjeto);
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
    listaTokenAtual = topoPilha();
    if (tokenAtual == "pt_v" || tokenAtual == "fim") {
      Q;
      // obterProximoToken();
      break;
    } else if (indiceAtual == codigoFonteString.length) {
      leituraCodigoFonteFinalizada = true;
      break;
    } else {
      obterProximoToken();
    }
  }
  msgSaindoModoPanico();
};

const atualizaEntradaLexica = (saidaLexica) => {
  if (saidaLexica) {
    indiceAtual = saidaLexica.indice;
    linhaAtual = saidaLexica.linha;
    colunaAtual = saidaLexica.coluna;
    lexemaAtual = saidaLexica.lexema;
    tipoAtual = saidaLexica.tipo;
    let novaEntradaLexica = {
      indice: saidaLexica.indice,
      coluna: saidaLexica.coluna,
      linha: saidaLexica.linha,
      codigoFonte: codigoFonteString,
      tabelaSimbolos: saidaLexica.tabelaSimbolos,
    };
    return novaEntradaLexica;
  }
  return;
};

const msgProducaoGramatica = (numeroRegra) => {
  let producao = gramatica[numeroRegra];
  let stringProducao = `${producao[0]} => `;
  producao.forEach((item, index) => {
    if (index != 0) {
      stringProducao += `${item} `;
    }
  });

  document.querySelector(
    "#output-codigo-fonte"
  ).value += `- Produção da gramática: ${stringProducao}\n`;
};

const msgEntrandoModoPanico = () => {
  document.querySelector("#output-codigo-fonte").value += `- Entrando no Modo Pânico...\n`;
};

const msgSaindoModoPanico = () => {
  document.querySelector("#output-codigo-fonte").value += `- Saindo do Modo Pânico...\n`;
};

const msgErroSintatico = () => {
  document.querySelector("#output-codigo-fonte").value += `- ERRO SINTÁTICO: ${
    errosGramaticais[topoPilha()]
  } (linha ${linhaAtual}, coluna ${colunaAtual}) \n`;
  // / ULTIMO ESTADO: ${topoPilha()}, ULTIMO TOKEN: ${tokenAtual}
};

const msgCodigoFonteVazio = () => {
  document.querySelector("#output-codigo-fonte").value += `- ERRO: Código fonte vazio\n`;
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

const topoPilha = () => {
  return pilhaEstados[pilhaEstados.length - 1];
};

const validaCodigoFonte = (codigoFonte) => {
  if (codigoFonte == undefined || !codigoFonte.trim().length) {
    return false;
  }
  return true;
};

export default analisadorSintatico;
