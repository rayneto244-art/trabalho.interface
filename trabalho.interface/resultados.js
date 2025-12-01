// resultados.js - Script para processar e exibir resultados

document.addEventListener('DOMContentLoaded', function() {
  console.log('Página de resultados carregada');
  carregarResultados();
  atualizarRecomendacoes();
});

// Função para carregar todos os dados disponíveis
function carregarResultados() {
  console.log('Carregando resultados...');
  
  // 1. Tenta carregar dados do localStorage
  const dadosAntropometria = carregarDadosAntropometria();
  const dadosMotores = carregarDadosMotores();
  
  // 2. Tenta obter dados da URL (se vier de outra página)
  const dadosURL = obterDadosDaURL();
  
  // 3. Combina todas as fontes de dados
  const todosDados = { ...dadosAntropometria, ...dadosMotores, ...dadosURL };
  
  console.log('Dados encontrados:', todosDados);
  
  // 4. Atualiza a interface com os dados
  atualizarInterface(todosDados);
  
  // 5. Calcula e mostra a nota geral
  calcularNotaGeral(todosDados);
}

// Função para carregar dados de antropometria do localStorage
function carregarDadosAntropometria() {
  const dados = {};
  
  try {
    // Verifica se há dados salvos
    const peso = localStorage.getItem('avaliacao_peso');
    const altura = localStorage.getItem('avaliacao_altura');
    const envergadura = localStorage.getItem('avaliacao_envergadura');
    
    if (peso) dados.peso = parseFloat(peso);
    if (altura) dados.altura = parseFloat(altura);
    if (envergadura) dados.envergadura = parseFloat(envergadura);
    
    // Calcula IMC se tiver peso e altura
    if (dados.peso && dados.altura) {
      const alturaMetros = dados.altura / 100;
      dados.imc = dados.peso / (alturaMetros * alturaMetros);
    }
    
  } catch (error) {
    console.error('Erro ao carregar dados de antropometria:', error);
  }
  
  return dados;
}

// Função para carregar dados motores do localStorage
function carregarDadosMotores() {
  const dados = {};
  
  try {
    // Testes motores
    const flexibilidade = localStorage.getItem('teste_flexibilidade');
    const abdominal = localStorage.getItem('teste_abdominal');
    const arremesso = localStorage.getItem('teste_arremesso');
    const salto = localStorage.getItem('teste_salto');
    const velocidade = localStorage.getItem('teste_velocidade');
    const quadrado = localStorage.getItem('teste_quadrado');
    const corrida6min = localStorage.getItem('teste_corrida6min');
    
    if (flexibilidade) dados.flexibilidade = parseFloat(flexibilidade);
    if (abdominal) dados.abdominal = parseInt(abdominal);
    if (arremesso) dados.arremesso = parseFloat(arremesso);
    if (salto) dados.salto = parseFloat(salto);
    if (velocidade) dados.velocidade = parseFloat(velocidade);
    if (quadrado) dados.quadrado = parseFloat(quadrado);
    if (corrida6min) dados.corrida6min = parseInt(corrida6min);
    
  } catch (error) {
    console.error('Erro ao carregar dados motores:', error);
  }
  
  return dados;
}

// Função para obter dados passados por URL
function obterDadosDaURL() {
  const dados = {};
  const params = new URLSearchParams(window.location.search);
  
  // Parâmetros de antropometria
  if (params.get('peso')) dados.peso = parseFloat(params.get('peso'));
  if (params.get('altura')) dados.altura = parseFloat(params.get('altura'));
  if (params.get('envergadura')) dados.envergadura = parseFloat(params.get('envergadura'));
  
  // Parâmetros motores
  if (params.get('flexibilidade')) dados.flexibilidade = parseFloat(params.get('flexibilidade'));
  if (params.get('abdominal')) dados.abdominal = parseInt(params.get('abdominal'));
  if (params.get('arremesso')) dados.arremesso = parseFloat(params.get('arremesso'));
  if (params.get('salto')) dados.salto = parseFloat(params.get('salto'));
  if (params.get('velocidade')) dados.velocidade = parseFloat(params.get('velocidade'));
  if (params.get('corrida6min')) dados.corrida6min = parseInt(params.get('corrida6min'));
  
  return dados;
}

// Função para atualizar a interface com os dados
function atualizarInterface(dados) {
  console.log('Atualizando interface com dados:', dados);
  
  // IMC
  if (dados.imc) {
    document.getElementById('valorIMC').textContent = dados.imc.toFixed(1);
    const statusIMC = classificarIMC(dados.imc);
    document.getElementById('statusIMC').textContent = statusIMC.texto;
    document.getElementById('statusIMC').className = `card-status status-${statusIMC.classe}`;
  }
  
  // Flexibilidade
  if (dados.flexibilidade) {
    document.getElementById('valorFlexibilidade').textContent = dados.flexibilidade.toFixed(1) + ' cm';
    const statusFlex = classificarFlexibilidade(dados.flexibilidade);
    document.getElementById('statusFlexibilidade').textContent = statusFlex.texto;
    document.getElementById('statusFlexibilidade').className = `card-status status-${statusFlex.classe}`;
  }
  
  // Resistência Abdominal
  if (dados.abdominal) {
    document.getElementById('valorAbdominal').textContent = dados.abdominal + ' rep';
    const statusAbd = classificarAbdominal(dados.abdominal);
    document.getElementById('statusAbdominal').textContent = statusAbd.texto;
    document.getElementById('statusAbdominal').className = `card-status status-${statusAbd.classe}`;
  }
  
  // Potência (combina arremesso e salto)
  if (dados.arremesso || dados.salto) {
    let potenciaTexto = '';
    if (dados.arremesso) potenciaTexto += dados.arremesso.toFixed(1) + 'm';
    if (dados.arremesso && dados.salto) potenciaTexto += ' / ';
    if (dados.salto) potenciaTexto += dados.salto.toFixed(0) + 'cm';
    
    document.getElementById('valorPotencia').textContent = potenciaTexto;
    
    const statusPot = classificarPotencia(dados);
    document.getElementById('statusPotencia').textContent = statusPot.texto;
    document.getElementById('statusPotencia').className = `card-status status-${statusPot.classe}`;
  }
  
  // Velocidade
  if (dados.velocidade) {
    document.getElementById('valorVelocidade').textContent = dados.velocidade.toFixed(2) + ' s';
    const statusVel = classificarVelocidade(dados.velocidade);
    document.getElementById('statusVelocidade').textContent = statusVel.texto;
    document.getElementById('statusVelocidade').className = `card-status status-${statusVel.classe}`;
  }
  
  // Resistência Aeróbica
  if (dados.corrida6min) {
    document.getElementById('valorAerobica').textContent = dados.corrida6min + ' m';
    const statusAero = classificarAerobica(dados.corrida6min);
    document.getElementById('statusAerobica').textContent = statusAero.texto;
    document.getElementById('statusAerobica').className = `card-status status-${statusAero.classe}`;
  }
}

// Funções de classificação (valores de referência simplificados)
function classificarIMC(imc) {
  if (imc < 18.5) return { texto: 'Abaixo do Peso', classe: 'baixo' };
  if (imc < 25) return { texto: 'Peso Normal', classe: 'bom' };
  if (imc < 30) return { texto: 'Sobrepeso', classe: 'medio' };
  return { texto: 'Obesidade', classe: 'baixo' };
}

function classificarFlexibilidade(valor) {
  if (valor >= 30) return { texto: 'Excelente', classe: 'bom' };
  if (valor >= 25) return { texto: 'Bom', classe: 'bom' };
  if (valor >= 20) return { texto: 'Médio', classe: 'medio' };
  return { texto: 'Baixo', classe: 'baixo' };
}

function classificarAbdominal(valor) {
  if (valor >= 40) return { texto: 'Excelente', classe: 'bom' };
  if (valor >= 30) return { texto: 'Bom', classe: 'bom' };
  if (valor >= 20) return { texto: 'Médio', classe: 'medio' };
  return { texto: 'Baixo', classe: 'baixo' };
}

function classificarPotencia(dados) {
  // Média simplificada baseada em arremesso e salto
  let pontuacao = 0;
  let qtdTestes = 0;
  
  if (dados.arremesso) {
    pontuacao += dados.arremesso >= 5 ? 1 : 0.5;
    qtdTestes++;
  }
  
  if (dados.salto) {
    pontuacao += dados.salto >= 180 ? 1 : 0.5;
    qtdTestes++;
  }
  
  if (qtdTestes === 0) return { texto: 'Não testado', classe: 'medio' };
  
  const media = pontuacao / qtdTestes;
  if (media >= 0.8) return { texto: 'Boa', classe: 'bom' };
  if (media >= 0.5) return { texto: 'Média', classe: 'medio' };
  return { texto: 'Baixa', classe: 'baixo' };
}

function classificarVelocidade(valor) {
  if (valor <= 3.5) return { texto: 'Excelente', classe: 'bom' };
  if (valor <= 4.0) return { texto: 'Boa', classe: 'bom' };
  if (valor <= 4.5) return { texto: 'Média', classe: 'medio' };
  return { texto: 'Baixa', classe: 'baixo' };
}

function classificarAerobica(valor) {
  if (valor >= 1300) return { texto: 'Excelente', classe: 'bom' };
  if (valor >= 1100) return { texto: 'Boa', classe: 'bom' };
  if (valor >= 900) return { texto: 'Média', classe: 'medio' };
  return { texto: 'Baixa', classe: 'baixo' };
}

// Função para calcular nota geral
function calcularNotaGeral(dados) {
  let totalPontos = 0;
  let qtdTestes = 0;
  
  // Verifica cada teste e atribui pontos
  if (dados.imc) {
    const statusIMC = classificarIMC(dados.imc);
    totalPontos += statusIMC.classe === 'bom' ? 10 : statusIMC.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  if (dados.flexibilidade) {
    const statusFlex = classificarFlexibilidade(dados.flexibilidade);
    totalPontos += statusFlex.classe === 'bom' ? 10 : statusFlex.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  if (dados.abdominal) {
    const statusAbd = classificarAbdominal(dados.abdominal);
    totalPontos += statusAbd.classe === 'bom' ? 10 : statusAbd.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  if (dados.arremesso || dados.salto) {
    const statusPot = classificarPotencia(dados);
    totalPontos += statusPot.classe === 'bom' ? 10 : statusPot.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  if (dados.velocidade) {
    const statusVel = classificarVelocidade(dados.velocidade);
    totalPontos += statusVel.classe === 'bom' ? 10 : statusVel.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  if (dados.corrida6min) {
    const statusAero = classificarAerobica(dados.corrida6min);
    totalPontos += statusAero.classe === 'bom' ? 10 : statusAero.classe === 'medio' ? 7 : 4;
    qtdTestes++;
  }
  
  // Calcula média se houver testes
  if (qtdTestes > 0) {
    const media = totalPontos / qtdTestes;
    const notaFinal = Math.round(media);
    
    document.getElementById('notaGeral').textContent = notaFinal + '/10';
    
    // Classificação geral baseada na nota
    let classificacao = '';
    if (notaFinal >= 9) classificacao = 'Excelente! Continue assim!';
    else if (notaFinal >= 7) classificacao = 'Bom! Você está no caminho certo.';
    else if (notaFinal >= 5) classificacao = 'Regular. Há espaço para melhorias.';
    else classificacao = 'Atenção! Foque nas áreas de desenvolvimento.';
    
    document.getElementById('classificacaoGeral').textContent = classificacao;
  }
}

// Função para atualizar recomendações
function atualizarRecomendacoes() {
  const lista = document.getElementById('listaRecomendacoes');
  lista.innerHTML = '';
  
  // Recomendações gerais que sempre aparecem
  const recomendacoesBase = [
    'Realize alongamentos diários para melhorar flexibilidade',
    'Pratique exercícios de força 2-3 vezes por semana',
    'Mantenha uma alimentação balanceada e hidratação adequada',
    'Combine exercícios aeróbicos e anaeróbicos na sua rotina',
    'Descanse adequadamente entre os treinos para melhor recuperação'
  ];
  
  // Adiciona recomendações base
  recomendacoesBase.forEach(rec => {
    const li = document.createElement('li');
    li.textContent = rec;
    li.style.marginBottom = '10px';
    li.style.paddingLeft = '10px';
    lista.appendChild(li);
  });
}

// Função para salvar resultados (simulação)
function salvarResultados() {
  // Salva a data da avaliação
  localStorage.setItem('ultima_avaliacao_data', new Date().toLocaleDateString('pt-BR'));
  localStorage.setItem('ultima_avaliacao_hora', new Date().toLocaleTimeString('pt-BR'));
  
  // Mostra mensagem de sucesso
  alert('✅ Resultados salvos com sucesso!\n\nData: ' + 
        localStorage.getItem('ultima_avaliacao_data') + 
        '\nHora: ' + 
        localStorage.getItem('ultima_avaliacao_hora'));
}

// Função para ajudar no debug
function mostrarDadosLocalStorage() {
  console.log('=== DADOS NO LOCALSTORAGE ===');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
  console.log('=============================');
}

// Chama a função de debug se necessário (remova em produção)
// mostrarDadosLocalStorage();