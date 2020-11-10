const obterTabelaSintatica = () => {
  // follow = {}
  // follow["P'"] = ['EOF'] # $ token fim de arquivo
  // follow["P"] = ['EOF'] # $
  // follow["V"] = ['fim', 'leia','escreva','id','se']
  // follow["LV"] = ['fim', 'leia','escreva','id','se']
  // follow["D"] = ['varfim','id']
  // follow["TIPO"] = ['PT_V']
  // follow["A"] = ['EOF'] # $
  // follow["ES"] = ['fim','leia','escreva','id','se','fimse']
  // follow["ARG"] = ['PT_V']
  // follow["CMD"] = ['fim','leia','escreva','id','se','fimse']
  // follow["LD"] = ['PT_V']
  // follow['OPRD'] = ['opm','PT_V','opr','FC_P']
  // follow['COND'] = ['fim','leia','escreva','id','se','fimse']
  // follow['CABEÇALHO'] = ['leia','escreva','id','fimse','se']
  // follow['EXP_R'] = ['FC_P']
  // follow['CORPO'] = ['fim','leia','escreva','id','se','fimse']

  let tabelaSintatica = [];

  tabelaSintatica[[0, "P"]] = 1;
  tabelaSintatica[[0, "inicio"]] = "S2";

  tabelaSintatica[[1, "$"]] = "ACCEPT";

  tabelaSintatica[[2, "V"]] = 3;
  tabelaSintatica[[2, "varinicio"]] = "S4";

  tabelaSintatica[[3, "A"]] = 5;
  tabelaSintatica[[3, "CABEÇALHO"]] = 13;
  tabelaSintatica[[3, "ES"]] = 6;
  tabelaSintatica[[3, "CMD"]] = 7;
  tabelaSintatica[[3, "COND"]] = 8;
  tabelaSintatica[[3, "fim"]] = "S9";
  tabelaSintatica[[3, "id"]] = "S12";
  tabelaSintatica[[3, "se"]] = "S14";
  tabelaSintatica[[3, "leia"]] = "S10";
  tabelaSintatica[[3, "escreva"]] = "S11";

  tabelaSintatica[[4, "LV"]] = 15;
  tabelaSintatica[[4, "D"]] = 17;
  tabelaSintatica[[4, "varfim"]] = "S16";
  tabelaSintatica[[4, "id"]] = "S18";

  tabelaSintatica[[5, "$"]] = "R2";

  tabelaSintatica[[6, "CMD"]] = 7;
  tabelaSintatica[[6, "COND"]] = 8;
  tabelaSintatica[[6, "ES"]] = 6;
  tabelaSintatica[[6, "CABEÇALHO"]] = 13;
  tabelaSintatica[[6, "fim"]] = "S9";
  tabelaSintatica[[6, "leia"]] = "S10";
  tabelaSintatica[[6, "escreva"]] = "S11";
  tabelaSintatica[[6, "id"]] = "S12";
  tabelaSintatica[[6, "se"]] = "S14";

  tabelaSintatica[[7, "CMD"]] = 7;
  tabelaSintatica[[7, "COND"]] = 8;
  tabelaSintatica[[7, "ES"]] = 9;
  tabelaSintatica[[7, "CABEÇALHO"]] = 13;
  tabelaSintatica[[7, "fim"]] = "S9";
  tabelaSintatica[[7, "leia"]] = "S10";
  tabelaSintatica[[7, "escreva"]] = "S11";
  tabelaSintatica[[7, "id"]] = "S12";
  tabelaSintatica[[7, "se"]] = "S14";

  tabelaSintatica[[8, "CMD"]] = 7;
  tabelaSintatica[[8, "COND"]] = 8;
  tabelaSintatica[[8, "ES"]] = 9;
  tabelaSintatica[[8, "CABEÇALHO"]] = 13;
  tabelaSintatica[[8, "fim"]] = "S9";
  tabelaSintatica[[8, "leia"]] = "S10";
  tabelaSintatica[[8, "escreva"]] = "S11";
  tabelaSintatica[[8, "id"]] = "S12";
  tabelaSintatica[[8, "se"]] = "S14";

  tabelaSintatica[[9, "$"]] = "R30";

  tabelaSintatica[[10, "id"]] = "S61";

  tabelaSintatica[[11, "ARG"]] = 19;
  tabelaSintatica[[11, "literal"]] = "S20";
  tabelaSintatica[[11, "id"]] = "S22";
  tabelaSintatica[[11, "num"]] = "S21";

  tabelaSintatica[[12, "rcb"]] = "S23";

  tabelaSintatica[[13, "ES"]] = 27;
  tabelaSintatica[[13, "CMD"]] = 28;
  tabelaSintatica[[13, "COND"]] = 29;
  tabelaSintatica[[13, "CORPO"]] = 24;
  tabelaSintatica[[13, "fimse"]] = "S50";
  tabelaSintatica[[13, "escreva"]] = "S51";
  tabelaSintatica[[13, "se"]] = "S14";
  tabelaSintatica[[13, "CABEÇALHO"]] = 13;


  //TODO: TRATAR ABRE/FECHA PARENTESIS
  tabelaSintatica[[14, "ab_p"]] = "S62";
  // tabelaSintatica[[14, "OPRD"]] = 43;
  // tabelaSintatica[[14, "num"]] = "S40";
  // tabelaSintatica[[14, "id"]] = "S39";

  tabelaSintatica[[15, "leia"]] = "R3";
  tabelaSintatica[[15, "escreva"]] = "R3";
  tabelaSintatica[[15, "id"]] = "R3";
  tabelaSintatica[[15, "fim"]] = "R3";
  tabelaSintatica[[15, "se"]] = "R3";

  tabelaSintatica[[16, "pt_v"]] = "S60";

  tabelaSintatica[[17, "D"]] = 17;
  tabelaSintatica[[17, "LV"]] = 26;
  tabelaSintatica[[17, "varfim"]] = "S31";
  tabelaSintatica[[17, "id"]] = "S18";

  tabelaSintatica[[18, "TIPO"]] = 32;
  tabelaSintatica[[18, "inteiro"]] = "S33";
  tabelaSintatica[[18, "real"]] = "S34";
  tabelaSintatica[[18, "literal"]] = "S35";

  tabelaSintatica[[19, "pt_v"]] = "S56";

  tabelaSintatica[[20, "pt_v"]] = "R13";

  tabelaSintatica[[21, "pt_v"]] = "R14";

  tabelaSintatica[[22, "pt_v"]] = "R15";

  //TODO: TRATAR AMBIGUIDADE DE OPRD
  tabelaSintatica[[23, "OPRD"]] = 37;
  // tabelaSintatica[[23, "OPRD"]] = 38;
  tabelaSintatica[[23, "LD"]] = 36;
  tabelaSintatica[[23, "id"]] = "S39";
  tabelaSintatica[[23, "num"]] = "S40";

  tabelaSintatica[[24, "leia"]] = "R23";
  tabelaSintatica[[24, "escreva"]] = "R23";
  tabelaSintatica[[24, "fim"]] = "R23";
  tabelaSintatica[[24, "se"]] = "R23";
  tabelaSintatica[[24, "fimse"]] = "R23";
  tabelaSintatica[[24, "id"]] = "R23";

  tabelaSintatica[[25, "fc_p"]] = "S63";

  tabelaSintatica[[26, "leia"]] = "R4";
  tabelaSintatica[[26, "escreva"]] = "R4";
  tabelaSintatica[[26, "fim"]] = "R4";
  tabelaSintatica[[26, "se"]] = "R4";
  tabelaSintatica[[26, "id"]] = "R4";

  tabelaSintatica[[27, "ES"]] = 27;
  tabelaSintatica[[27, "CORPO"]] = 47;
  tabelaSintatica[[27, "CMD"]] = 28;
  tabelaSintatica[[27, "COND"]] = 29;
  tabelaSintatica[[27, "escreva"]] = "S51";
  tabelaSintatica[[27, "fimse"]] = "S50";

  tabelaSintatica[[28, "ES"]] = 27;
  tabelaSintatica[[28, "CORPO"]] = 48;
  tabelaSintatica[[28, "CMD"]] = 28;
  tabelaSintatica[[28, "COND"]] = 29;
  tabelaSintatica[[28, "escreva"]] = "S51";
  tabelaSintatica[[28, "fimse"]] = "S50";

  tabelaSintatica[[29, "ES"]] = 27;
  tabelaSintatica[[29, "CORPO"]] = 49;
  tabelaSintatica[[29, "CMD"]] = 28;
  tabelaSintatica[[29, "COND"]] = 29;
  tabelaSintatica[[29, "escreva"]] = "S51";
  tabelaSintatica[[29, "fimse"]] = "S50";

  // tabelaSintatica[[30, "leia"]] = "R29";
  // tabelaSintatica[[30, "escreva"]] = "R29";
  // tabelaSintatica[[30, "id"]] = "R29";
  // tabelaSintatica[[30, "se"]] = "R29";
  // tabelaSintatica[[30, "fim"]] = "R29";
  // tabelaSintatica[[30, "fimse"]] = "R29";

  tabelaSintatica[[31, "pt_v"]] = "S60";

  tabelaSintatica[[32, "pt_v"]] = "S59";

  tabelaSintatica[[33, "pt_v"]] = "R7";

  tabelaSintatica[[34, "pt_v"]] = "R8";

  tabelaSintatica[[35, "pt_v"]] = "R9";

  tabelaSintatica[[36, "pt_v"]] = "S58";

  tabelaSintatica[[37, "opm"]] = "S41";
  tabelaSintatica[[37, "pt_v"]] = "R19";


  tabelaSintatica[[38, "pt_v"]] = "R19";

  tabelaSintatica[[39, "opm"]] = "R20";
  tabelaSintatica[[39, "pt_v"]] = "R20";
  tabelaSintatica[[39, "opr"]] = "R20";
  tabelaSintatica[[39, "fc_p"]] = "R20";

  tabelaSintatica[[40, "opm"]] = "R21";
  tabelaSintatica[[40, "pt_v"]] = "R21";
  tabelaSintatica[[40, "opr"]] = "R21";
  tabelaSintatica[[40, "fc_p"]] = "R21";

  tabelaSintatica[[41, "OPRD"]] = 42;
  tabelaSintatica[[41, "id"]] = "S39";
  tabelaSintatica[[41, "num"]] = "S40";

  tabelaSintatica[[42, "pt_v"]] = "R18";

  tabelaSintatica[[43, "opr"]] = "S45";

  tabelaSintatica[[44, "leia"]] = "R24";
  tabelaSintatica[[44, "escreva"]] = "R24";
  tabelaSintatica[[44, "id"]] = "R24";
  tabelaSintatica[[44, "se"]] = "R24";
  tabelaSintatica[[44, "fim"]] = "R24";
  tabelaSintatica[[44, "fimse"]] = "R24";

  tabelaSintatica[[45, "OPRD"]] = 46;
  tabelaSintatica[[45, "id"]] = "S39";
  tabelaSintatica[[45, "num"]] = "S40";

  tabelaSintatica[[46, "fc_p"]] = "R25";

  tabelaSintatica[[47, "leia"]] = "R26";
  tabelaSintatica[[47, "escreva"]] = "R26";
  tabelaSintatica[[47, "id"]] = "R26";
  tabelaSintatica[[47, "se"]] = "R26";
  tabelaSintatica[[47, "fim"]] = "R26";
  tabelaSintatica[[47, "fimse"]] = "R26";

  tabelaSintatica[[48, "leia"]] = "R27";
  tabelaSintatica[[48, "escreva"]] = "R27";
  tabelaSintatica[[48, "id"]] = "R27";
  tabelaSintatica[[48, "se"]] = "R27";
  tabelaSintatica[[48, "fim"]] = "R27";
  tabelaSintatica[[48, "fimse"]] = "R27";

  tabelaSintatica[[49, "leia"]] = "R28";
  tabelaSintatica[[49, "escreva"]] = "R28";
  tabelaSintatica[[49, "id"]] = "R28";
  tabelaSintatica[[49, "se"]] = "R28";
  tabelaSintatica[[49, "fim"]] = "R28";
  tabelaSintatica[[49, "fimse"]] = "R28";

  tabelaSintatica[[50, "leia"]] = "R29";
  tabelaSintatica[[50, "escreva"]] = "R29";
  tabelaSintatica[[50, "id"]] = "R29";
  tabelaSintatica[[50, "se"]] = "R29";
  tabelaSintatica[[50, "fim"]] = "R29";
  tabelaSintatica[[50, "fimse"]] = "R29";

  tabelaSintatica[[51, "ARG"]] = 19; //PREVIAMENTE 52
  tabelaSintatica[[51, "literal"]] = "S53";
  tabelaSintatica[[51, "num"]] = "S54";
  tabelaSintatica[[51, "id"]] = "S55";
  
  // tabelaSintatica[[52, "leia"]] = "R12";
  // tabelaSintatica[[52, "escreva"]] = "R12";
  // tabelaSintatica[[52, "id"]] = "R12";
  // tabelaSintatica[[52, "se"]] = "R12";
  // tabelaSintatica[[52, "fim"]] = "R12";
  // tabelaSintatica[[52, "fimse"]] = "R12";

  tabelaSintatica[[53, "pt_v"]] = "R13";

  tabelaSintatica[[54, "pt_v"]] = "R14";

  tabelaSintatica[[55, "pt_v"]] = "R15";

  tabelaSintatica[[56, "leia"]] = "R12";
  tabelaSintatica[[56, "escreva"]] = "R12";
  tabelaSintatica[[56, "id"]] = "R12";
  tabelaSintatica[[56, "se"]] = "R12";
  tabelaSintatica[[56, "fim"]] = "R12";
  tabelaSintatica[[56, "fimse"]] = "R12";

  tabelaSintatica[[57, "leia"]] = "R11";
  tabelaSintatica[[57, "escreva"]] = "R11";
  tabelaSintatica[[57, "id"]] = "R11";
  tabelaSintatica[[57, "se"]] = "R11";
  tabelaSintatica[[57, "fim"]] = "R11";
  tabelaSintatica[[57, "fimse"]] = "R11";

  tabelaSintatica[[58, "leia"]] = "R17";
  tabelaSintatica[[58, "escreva"]] = "R17";
  tabelaSintatica[[58, "id"]] = "R17";
  tabelaSintatica[[58, "se"]] = "R17";
  tabelaSintatica[[58, "fim"]] = "R17";
  tabelaSintatica[[58, "fimse"]] = "R17";

  tabelaSintatica[[59, "varfim"]] = "R6";
  tabelaSintatica[[59, "id"]] = "R6";

  tabelaSintatica[[60, "leia"]] = "R5";
  tabelaSintatica[[60, "escreva"]] = "R5";
  tabelaSintatica[[60, "id"]] = "R5";
  tabelaSintatica[[60, "se"]] = "R5";
  tabelaSintatica[[60, "fim"]] = "R5";

  tabelaSintatica[[61, "pt_v"]] = "S57";

  tabelaSintatica[[62, "EXP_R"]] = 25;
  tabelaSintatica[[62, "OPRD"]] = 43;
  tabelaSintatica[[62, "num"]] = "S40";
  tabelaSintatica[[62, "id"]] = "S39";

  tabelaSintatica[[63, "entao"]] = "S44";

  return tabelaSintatica;
};

export default obterTabelaSintatica;
