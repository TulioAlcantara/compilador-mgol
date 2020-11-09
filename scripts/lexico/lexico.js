import obterTabelaSimbolos from "./tabelaSimbolos.js";
import AutomatoFinitoDeterministico from "./afd.js";
import { retornaHoraAtual } from "../index.js";

const analisadorLexico = (entradaLexica) => {
  let afd = new AutomatoFinitoDeterministico();
  let tabelaSimbolos = obterTabelaSimbolos();
  let lexema = [];
  let estadoAfd = 0;
  let ehAceitacao = false;
  let token = "";
  let breakloop = false;
  let qtdLeiturasInvalidas = 0;

  const textoOutput = document.querySelector("#output-codigo-fonte");
  if (!validaCodigoFonte(entradaLexica.codigoFonte)) {
    textoOutput.value += `${retornaHoraAtual()} - ERRO: Código fonte vazio\n`;
    return;
  }

  let indice = entradaLexica.indice;
  let linha = entradaLexica.linha;
  let coluna = entradaLexica.coluna;
  let codigoFonte = entradaLexica.codigoFonte;

  while (indice <= codigoFonte.length) {
    if (breakloop) break;
    if (qtdLeiturasInvalidas == 2) {
      textoOutput.value += `${retornaHoraAtual()} - ERRO LÉXICO: linha ${linha}, coluna ${coluna}\n`;
      indice++;
      coluna++;
      qtdLeiturasInvalidas = 0;
     
      // TODO: ADICIONAR LEXEMA DE ERRO E TOKEN "ERRO"
      // lexema = lexema.join("");
      criaNovaLinhaTabelaLexica("ERRO", "ERRO", "");
      
      return {
        indice: indice,
        tabelaSimbolos: tabelaSimbolos,
        token: token || "ERRO",
        linha: linha,
        coluna: coluna,
      };
    }

    let caracter = codigoFonte[indice];
    let resultadoAfd = afd.comparaEntradaComTabelaTransicao(
      estadoAfd,
      caracter
    );

    //LEITURA DO CARÁCTER RESULTOU EM UM ESTADO RECONHECÍVEL PELO AFD
    if (resultadoAfd) {
      estadoAfd = resultadoAfd[0];
      ehAceitacao = resultadoAfd[1];
      token = resultadoAfd[2];
      lexema.push(caracter);
      coluna++;
      indice++;
      qtdLeiturasInvalidas = 0;

      if (caracter == "\n") {
        linha++;
        coluna = 0;
      }
    }

    //LEITURA DO CARÁCTER RESULTOU EM UM ESTADO NÃO RECONHECÍVEL PELO AFD
    else {
      if (ehUltimoCaracter(indice, codigoFonte, estadoAfd)) {
        breakloop = true;
      }

      if (ehAceitacao) {
        lexema = lexema.join("");

        //CASO PALAVRA RESERVADA SUBSTITUI OS VALORES OBTIDOS ATÉ AGORA PELOS GUARDADOS NA TABELA DE SÍMBOLOS
        let entradaTabelaSimbolos = comparaLexemaComTabelaSimbolos(
          tabelaSimbolos,
          lexema
        );

        if (entradaTabelaSimbolos) {
          lexema = entradaTabelaSimbolos.lexema;
          token = entradaTabelaSimbolos.token;
        }

        criaNovaLinhaTabelaLexica(lexema, token, "");
        if (token == "id") {
          adicionaIdTabelaSimbolos(tabelaSimbolos, lexema, token, "");
        }

        return {
          indice: indice,
          tabelaSimbolos: tabelaSimbolos,
          token: token || "ERRO",
          linha: linha,
          coluna: coluna,
        };

      } else {
        estadoAfd = 0;
        lexema = [];
        ehAceitacao = false;
        qtdLeiturasInvalidas++;
        continue;
      }
    }
  }

  return;
};

const validaCodigoFonte = (codigoFonte) => {
  if (codigoFonte == undefined || !codigoFonte.trim().length) {
    return false;
  }
  return true;
};

const mostraTabelaLexica = (bool) => {
  if (bool) {
    document.getElementById("card-tabela-lexica").classList.remove("d-none");
  } else {
    document.getElementById("card-tabela-lexica").classList.add("d-none");
  }
};

const criaNovaLinhaTabelaLexica = (lexema, token, tipo) => {
  mostraTabelaLexica(true);
  const tabelaLexicaBody = document.querySelector("#tabela-lexica-body");
  tipo = "-";

  let tr = document.createElement("tr");
  let tdLexema = document.createElement("td");
  tdLexema.appendChild(document.createTextNode(lexema));
  let tdToken = document.createElement("td");
  tdToken.appendChild(document.createTextNode(token));
  let tdTipo = document.createElement("td");
  tdTipo.appendChild(document.createTextNode(tipo));

  tr.appendChild(tdLexema);
  tr.appendChild(tdToken);
  tr.appendChild(tdTipo);

  tabelaLexicaBody.appendChild(tr);
};

const comparaLexemaComTabelaSimbolos = (tabelaSimbolos, lexema) => {
  let retornoItemTabelaSimbolos;
  tabelaSimbolos.forEach(function (itemTabelaSimbolos) {
    if (itemTabelaSimbolos.lexema == lexema) {
      retornoItemTabelaSimbolos = itemTabelaSimbolos;
    }
    return;
  });
  return retornoItemTabelaSimbolos;
};

const ehUltimoCaracter = (indice, codigoFonte, estadoAfd) => {
  return indice == codigoFonte.length && estadoAfd == 0;
};

const adicionaIdTabelaSimbolos = (tabelaSimbolos, lexema, token, tipo) => {
  //VERIFICA SE O IDENTIFICADOR JÁ EXISTE
  for (let simbolo of tabelaSimbolos) {
    if (simbolo.lexema == lexema) {
      return;
    }
  }

  let entrada = {
    lexema: lexema,
    token: token,
    tipo: tipo,
  };
  tabelaSimbolos.push(entrada);
};

export default analisadorLexico;