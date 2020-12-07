import obterTabelaSimbolos from "./tabelaSimbolos.js";
import AutomatoFinitoDeterministico from "./afd.js";
import { retornaHoraAtual } from "../index.js";

const analisadorLexico = (entradaLexica) => {
  let afd = new AutomatoFinitoDeterministico();
  // let tabelaSimbolos = obterTabelaSimbolos();
  let lexema = [];
  let estadoAfd = 0;
  let ehAceitacao = false;
  let token = "";
  let tipo = "";
  let breakloop = false;
  let qtdLeiturasInvalidas = 0;
  let lexemaDesconhecido = "";

  let indice = entradaLexica.indice;
  let linha = entradaLexica.linha;
  let coluna = entradaLexica.coluna;
  let codigoFonte = entradaLexica.codigoFonte;
  let tabelaSimbolos = entradaLexica.tabelaSimbolos

  const textoOutput = document.querySelector("#output-codigo-fonte");

  while (indice <= codigoFonte.length) {
    //VALIDA ERROS DE ASPAS E CHAVES NÃO FECHADAS
    if (indice == codigoFonte.length) {
      if (estadoAfd == 13) {
        textoOutput.value += `- ERRO LÉXICO: Literal sem aspas fechadas (linha ${linha}, coluna ${coluna})\n`;
        criaNovaLinhaTabelaLexica("ERRO", "ERRO", "");

        return {
          indice: indice,
          tabelaSimbolos: tabelaSimbolos,
          token: "ERRO",
          linha: linha,
          coluna: coluna,
          lexema: lexema,
          tipo: tipo,
        };
      } else if (estadoAfd == 20) {
        textoOutput.value += `- ERRO LÉXICO: Comentário sem chaves fechadas (linha ${linha}, coluna ${coluna})\n`;
        criaNovaLinhaTabelaLexica("ERRO", "ERRO", "");

        return {
          indice: indice,
          tabelaSimbolos: tabelaSimbolos,
          token: "ERRO",
          linha: linha,
          coluna: coluna,
          lexema: lexema,
          tipo: tipo,
        };
      }
    }

    if (breakloop) break;
    if (qtdLeiturasInvalidas == 2) {
      textoOutput.value += `- ERRO LÉXICO: Símbolo ${lexemaDesconhecido} desconhecido (linha ${linha}, coluna ${coluna})\n`;
      indice++;
      coluna++;
      qtdLeiturasInvalidas = 0;

      criaNovaLinhaTabelaLexica("ERRO", "ERRO", "");

      return {
        indice: indice,
        tabelaSimbolos: tabelaSimbolos,
        token: "ERRO",
        linha: linha,
        coluna: coluna,
        lexema: lexema,
        tipo: tipo,
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
      tipo = resultadoAfd[3];
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

        if(lexema != "$"){
          criaNovaLinhaTabelaLexica(lexema, token, tipo);
        }
        if (token == "id") {

          adicionaIdTabelaSimbolos(tabelaSimbolos, lexema, token, tipo);
        }

        return {
          indice: indice,
          tabelaSimbolos: tabelaSimbolos,
          token: token,
          linha: linha,
          coluna: coluna,
          lexema: lexema,
          tipo: tipo,
        };
      } else {
        estadoAfd = 0;
        lexemaDesconhecido = caracter;
        lexema = [];
        ehAceitacao = false;
        qtdLeiturasInvalidas++;
        continue;
      }
    }
  }

  return;
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
  // tipo = "-";

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
