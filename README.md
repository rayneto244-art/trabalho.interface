📘 PROESP — Sistema de Avaliação Física Escolar

Este projeto é uma aplicação web simples e funcional desenvolvida para coletar, calcular, armazenar e apresentar resultados de avaliações físicas, seguindo a lógica dos testes aplicados no PROESP-BR.

Ele permite que o avaliador registre dados antropométricos e testes motores e, ao final, gere um painel completo de resultados com classificações, notas e recomendações.

🚀 Funcionalidades
✔ 1. Antropometria (index.html / antenpometria)

Entrada de:

Massa corporal

Estatura

Envergadura

Cálculo automático do IMC, com:

Atualização em tempo real

Feedback visual (cores e texto)

Salvamento automático dos dados no localStorage

✔ 2. Testes Motores (motores.html)

Inclui os testes:

Flexibilidade: Sentar e alcançar

Resistência Abdominal

Arremesso de Medicineball

Salto Horizontal

Corrida 20m

Teste do Quadrado

Corrida de 6 minutos

funcionalidades:

Salvamento automático dos valores no localStorage

Feedback de finalização do teste

Redirecionamento automático para a página de resultados

✔ 3. Resultados (resultados.html)

Exibe um painel completo com:

📊 Avaliação Geral

Nota geral (0–10)

Classificação textual ("Excelente", "Bom", etc.)

📌 Resultados por Teste

Com cartões individuais para:

IMC

Flexibilidade

Resistência Abdominal

Potência (Arremesso + Salto)

Velocidade

Resistência Aeróbica

Cada card mostra:

Valor obtido

Classificação (bom, médio, baixo)

Cores automáticas baseadas na performance

💡 Recomendações

Lista fixa com sugestões de treino e saúde.

💾 Salvamento

Armazena:

Data da avaliação

Hora da avaliação

🧠 Lógica do Sistema
📥 Entrada dos Dados

Os valores digitados pelo usuário são coletados através dos formulários HTML e salvos automaticamente no localStorage.

🔎 Processamento (resultados.js)

O script:

Carrega dados de:

antropometria

testes motores

parâmetros da URL

Calcula:

IMC

classificações de cada teste

nota geral

Gera:

textos

cores

layout dos cards

Atualiza:

DOM

mensagens de feedback

recomendações

🗂 Estrutura do Projeto
📁 PROESP
│
├── index.html             # Página de antropometria
├── motores.html           # Página de testes motores
├── resultados.html        # Painel de resultados
│
├── script.js              # Cálculo de IMC e salvamento
├── resultados.js          # Lógica completa dos resultados
│
├── style.css              # Estilos gerais da antropometria
├── beleza.css             # Estilos mais modernos para motores/resultados
│
└── README.md              # Documentação

💻 Tecnologias Utilizadas

HTML5

CSS3

JavaScript (ES6)

LocalStorage para persistência

DOM Manipulation para atualização dinâmica

Estilização com Gradientes e Layout Grid

🔧 Como Executar

Baixe ou clone o repositório:

git clone https://github.com/seu-repositorio/proesp.git


Abra o arquivo index.html em qualquer navegador moderno.

Preencha os dados nas telas:

Antropometria

Testes Motores

Navegue até Resultados.

A aplicação executará todos os cálculos automaticamente.

📦 Armazenamento dos Dados

Os valores são salvos usando localStorage, permitindo:

Persistência mesmo após recarregar a página

Possibilidade de visualizar avaliações anteriores

```Chaves armazenadas:

avaliacao_peso
avaliacao_altura
avaliacao_envergadura
avaliacao_imc

teste_flexibilidade
teste_abdominal
teste_arremesso
teste_salto
teste_velocidade
teste_quadrado
teste_corrida6min

ultima_avaliacao_data
ultima_avaliacao_hora
```


🧪 Classificações Utilizadas

Cada teste possui sua própria regra simplificada, como:

IMC: abaixo do peso / normal / sobrepeso / obesidade

Flexibilidade: excelente / bom / médio / baixo

Potência: média ponderada entre arremesso e salto

Velocidade: baseado no tempo de 20m

Resistência aeróbica: distância da corrida de 6 minutos

🎯 Objetivo do Projeto

O objetivo é criar um sistema simples, funcional e visualmente amigável para:

Aulas de Educação Física

Avaliações escolares

Trabalho acadêmico / TCC

Monitoramento de desempenho físico# trabalho.interface
