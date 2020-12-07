let codigoObjeto = "";
let novaTabelaSimbolos;

//POSIÇÕES DOS NAO TERMINAIS
let posicaoNAO_TERMINAL_TIPO;
let posicaoARG;

const semantico = (numeroRegraGramatical, naoTerminal, tabelaSimbolos, pilhaAtributos) => {
  novaTabelaSimbolos = tabelaSimbolos;
  msgRegraSemantica(numeroRegraGramatical);

  switch (numeroRegraGramatical) {
    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    case 5:
      addCodigoObjeto("\n\n\n");
      break;

    case 6:
      pilhaAtributos.pop(); //REMOVER PONTO E VIRGULA
      let posicaoTipoDoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop());
      let posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop());
      novaTabelaSimbolos[posicaoId].tipo = novaTabelaSimbolos[posicaoTipoDoId].tipo;
      addCodigoObjeto(
        `${novaTabelaSimbolos[posicaoTipoDoId].tipo} ${novaTabelaSimbolos[posicaoId].lexema};\n`
      );
      break;

    case 7:
      posicaoNAO_TERMINAL_TIPO = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_TIPO");
      let posicaoInteiro = encontreTerminalNaTabelaDeSimbolos("inteiro");
      novaTabelaSimbolos[posicaoNAO_TERMINAL_TIPO].tipo = novaTabelaSimbolos[posicaoInteiro].tipo;
      break;

    case 8:
      posicaoNAO_TERMINAL_TIPO = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_TIPO");
      let posicaoReal = encontreTerminalNaTabelaDeSimbolos("real");
      novaTabelaSimbolos[posicaoNAO_TERMINAL_TIPO].tipo = novaTabelaSimbolos[posicaoReal].tipo;
      break;

    case 9:
      posicaoNAO_TERMINAL_TIPO = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_TIPO");
      let posicaoLiteral = encontreTerminalNaTabelaDeSimbolos("literal");
      novaTabelaSimbolos[posicaoNAO_TERMINAL_TIPO].tipo = novaTabelaSimbolos[posicaoLiteral].tipo;
      break;

    case 10:
      break;

    case 11:
      break;

    case 12:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      addCodigoObjeto(`printf(${tabelaSimbolos[posicaoARG].lexema});\n`);
      break;

    case 13:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      tabelaSimbolos[posicaoARG].lexema = pilhaAtributos.pop();
      tabelaSimbolos[posicaoARG].token = "literal";
      tabelaSimbolos[posicaoARG].tipo = "";
      break;

    case 14:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      tabelaSimbolos[posicaoARG].lexema = pilhaAtributos.pop();
      tabelaSimbolos[posicaoARG].token = "Num";
      tabelaSimbolos[posicaoARG].tipo = "";
      break;
  }
  return {
    novaTabelaSimbolos: novaTabelaSimbolos,
    codigoObjeto: codigoObjeto,
  };
};

const addCodigoObjeto = (linhaCodigo) => {
  codigoObjeto += linhaCodigo;
};

const encontreTerminalNaTabelaDeSimbolos = (lexema) => {
  return novaTabelaSimbolos.findIndex((elemento) => elemento.lexema == lexema);
};

const encontreNaoTerminalNaTabelaDeSimbolos = (nome) =>{
    return novaTabelaSimbolos.findIndex((elemento) => elemento.nome == nome);
}

const msgRegraSemantica = (regraSemantica) => {
  document.querySelector(
    "#output-codigo-fonte"
  ).value += `- Aplicando regra semântica: ${regraSemantica}\n`;
};

export default semantico;
