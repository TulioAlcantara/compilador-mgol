const tabelaSimbolos = () => {
    let tabelaSimbolos = [];
    let novaEntrada;

    novaEntrada = criaNovaEntrada("inicio", "inicio", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("varinicio", "varinicio", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("varfim", "varfim", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("escreva", "escreva", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("leia", "leia", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("se", "se", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("entao", "entao", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("fimse", "fimse", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("fim", "fim", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("inteiro", "inteiro", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("lit", "lit", "-");
    tabelaSimbolos.push(novaEntrada);

    novaEntrada = criaNovaEntrada("real", "real", "-");
    tabelaSimbolos.push(novaEntrada);

    return tabelaSimbolos;
}


const criaNovaEntrada = (lexema, token, tipo) => {
    let entrada = {
        lexema: lexema,
        token: token,
        tipo: tipo,
    }
    return entrada;
}

export default tabelaSimbolos;
