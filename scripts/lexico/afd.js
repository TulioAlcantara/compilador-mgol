class AutomatoFinitoDeterministico {
    tabelaTransicao = [];
    estadosAceitacao = [];
    estadosNegacao = [];
    regNumero = new RegExp("^[0-9]$");
    regAlfabeto = new RegExp("^[A-Za-z]$");
    // regLiteralComentario = new RegExp('([^"]|}")*');
    regLiteralComentario = new RegExp('.*');


    constructor() {
        this.criaTabelaTransicao();
    }

    criaTabelaTransicao() {
        //WHITESPACE E QUEBRA DE LINHA
        this.tabelaTransicao[[0, " "]] = [30, false, ""];
        this.tabelaTransicao[[0, "\n"]] = [30, false, ""];

        //OPERADORES DE COMPARAÇÃO
        this.tabelaTransicao[[0, ">"]] = [10, true, "OPR"];
        this.tabelaTransicao[[10, "="]] = [3, true, "OPR"];
        this.tabelaTransicao[[0, "<"]] = [9, true, "OPR"];
        this.tabelaTransicao[[9, ">"]] = [2, true, "OPR"];
        this.tabelaTransicao[[9, "="]] = [1, true, "OPR"];
        this.tabelaTransicao[[0, "="]] = [8, true, "OPR"];

        //OPERADOR DE ATRIBUIÇÃO
        this.tabelaTransicao[[9, "-"]] = [6, true, "RCB"];

        //OPERADORES ARITMETICOS
        this.tabelaTransicao[[0, "-"]] = [12, true, "OPM"];
        this.tabelaTransicao[[0, "+"]] = [12, true, "OPM"];
        this.tabelaTransicao[[0, "*"]] = [12, true, "OPM"];
        this.tabelaTransicao[[0, "/"]] = [12, true, "OPM"];

        //EOF
        // this.tabelaTransicao[[0, "EOF"]] = [16, true, "EOF"];

        //PONTO E VIRGULA
        this.tabelaTransicao[[0, ";"]] = [6, true, "PT_V"];

        //PARENTESES
        this.tabelaTransicao[[0, "("]] = [6, true, "AB_P"];
        this.tabelaTransicao[[0, ")"]] = [6, true, "FC_P"];

        //IDENTIFICADOR OU PALAVRA RESERVADA
        this.tabelaTransicao[[0, "a"]] = [23, true, "id"];
        this.tabelaTransicao[[23, "a"]] = [23, true, "id"];
        this.tabelaTransicao[[23, "0"]] = [23, true, "id"];
        this.tabelaTransicao[[23, "_"]] = [23, true, "id"];

        //COMENTÁRIO
        this.tabelaTransicao[[0, "{"]] = [20, false, ""];
        this.tabelaTransicao[[20, "l"]] = [20, false, ""];
        this.tabelaTransicao[[20, "}"]] = [22, false, "Comentario"];

        //CONSTANTE LITERAL
        this.tabelaTransicao[[0, '"']] = [13, true, "Literal"];
        this.tabelaTransicao[[13, "l"]] = [13, false, ""];
        this.tabelaTransicao[[13, '"']] = [14, true, "Literal"];

        //CONSTANTE NUMÉRICA
        this.tabelaTransicao[[0, "0"]] = [7, true, "Num"];
        this.tabelaTransicao[[7, "0"]] = [7, true, "Num"];
        this.tabelaTransicao[[7, "."]] = [4, false, ""];
        this.tabelaTransicao[[4, "0"]] = [5, true, "Num"];
        this.tabelaTransicao[[5, "0"]] = [5, true, "Num"];
        //FALTA O EXPONENCIAL

        //INDICADOR DE FIM DE CADEIA DO ANALISADOR SINTÁTICO
        this.tabelaTransicao[[0, "$"]] = [31, true, "$"];
    }

    comparaEntradaComTabelaTransicao(estado, caracter) {
        let estadoResultado;
        //SÓ TRATA LITERAL E COMENTARIO QUANDO ESTIVER DENTRO DE {} OU ""
        if (
            caracter != '"' &&
            caracter != "}" &&
            this.regLiteralComentario.test(caracter)
        ) {
            if ((estado == 20 || estado == 13) && caracter) {
                estadoResultado = this.tabelaTransicao[[estado, "l"]]; // "l" = CARACTER QUE REPRESENTA LITERAL/COMENTÁRIO
                return estadoResultado;
            }
        }
        if (this.regAlfabeto.test(caracter)) {
            estadoResultado = this.tabelaTransicao[[estado, "a"]]; // "a" = CARACTER QUE REPRESENTA QUALQUER LETRA DO ALFABETO
            return estadoResultado;
        }
        if (this.regNumero.test(caracter)) {
            estadoResultado = this.tabelaTransicao[[estado, "0"]]; // "0" = CARACTER QUE REPRESENTA QUALQUER DIGITO NUMÉRICO
            return estadoResultado;
        }

        estadoResultado = this.tabelaTransicao[[estado, caracter]];
        return estadoResultado;
    }
}

export default AutomatoFinitoDeterministico;