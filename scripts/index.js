import analisadorSintatico from "./sintatico/sintatico.js";

window.onload = function () {
  document
    .getElementById("btn-compilar")
    .addEventListener("click", function () {
      compilador();
    });

  document
    .getElementById("btn-upload")
    .addEventListener("change", function (event) {
      uploadArquivo(event);
    });

  document.getElementById("btn-limpar").addEventListener("click", function () {
    limpaTela();
  });

  //TODO: Adicionar função para o output text scroll down a medida que ele é atualizado
};

const compilador = () => {
  limpaEntrada();
  const codigoFonte = document.getElementById("input-codigo-fonte").value;
  analisadorSintatico(codigoFonte);
};

const limpaEntrada = () => {
  document.getElementById("tabela-lexica-body").innerHTML = "";
};

const limpaTela = () => {
  document.getElementById("input-codigo-fonte").value = "";
  document.getElementById("output-codigo-fonte").value = "";
  document.getElementById("card-tabela-lexica").classList.add("d-none");
  document.getElementById("tabela-lexica-body").innerHTML = "";
};

const uploadArquivo = (event) => {
  event.stopPropagation();
  event.preventDefault();
  let codigoFonte;

  let arquivo = event.target.files[0];
  if (arquivo) {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      codigoFonte = event.target.result;
      document.getElementById("input-codigo-fonte").value += codigoFonte;
    };

    fileReader.readAsText(arquivo);
  }
};

export const retornaHoraAtual = () => {
  return new Date().toLocaleTimeString();
};
