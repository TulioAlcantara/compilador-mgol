import gramatica from "../sintatico/gramatica.js";

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

  novaEntrada = criaNovaEntrada("inteiro", "inteiro", "int");
  tabelaSimbolos.push(novaEntrada);

  novaEntrada = criaNovaEntrada("literal", "literal", "literal");
  tabelaSimbolos.push(novaEntrada);

  novaEntrada = criaNovaEntrada("real", "real", "double");
  tabelaSimbolos.push(novaEntrada);

  insereNaoTerminais(tabelaSimbolos);

  return tabelaSimbolos;
};

const criaNovaEntrada = (lexema, token, tipo) => {
  let entrada = {
    lexema: lexema,
    token: token,
    tipo: tipo,
  };
  return entrada;
};

const criaNovaEntradaNaoTerminal= (lexema, token, tipo, nome) => {
    let entrada = {
      lexema: lexema,
      token: token,
      tipo: tipo,
      nome: nome,
    };
    return entrada;
  };

const insereNaoTerminais = (tabelaSimbolos) => {
  let naoTerminaisJaRegistrados = [];
  let naoTerminalAtual;
  let novaEntrada;
  Object.keys(gramatica).forEach((regraGramatical) => {
      naoTerminalAtual = gramatica[regraGramatical][0];
      if(!naoTerminaisJaRegistrados.includes(naoTerminalAtual)){
        novaEntrada = criaNovaEntradaNaoTerminal("", "", "", `NAO_TERMINAL_${naoTerminalAtual}`);
        tabelaSimbolos.push(novaEntrada);
      }
      naoTerminaisJaRegistrados.push(naoTerminalAtual);
  });
};

export default tabelaSimbolos;
