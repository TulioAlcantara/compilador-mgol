import obterTabelaSimbolos from "./tabelaSimbolos.js";
import AutomatoFinitoDeterministico from "./afd.js";

export const analisadorLexico = (codigoFonte) => {
    const textoOutput = document.querySelector("#output-codigo-fonte");
    const tabelaLexicaBody = document.querySelector("#tabela-lexica-body");
    let afd = new AutomatoFinitoDeterministico();
    let tabelaSimbolos = obterTabelaSimbolos();
    let lexemaAtual = [];
    let estadoAfd = 0;
    let linhaAtual = 0;
    let ehAceitacao = false;
    let token = "";

    if (!validaCodigoFonte(codigoFonte)) {
        textoOutput.value += "ERRO: Código fonte vazio\n";
        return;
    } else {
        textoOutput.value += "Iniciando analise léxica...\n";
    }

    for (let i = 0; i < codigoFonte.length; i++) {
        let caracter = codigoFonte[i];
        if (caracter == " " || caracter == "\t" || caracter == "\n") {
            if (ehAceitacao) {
                criaNovaLinhaTabelaLexica(lexemaAtual.join(""), token, "");
                estadoAfd = 0;
                lexemaAtual = [];
            }
            if (caracter == "\n") {
                linhaAtual++;
            }
        } else {
            let resultadoAfd = afd.comparaEntradaComTabelaTransicao(estadoAfd, caracter);

            if (!resultadoAfd) {
                textoOutput.value += `ERRO: linha ${linhaAtual}, coluna ${indice}\n`;
            }

            estadoAfd = resultadoAfd[0];
            ehAceitacao = resultadoAfd[1];
            token = resultadoAfd[2];

            if (ehAceitacao) {
                lexemaAtual.push(caracter);
            } else {
                textoOutput.value += `ERRO: linha ${linhaAtual}, coluna ${indice}\n`;
            }
        }
    }
};

const validaCodigoFonte = (codigoFonte) => {
    if (codigoFonte === undefined || !codigoFonte.trim().length) {
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
    tipo = "-";
    console.log(`${lexema} / ${token} / ${tipo}`);
};

// const tabelaSimbolos = (estado, caracter) => {
//     const estadoResutado = comparaEstadoComCaracter(estado, caracter);
//     return estadoResutado
// }