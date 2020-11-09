const tabelaSintatica = () => {
  let tabelaSintatica = [];

  tabelaSintatica[(0, "P")] = 1;
  tabelaSintatica[(0, "inicio")] = "S2";

  tabelaSintatica[(1, "$")] = "ACCEPT";

  tabelaSintatica[(2, "v")] = 3;
  tabelaSintatica[(2, "varinicio")] = "S4";

  tabelaSintatica[(3, "A")] = 5;
  tabelaSintatica[(3, "CABEÇALHO")] = 13;
  tabelaSintatica[(3, "ES")] = 6;
  tabelaSintatica[(3, "CMD")] = 7;
  tabelaSintatica[(3, "COND")] = 8;
  tabelaSintatica[(3, "fim")] = "S9";
  tabelaSintatica[(3, "id")] = "S12";
  tabelaSintatica[(3, "se")] = "S14";
  tabelaSintatica[(3, "leia")] = "S10";
  tabelaSintatica[(3, "escreva")] = "S11";

  tabelaSintatica[(4, "LV")] = 15;
  tabelaSintatica[(4, "D")] = 17;
  tabelaSintatica[(4, "varfim")] = "S16";
  tabelaSintatica[(4, "id")] = "S18";

  tabelaSintatica[(5, "?")] = "R2";

  tabelaSintatica[(6, "CMD")] = 7;
  tabelaSintatica[(6, "COND")] = 8;
  tabelaSintatica[(6, "ES")] = 6;
  tabelaSintatica[(6, "CABEÇALHO")] = 13;
  tabelaSintatica[(6, "fim")] = "S9";
  tabelaSintatica[(6, "leia")] = "S10";
  tabelaSintatica[(6, "escreva")] = "S11";
  tabelaSintatica[(6, "id")] = "S12";
  tabelaSintatica[(6, "se")] = "S14";

  tabelaSintatica[(7, "CMD")] = 7;
  tabelaSintatica[(7, "COND")] = 8;
  tabelaSintatica[(7, "ES")] = 9;
  tabelaSintatica[(7, "CABEÇALHO")] = 13;
  tabelaSintatica[(7, "fim")] = "S9";
  tabelaSintatica[(7, "leia")] = "S10";
  tabelaSintatica[(7, "escreva")] = "S11";
  tabelaSintatica[(7, "id")] = "S12";
  tabelaSintatica[(7, "se")] = "S14";

  tabelaSintatica[(8, "CMD")] = 7;
  tabelaSintatica[(8, "COND")] = 8;
  tabelaSintatica[(8, "ES")] = 9;
  tabelaSintatica[(8, "CABEÇALHO")] = 13;
  tabelaSintatica[(8, "fim")] = "S9";
  tabelaSintatica[(8, "leia")] = "S10";
  tabelaSintatica[(8, "escreva")] = "S11";
  tabelaSintatica[(8, "id")] = "S12";
  tabelaSintatica[(8, "se")] = "S14";

  tabelaSintatica[(9, "?")] = "R30";

  tabelaSintatica[(10, ";")] = "S57";

  tabelaSintatica[(11, "ARG")] = 19;
  tabelaSintatica[(11, "literal")] = "S20";
  tabelaSintatica[(11, "id")] = "S22";
  tabelaSintatica[(11, "num")] = "S21";

  tabelaSintatica[(12, "rcb")] = "S23";

  tabelaSintatica[(13, "ES")] = 27;
  tabelaSintatica[(13, "CMD")] = 28;
  tabelaSintatica[(13, "COND")] = 29;
  tabelaSintatica[(13, "CORPO")] = 24;
  tabelaSintatica[(13, "fimse")] = "S30";

  //TODO: TRATAR ABRE/FECHA PARENTESIS
  tabelaSintatica[(14, "EXP_R")] = 25;
  tabelaSintatica[(14, "OPRD")] = 43;
  tabelaSintatica[(14, "num")] = "S40";
  tabelaSintatica[(14, "id")] = "S39";

  tabelaSintatica[(15, "?")] = "R3";

  tabelaSintatica[(16, "?")] = "R5";

  tabelaSintatica[(17, "D")] = 17;
  tabelaSintatica[(17, "LV")] = 26;
  tabelaSintatica[(17, "varfim")] = "S31";
  tabelaSintatica[(17, "id")] = "S18";

  tabelaSintatica[(18, "TIPO")] = 31;
  tabelaSintatica[(18, "inteiro")] = "S33";
  tabelaSintatica[(18, "real")] = "S34";
  tabelaSintatica[(18, "lit")] = "S35";

  tabelaSintatica[(19, ";")] = "S56";

  tabelaSintatica[(20, "?")] = "R13";

  tabelaSintatica[(21, "?")] = "R14";

  tabelaSintatica[(22, "?")] = "R15";

  //TODO: TRATAR AMBIGUIDADE DE OPRD
  tabelaSintatica[(23, "OPRD")] = 37;
  tabelaSintatica[(23, "OPRD")] = 38;
  tabelaSintatica[(23, "LD")] = 36;
  tabelaSintatica[(23, "id")] = "S39";
  tabelaSintatica[(23, "num")] = "S40";

  tabelaSintatica[(24, "?")] = "R23";

  tabelaSintatica[(25, "entao")] = "R44";

  tabelaSintatica[(26, "?")] = "R3";

  tabelaSintatica[(27, "ES")] = 27;
  tabelaSintatica[(27, "CORPO")] = 47;
  tabelaSintatica[(27, "CMD")] = 28;
  tabelaSintatica[(27, "COND")] = 29;
  tabelaSintatica[(27, "escreva")] = "S51";
  tabelaSintatica[(27, "fimse")] = "S50";

  tabelaSintatica[(28, "ES")] = 27;
  tabelaSintatica[(28, "CORPO")] = 48;
  tabelaSintatica[(28, "CMD")] = 28;
  tabelaSintatica[(28, "COND")] = 29;
  tabelaSintatica[(28, "escreva")] = "S51";
  tabelaSintatica[(28, "fimse")] = "S50";

  tabelaSintatica[(29, "ES")] = 27;
  tabelaSintatica[(29, "CORPO")] = 49;
  tabelaSintatica[(29, "CMD")] = 28;
  tabelaSintatica[(29, "COND")] = 29;
  tabelaSintatica[(29, "escreva")] = "S51";
  tabelaSintatica[(29, "fimse")] = "S50";

  tabelaSintatica[(30, "?")] = "R29";

  tabelaSintatica[(31, "?")] = "R5";

  tabelaSintatica[(32, "?")] = "R6";

  tabelaSintatica[(33, "?")] = "R7";

  tabelaSintatica[(34, "?")] = "R8";

  tabelaSintatica[(35, "?")] = "R9";

  tabelaSintatica[(36, ";")] = "S58";

  tabelaSintatica[(37, "opm")] = "S41";

  tabelaSintatica[(38, "?")] = "R19";

  tabelaSintatica[(39, "?")] = "R20";

  tabelaSintatica[(40, "?")] = "R21";

  tabelaSintatica[(41, "OPRD")] = 42;
  tabelaSintatica[(41, "id")] = "S39";
  tabelaSintatica[(41, "num")] = "S40";

  tabelaSintatica[(42, "?")] = "R18";

  tabelaSintatica[(43, "opr")] = "S45";

  tabelaSintatica[(44, "?")] = "R24";

  tabelaSintatica[(45, "OPRD")] = 46;
  tabelaSintatica[(45, "id")] = "S39";
  tabelaSintatica[(45, "num")] = "S40";

  tabelaSintatica[(46, "?")] = "R25";

  tabelaSintatica[(47, "?")] = "R26";

  tabelaSintatica[(48, "?")] = "R27";

  tabelaSintatica[(49, "?")] = "R28";

  tabelaSintatica[(50, "?")] = "R29";

  tabelaSintatica[(51, "ARG")] = 52;
  tabelaSintatica[(51, "literal")] = "S53";
  tabelaSintatica[(51, "num")] = "S54";
  tabelaSintatica[(51, "id")] = "S55";

  tabelaSintatica[(52, "?")] = "R12";

  tabelaSintatica[(53, "?")] = "R13";

  tabelaSintatica[(54, "?")] = "R14";

  tabelaSintatica[(55, "?")] = "R15";

  tabelaSintatica[(56, "?")] = "R12";

  tabelaSintatica[(57, "?")] = "R11";

  tabelaSintatica[(58, "?")] = "R17";
};

export default tabelaSintatica;