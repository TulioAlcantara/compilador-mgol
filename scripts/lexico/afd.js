export default class AutomatoFinitoDeterministico {
    tabelaTransicao = [];
    estadosAceitacao = [];
    estadosNegacao = [];
    regNumero = new RegExp("^[0-9]$");
    regAlfabeto = new RegExp("^[A-Za-z]$");

    constructor() {
        this.criaTabelaTransicao();
    }

    criaTabelaTransicao() {
        this.tabelaTransicao[[0, ">"]] = [10, true, ""];
        this.tabelaTransicao[[10, "="]] = [3, true, ""];

        this.tabelaTransicao[[0, "<"]] = [9, true, ""];
        this.tabelaTransicao[[9, ">"]] = [2, true, ""];
        this.tabelaTransicao[[9, "="]] = [1, true, ""];
        this.tabelaTransicao[[9, "-"]] = [6, true, ""];

        this.tabelaTransicao[[0, "="]] = [8, true, ""];

        this.tabelaTransicao[[0, "-"]] = [12, true, ""];
        this.tabelaTransicao[[0, "+"]] = [12, true, ""];
        this.tabelaTransicao[[0, "*"]] = [12, true, ""];
        this.tabelaTransicao[[0, "/"]] = [12, true, ""];

        this.tabelaTransicao[[0, "EOF"]] = [16, true, ""];

        this.tabelaTransicao[[0, ";"]] = [6, true, ""];

        this.tabelaTransicao[[0, "("]] = [6, true, ""];

        this.tabelaTransicao[[0, ")"]] = [6, true, ""];

        this.tabelaTransicao[[0, "a"]] = [23, true, ""];
    }

    comparaEntradaComTabelaTransicao(estado, caracter) {
        let estadoResultado;
        if (this.regNumero.test(caracter)) {
            estadoResultado = this.tabelaTransicao[[estado, "a"]];
            return estadoResultado;
        }
        if (this.regAlfabeto.test(caracter)) {
            estadoResultado = this.tabelaTransicao[[estado, "0"]];
            return estadoResultado;
        } else {
            estadoResultado = this.tabelaTransicao[[estado, caracter]]
            return estadoResultado;
        }
    }
}

// adicionaEstadosAceitacao() {
//     this.estadosAceitacao = [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 14, 16, 17, 18, 19, 21, 22, 23];
// }

// adicionaEstadosNegacao() {
//     this.estadosNegacao = [4, 11, 13, 15, 20];
// }