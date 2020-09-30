import { analisadorLexico } from "./lexico/lexico.js";

window.onload = function() {
    document
        .getElementById("btn-compilar")
        .addEventListener("click", function() {
            compilador();
        });

    document.getElementById("btn-upload").addEventListener("click", function() {
        leituraUpload();
    });

    document.getElementById("btn-limpar").addEventListener("click", function() {
        limpaTela();
    });

    //TODO: Adicionar função para o output text scroll down a medida que ele é atualizado
};

const compilador = () => {
    const codigoFonte = document.getElementById("input-codigo-fonte").value;
    document.querySelector("#output-codigo-fonte").value = "";
    let tabelaLexica = analisadorLexico(codigoFonte);
};

const leituraUpload = () => {
    console.log("UPLOAD");
};

const limpaTela = () => {
    document.getElementById("input-codigo-fonte").value = "";
    document.getElementById("output-codigo-fonte").value = "";
    document.getElementById("card-tabela-lexica").classList.add("d-none");
};