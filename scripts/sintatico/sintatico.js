import analisadorLexico from "../lexico/lexico.js";
import gramatica from "./gramatica.js";
import tabelaSintatica from "./tabelaSintatica.js"
import { retornaHoraAtual } from "../index.js";

let pilha = [];
let indice = 0;
let coluna = 0;
let linha = 0;
let codigoFonte = "";
let entradaLexica = {
  indice: indice,
  coluna: coluna,
  linha: linha,
  codigoFonte: codigoFonte,
};

const analisadorSintatico = (codigoFonte) => {
  let saidaLexica;
  let token;
  pilha.push("$");  

  // while(1){
  //   saidaLexica = analisadorLexico(entradaLexica);
  //   token = saidaLexica.token;

  //   // CASO SHIFT
  //   if(tabelaSintatica[]){}
    
  //   // CASO REDUCE
  //   else if(tabelaSintatica[]){}
    
  //   // CASO ACCEPT
  //   else if(tabelaSintatica[]){}
    
  //   // CASO ERROR
  //   else{
  //     modoPanico();
  //   }
  // }
};

const modoPanico = () => {};

const atualizaEntradaLexica = (saidaLexica) =>{
  indice = saidaLexica.indice;
  linha = saidaLexica.linha;
  coluna = saidaLexica.coluna;
}

// const msgIniciandoAnaliseLexica = () => {
//   document.querySelector(
//     "#output-codigo-fonte"
//   ).value += `${retornaHoraAtual()} - Iniciando analise léxica...\n`;
// };

// const msgAnaliseLexicaConcluida = () => {
//   document.querySelector(
//     "#output-codigo-fonte"
//   ).value += `${retornaHoraAtual()} - Analise léxica concluída\n`;
// };

export default analisadorSintatico;