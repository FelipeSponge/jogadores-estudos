const telaInicial = document.querySelector(".inicio");
const telaPrincipal = document.querySelector(".principal");
const telaFinal = document.querySelector(".final");
const botaoComecar = document.querySelector(".inicio__botao-comecar");
const imagemJogador = document.querySelector(".conteudo__imagem");
const nomeJogador = document.querySelector(".conteudo__nome-jogador");
const opcoesResposta = document.querySelectorAll(".opcoes-resposta--botao");
const botaoFinal = document.querySelector(".final__botao");
const resultadoFinalElemento = document.querySelector(".final__resultado");

let tempoElemento = document.querySelector(".temporizador");

let tempoDecorridoEmSegundos = 10;
let intervaloId = null;

let respostasCorretas = [];
let quantidadeDePerguntas = 0;

let perguntaId = 0;
let respostaCorreta = "";

botaoComecar.addEventListener("click", () => {
  perguntaId = 0;
  respostasCorretas = [];
  mostrarJogadores();
  mostrarTempo();
  iniciarContagem();
});

botaoFinal.addEventListener("click", () => {
  iniciar();
});

async function mostrarJogadores() {
  tempoDecorridoEmSegundos = 10;
  telaInicial.style.display = "none";
  telaPrincipal.style.display = "";
  const busca = await fetch("jogadores.json");
  const disponiveis = await busca.json();
  const jogadores = disponiveis.jogadores;

  quantidadeDePerguntas = jogadores.length;

  if (jogadores.length > perguntaId) {
    const jogador = jogadores[perguntaId];
    let contadorResposta = -1;
    respostaCorreta = jogador.time;
    const jogadorTime = jogador.time;
    imagemJogador.setAttribute("src", jogador.imagem);
    nomeJogador.textContent = jogador.nome;

    opcoesResposta.forEach((botao) => {
      contadorResposta++;
      botao.textContent = jogador.opcoes[contadorResposta];
    });
  } else {
    final();
  }
}

opcoesResposta.forEach((botao) => {
  botao.addEventListener("click", () => {
    respostaCorretaOuErrada(respostaCorreta, botao.textContent);

    perguntaId++;
    mostrarJogadores();
  });
});

function respostaCorretaOuErrada(resposta, palpite) {
  resposta == palpite ? respostasCorretas.push(palpite) : "";
}

function iniciar() {
  pararContagem();
  telaInicial.style.display = "flex";
  telaPrincipal.style.display = "none";
  telaFinal.style.display = "none";
  respostaCorreta = "";
  quantidadeDePerguntas = 0;
}

function final() {
  pararContagem();
  contaDeResultado();
  telaFinal.style.display = "flex";
  telaPrincipal.style.display = "none";
}

function contaDeResultado() {
  let valor = respostasCorretas.length;
  let total = quantidadeDePerguntas;
  let resultado = (valor / total) * 100;
  resultadoFinalElemento.textContent = `${resultado.toFixed(2)}%`;
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos > 0) {
    mostrarTempo();
    tempoDecorridoEmSegundos -= 1;
    console.log(tempoDecorridoEmSegundos);
    return;
  }
  pararContagem();
  final();
};

function iniciarContagem() {
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function mostrarTempo() {
  tempoElemento.textContent = tempoDecorridoEmSegundos;
}

function pararContagem() {
  clearInterval(intervaloId);
  intervaloId = null;
}

iniciar();
