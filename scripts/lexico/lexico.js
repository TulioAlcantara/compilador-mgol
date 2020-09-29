const analisadorLexico = (codigoFonte) => {
    const outputText = document.querySelector("#output-codigo-fonte");
    const tabelaLexicaBody = document.querySelector("#tabela-lexica-body");
    
    if (codigoFonte === undefined) {
        outputText.value += "Codigo fonte vazio";
    }
    let lexemaAtual = [];
    let estado = 0;

    for (const caracter of codigoFonte) {
        if ((caracter == ' ') || (caracter == '\t') || (caracter == '\n')) {
            adicionaTabelaLexica(estado, lexemaAtual);
            estado = 0;
            lexemaAtual = [];

        }
        const novoEstado = tabelaSimbolos(estado, caracter)
        estado = novoEstado;
        lexemaAtual.push(caracter);
    }
}

const tabelaSimbolos = (estado, caracter) => {
    const estadoResutado = comparaEstadoComCaracter(estado, caracter);
    return estadoResutado
}

