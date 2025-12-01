const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const imc = document.getElementById("imc");
const feedback = document.getElementById("feedback-imc");

function calcularIMC() {
  if (!peso || !altura || !imc || !feedback) return;

  if (!peso.value || !altura.value) {
    feedback.innerText = "Preencha peso e altura";
    feedback.style.background = "gray";
    return;
  }

  const alturaMetros = altura.value / 100;
  const resultado = peso.value / (alturaMetros * alturaMetros);
  imc.value = resultado.toFixed(2);

  if (resultado < 18.5) {
    feedback.style.background = "linear-gradient(90deg, #FFD700, #FFA500)";
    feedback.innerText = "Abaixo do peso";
  } 
  else if (resultado < 25) {
    feedback.style.background = "linear-gradient(90deg, #34a853, #0f9d58)";
    feedback.innerText = "Peso normal";
  } 
  else {
    feedback.style.background = "linear-gradient(90deg, #ea4335, #d23c2e)";
    feedback.innerText = "Sobrepeso";
  }
}
// NO FINAL DO ARQUIVO script.js (que calcula o IMC)
// Adicione esta função para salvar dados de antropometria

function salvarDadosAntropometria() {
  if (peso && peso.value) {
    localStorage.setItem('avaliacao_peso', peso.value);
  }
  
  if (altura && altura.value) {
    localStorage.setItem('avaliacao_altura', altura.value);
  }
  
  const envergadura = document.querySelector('input[type="number"][step="0.1"]');
  if (envergadura && envergadura.value) {
    localStorage.setItem('avaliacao_envergadura', envergadura.value);
  }
}

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    salvarDadosAntropometria();
    calcularIMC(); 
    
   
    if (imc && imc.value) {
      localStorage.setItem('avaliacao_imc', imc.value);
    }
    
  });
}
if (peso && altura) {
  peso.addEventListener("input", calcularIMC);
  altura.addEventListener("input", calcularIMC);
}