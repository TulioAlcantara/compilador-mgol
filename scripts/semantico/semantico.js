let codigoObjeto = "";
let novaTabelaSimbolos;
let countVariaveisTemporarias = 0;
let topoPilha;

//POSIÇÕES NA TABELA DE SIMBOLOS
let posicaoId;
let posicaoNAO_TERMINAL_TIPO;
let posicaoARG;
let posicaoLD;
let posicaoOPRD;
let posicaoOPRD2;
let posicaoEXPR_R;

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
      pilhaAtributos.pop()[0]; //REMOVER PONTO E VIRGULA
      let posicaoTipoDoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
      posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
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
      pilhaAtributos.pop()[0]; //REMOVER PONTO E VIRGULA
      posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
      let idTipo = tabelaSimbolos[posicaoId].tipo;
      let idLexema = tabelaSimbolos[posicaoId].lexema;
      if (tabelaSimbolos[posicaoId].tipo != "") {
        if (idTipo == "int") {
          addCodigoObjeto(`scanf("%d", &${idLexema});\n`);
        }
        if (idTipo == "double") {
          addCodigoObjeto(`scanf("%lf", &${idLexema});\n`);
        }
        if (idTipo == "literal") {
          addCodigoObjeto(`scanf("%s", ${idLexema});\n`);
        }
      } else {
        msgErroSemantico("Variável não declarada");
      }
      break;

    case 12:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      if(tabelaSimbolos[posicaoARG].tipo == "literal"){
      addCodigoObjeto(`printf("%s", ${tabelaSimbolos[posicaoARG].lexema});\n`);
      }
      else if (tabelaSimbolos[posicaoARG].tipo == "int"){
        addCodigoObjeto(`printf("%d", ${tabelaSimbolos[posicaoARG].lexema});\n`);

      }
      else if(tabelaSimbolos[posicaoARG].tipo == "double"){
        addCodigoObjeto(`printf("%lf", ${tabelaSimbolos[posicaoARG].lexema});\n`);

      }
      break;

    case 13:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      tabelaSimbolos[posicaoARG].lexema = pilhaAtributos.pop()[0];
      tabelaSimbolos[posicaoARG].token = "Literal";
      tabelaSimbolos[posicaoARG].tipo = "literal";
      break;

    case 14:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      topoPilha = pilhaAtributos.pop();
      tabelaSimbolos[posicaoARG].lexema = topoPilha[0];
      tabelaSimbolos[posicaoARG].token = topoPilha[1];
      tabelaSimbolos[posicaoARG].tipo = topoPilha[2];
      break;

    case 15:
      posicaoARG = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_ARG");
      posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
      if (tabelaSimbolos[posicaoId].tipo != "") {
        tabelaSimbolos[posicaoARG].lexema = tabelaSimbolos[posicaoId].lexema;
        tabelaSimbolos[posicaoARG].token = tabelaSimbolos[posicaoId].token;
        tabelaSimbolos[posicaoARG].tipo = tabelaSimbolos[posicaoId].tipo;
      } else {
        msgErroSemantico("Variável não declarada");
      }

    case 16:
      break;

    case 17:
      pilhaAtributos.pop()[0]; //REMOVER PONTO E VIRGULA
      let rcb = pilhaAtributos.pop();
      posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
      posicaoLD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_LD");

      if (tabelaSimbolos[posicaoId].tipo != "") {
        if (tabelaSimbolos[posicaoId].tipo == tabelaSimbolos[posicaoLD].tipo) {
          addCodigoObjeto(
            `${tabelaSimbolos[posicaoId].lexema} ${rcb[2]} ${tabelaSimbolos[posicaoLD].lexema};\n`
          );
        } else {
          msgErroSemantico("Tipos diferentes para atribuição");
        }
      } else {
        msgErroSemantico("Variável não declarada");
      }

      break;

    case 18:
      posicaoOPRD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD");
      posicaoOPRD2 = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD2");
      posicaoLD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_LD");
      if (
        tabelaSimbolos[posicaoOPRD].tipo == tabelaSimbolos[posicaoOPRD2].tipo &&
        tabelaSimbolos[posicaoOPRD].tipo != "literal"
      ) {
        tabelaSimbolos[posicaoLD].lexema = `T${countVariaveisTemporarias}`;
        tabelaSimbolos[posicaoLD].token = "Num";
        tabelaSimbolos[posicaoLD].tipo = "int";

        addCodigoObjeto(
          `T${countVariaveisTemporarias} = ${tabelaSimbolos[posicaoOPRD].lexema} ${
            pilhaAtributos.pop()[0]
          } ${tabelaSimbolos[posicaoOPRD2].lexema};\n`
        );

        countVariaveisTemporarias++;
      } else {
        msgErroSemantico("Operandos com tipos incompatíveis");
      }

      break;

    case 19:
      posicaoOPRD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD");
      posicaoOPRD2 = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD2");
      posicaoLD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_LD");
      if (tabelaSimbolos[posicaoOPRD2].tipo != "") {
        tabelaSimbolos[posicaoLD].lexema = tabelaSimbolos[posicaoOPRD2].lexema;
        tabelaSimbolos[posicaoLD].token = tabelaSimbolos[posicaoOPRD2].token;
        tabelaSimbolos[posicaoLD].tipo = tabelaSimbolos[posicaoOPRD2].tipo;
      } else {
        tabelaSimbolos[posicaoLD].lexema = tabelaSimbolos[posicaoOPRD].lexema;
        tabelaSimbolos[posicaoLD].token = tabelaSimbolos[posicaoOPRD].token;
        tabelaSimbolos[posicaoLD].tipo = tabelaSimbolos[posicaoOPRD].tipo;
      }

      break;

    case 20:
      posicaoOPRD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD");
      posicaoId = encontreTerminalNaTabelaDeSimbolos(pilhaAtributos.pop()[0]);
      if (tabelaSimbolos[posicaoId].tipo != "") {
        tabelaSimbolos[posicaoOPRD].lexema = tabelaSimbolos[posicaoId].lexema;
        tabelaSimbolos[posicaoOPRD].token = tabelaSimbolos[posicaoId].token;
        tabelaSimbolos[posicaoOPRD].tipo = tabelaSimbolos[posicaoId].tipo;
      } else {
        msgErroSemantico("Variável não declarada");
      }
      break;

    case 21:
      posicaoOPRD2 = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD2");
      topoPilha = pilhaAtributos.pop();
      tabelaSimbolos[posicaoOPRD2].lexema = topoPilha[0];
      tabelaSimbolos[posicaoOPRD2].token = topoPilha[1];
      tabelaSimbolos[posicaoOPRD2].tipo = topoPilha[2];
      break;

    case 22:
      break;

    case 23:
      addCodigoObjeto("}\n");
      break;

    case 24:
      posicaoEXPR_R = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_EXP_R");
      addCodigoObjeto(`if(${tabelaSimbolos[posicaoEXPR_R].lexema}){\n`);
      break;

    case 25:
      posicaoOPRD = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD");
      posicaoOPRD2 = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_OPRD2");
      posicaoEXPR_R = encontreNaoTerminalNaTabelaDeSimbolos("NAO_TERMINAL_EXP_R");
      if (tabelaSimbolos[posicaoOPRD].tipo == tabelaSimbolos[posicaoOPRD2].tipo) {
        tabelaSimbolos[posicaoEXPR_R].lexema = `T${countVariaveisTemporarias}`;

        addCodigoObjeto(
          `T${countVariaveisTemporarias} = ${tabelaSimbolos[posicaoOPRD].lexema} ${
            pilhaAtributos.pop()[0]
          } ${tabelaSimbolos[posicaoOPRD2].lexema};\n`
        );

        countVariaveisTemporarias++;
      } else {
        msgErroSemantico("Operandos com tipos incompatíveis");
      }
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

const encontreNaoTerminalNaTabelaDeSimbolos = (nome) => {
  return novaTabelaSimbolos.findIndex((elemento) => elemento.nome == nome);
};

const msgRegraSemantica = (regraSemantica) => {
  document.querySelector(
    "#output-codigo-fonte"
  ).value += `- Aplicando regra semântica: ${regraSemantica}\n`;
};

const msgErroSemantico = (msgErro) => {
  document.querySelector("#output-codigo-fonte").value += `- ERRO SEMÂNTICO: ${msgErro}\n`;
};

export const finalizaCodigoObjeto = (codigoObjeto) => {
  let novoCodigoObjeto = `#include<stdio.h>\n
  typedef char literal[256];\n
  int main(void)\n
  {\n
  /*----Variaveis temporarias----*/\n`;

  for (let i = 0; i < countVariaveisTemporarias; i++) {
    novoCodigoObjeto += `int T${i};\n`;
  }

  novoCodigoObjeto += "/*------------------------------*/\n";
  novoCodigoObjeto += codigoObjeto;
  novoCodigoObjeto += "return 0;\n";
  novoCodigoObjeto += "}\n";

  return novoCodigoObjeto;
};

export default semantico;
