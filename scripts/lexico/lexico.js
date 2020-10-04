import obterTabelaSimbolos from "./tabelaSimbolos.js";
import AutomatoFinitoDeterministico from "./afd.js";
import { retornaHoraAtual } from "../index.js";
import tabelaSimbolos from "./tabelaSimbolos.js";

const analisadorLexico = (codigoFonte) => {
    const textoOutput = document.querySelector("#output-codigo-fonte");

    let afd = new AutomatoFinitoDeterministico();
    let tabelaSimbolos = obterTabelaSimbolos();
    let lexemaAtual = [];
    let estadoAfd = 0;
    let linhaAtual = 0;
    let colunaAtual = 0;
    let ehAceitacao = false;
    let token = "";
    let indice = 0;
    let breakloop = false;
    let qtdLeiturasInvalidas = 0;

    if (!validaCodigoFonte(codigoFonte)) {
        textoOutput.value += `${retornaHoraAtual()} - ERRO: Código fonte vazio\n`;
        return;
    } else {
        textoOutput.value += `${retornaHoraAtual()} - Iniciando analise léxica...\n`;
    }

    while (indice <= codigoFonte.length) {
        if (breakloop) break;
        if (qtdLeiturasInvalidas == 2) {
            textoOutput.value += `${retornaHoraAtual()} - ERRO LÉXICO: linha ${linhaAtual}, coluna ${colunaAtual}\n`;
            indice++;
            colunaAtual++;
            qtdLeiturasInvalidas = 0;
            continue;
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
            lexemaAtual.push(caracter);
            colunaAtual++;
            indice++;
            qtdLeiturasInvalidas = 0;

            if (caracter == "\n") {
                linhaAtual++;
                colunaAtual = 0;
            }
        }
        //LEITURA DO CARÁCTER RESULTOU EM UM ESTADO NÃO RECONHECÍVEL PELO AFD
        else {
            if (ehUltimoCaracter(indice, codigoFonte, estadoAfd)) {
                breakloop = true;
            }

            if (ehAceitacao) {
                lexemaAtual = lexemaAtual.join("");

                //CASO PALAVRA RESERVADA SUBSTITUI OS VALORES OBTIDOS ATÉ AGORA PELOS GUARDADOS NA TABELA DE SÍMBOLOS
                let palavraReservada = comparaLexemaComTabelaSimbolos(
                    tabelaSimbolos,
                    lexemaAtual
                );
                if (palavraReservada) {
                    lexemaAtual = palavraReservada.lexema;
                    token = palavraReservada.token;
                    // tipo = palavraReservada.tipo;
                }

                criaNovaLinhaTabelaLexica(lexemaAtual, token, "");
                if (token == "id") {
                    adicionaIdTabelaSimbolos(tabelaSimbolos, lexemaAtual, token, "");
                }

                estadoAfd = 0;
                lexemaAtual = [];
                ehAceitacao = false;
            } else {
                estadoAfd = 0;
                lexemaAtual = [];
                ehAceitacao = false;
                qtdLeiturasInvalidas++;
                continue;
            }
        }
    }

    return tabelaSimbolos;
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
    tabelaSimbolos.forEach(function(itemTabelaSimbolos) {
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