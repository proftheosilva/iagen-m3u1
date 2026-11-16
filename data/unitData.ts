import type { UnitContent } from "./types";

export const unitData: UnitContent = {
  unitNumber: "Módulo 3 · Unidade 1",
  unitTitle: "Automação de Fluxos: No-Code, Low-Code e n8n",
  unitSubtitle:
    "Da intenção ao fluxo: automatizar a ingestão do RAG com n8n em container e uma API de 40 linhas.",
  overview:
    "Nesta unidade você dá vida aos seus projetos de IA conectando sistemas sem precisar reinventar tudo do zero. Entenda onde termina o no-code e começa o low-code, a diferença entre vibe coding e engenharia assistida, a anatomia do n8n (nós, itens e execuções) e como orquestrar uma API Python idempotente para automatizar a ingestão do RAG.",
  simulatorTitle: "Simulador de Workflow no n8n + API de Ingestão",
  simulatorSubtitle:
    "Clique em 'Simular Fluxo' ou selecione cada nó para ver como o n8n orquestra a ingestão automática do RAG.",
  simulatorSteps: [
    {
      id: "schedule",
      label: "1. Gatilho (Schedule)",
      shortDesc: "Dispara o fluxo no horário agendado.",
      detail:
        "O nó Schedule Trigger acorda o workflow automaticamente (por exemplo, a cada hora) ou sob demanda manual durante os testes em sala.",
      payload: `{
  "trigger": "Schedule Trigger",
  "intervalo": "0 * * * *",
  "timestamp": "2026-11-16T09:00:00Z"
}`,
    },
    {
      id: "http",
      label: "2. Nó HTTP Request",
      shortDesc: "Chama a API Python local (/ingest).",
      detail:
        "Em vez de tentar processar PDFs dentro do n8n, o nó HTTP Request envia uma chamada limpa para a API mínima de 40 linhas rodando no Docker Compose.",
      payload: `POST http://rag-api:8000/ingest
{
  "pasta": "/dados/entrada",
  "modo": "incremental"
}`,
    },
    {
      id: "ingest",
      label: "3. Ingestão Idempotente",
      shortDesc: "ingest.py processa apenas arquivos novos.",
      detail:
        "A API Python verifica quais arquivos já foram indexados pelo hash/nome e processa somente o que é novo, evitando duplicações no banco vetorial.",
      payload: `{
  "status": "ok",
  "arquivos_lidos": 5,
  "novos_documentos": 2,
  "ignorados_ja_existentes": 3
}`,
    },
    {
      id: "if",
      label: "4. Nó IF (Decisão)",
      shortDesc: "Avalia se houve novos documentos ou erro.",
      detail:
        "O nó IF inspeciona o JSON retornado pelo HTTP Request: se `novos_documentos > 0`, segue pelo ramo verdadeiro para registrar o resumo.",
      payload: `{
  "condicao": "novos_documentos > 0",
  "resultado_if": true,
  "ramo": "TRUE (Notificar/Registrar)"
}`,
    },
    {
      id: "set",
      label: "5. Nó Set & Log",
      shortDesc: "Monta o resumo estruturado da execução.",
      detail:
        "O nó Set organiza os campos finais (data, quantidade indexada, status) e grava o histórico na aba de Execuções do n8n para auditoria.",
      payload: `{
  "resumo": "Ingestão concluída: 2 novos documentos indexados.",
  "execucao_id": "exec_712",
  "auditoria": "SALVA_NO_N8N"
}`,
    },
  ],
  concepts: [
    {
      id: "m3u1c1",
      chapter: "Capítulo 1 · O Espectro",
      title: "No-Code, Low-Code e Código Tradicional",
      summary:
        "Entendendo quem constrói o quê — e o que nunca muda por baixo dos panos.",
      fromZero:
        "No-code permite montar automações ligando blocos visuais sem escrever código (ótimo para protótipos rápidos). Low-code combina blocos visuais com trechos curtos de código ou APIs (como o n8n). Código tradicional dá controle total para regras complexas.",
      inPractice:
        "No dia a dia das empresas, o fluxo visual orquestra os sistemas enquanto pequenas APIs em Python executam o trabalho pesado de dados e IA.",
      attention:
        "Mudar de ferramenta visual não elimina a necessidade de lógica, tratamento de erro, segurança e clareza sobre os dados que entram e saem.",
      keyTakeaway:
        "No-code agiliza a conexão; low-code une agilidade visual com o poder de APIs sob medida.",
    },
    {
      id: "m3u1c2",
      chapter: "Capítulo 2 & 3 · Vibe Coding vs. Engenharia",
      title: "Vibe Coding não é Engenharia Assistida",
      summary:
        "Os riscos escondidos nos projetos gerados no impulso sem auditoria.",
      fromZero:
        "Vibe coding é pedir para a IA gerar um aplicativo inteiro e publicar sem ler o que ela escreveu. Engenharia assistida é usar a IA como copiloto, mas validando arquitetura, segurança e funcionamento passo a passo.",
      inPractice:
        "Ao auditar um ZIP gerado por ferramentas automáticas, faça as 8 perguntas essenciais — a principal delas: alguma chave de API ou segredo ficou exposta no código do navegador (frontend)?",
      attention:
        "Colocar chaves de API (OpenAI, banco de dados) direto no frontend permite que qualquer usuário copie sua chave e gere prejuízo na sua conta.",
      keyTakeaway:
        "Segredos e regras críticas devem ficar sempre no servidor (backend), nunca expostos no frontend.",
    },
    {
      id: "m3u1c3",
      chapter: "Capítulo 4 & 5 · O Desenho Universal",
      title: "As Três Caixas (Gatilho → Ação → Destino) e por que n8n",
      summary:
        "O modelo mental que funciona em qualquer plataforma de automação.",
      fromZero:
        "Toda automação se resume a três caixas: 1) Gatilho (o que inicia, como um horário ou evento), 2) Ação (o que processa ou decide) e 3) Destino (onde entrega ou registra o resultado).",
      inPractice:
        "Escolhemos o n8n no curso porque ele é visual, permite rodar localmente em container (self-hosted), integra código/HTTP com facilidade e não prende seus dados em nuvem fechada.",
      attention:
        "O desenho lógico (Gatilho → Ação → Destino) importa mais do que a plataforma; sabendo o desenho, você adapta para Zapier, Make ou código.",
      keyTakeaway:
        "Pense primeiro nas 3 caixas (Gatilho, Ação, Destino) antes de arrastar qualquer nó na tela.",
    },
    {
      id: "m3u1c4",
      chapter: "Capítulo 6 · Economia",
      title: "Os 4 Ganhos, Custos Escondidos e Quando Não Automatizar",
      summary:
        "Calculando se a automação realmente gera retorno.",
      fromZero:
        "Automatizar traz 4 ganhos: economia de tempo, redução de erro humano, velocidade de resposta e escala. Mas existem custos escondidos: tempo de manutenção, APIs quebradas e falhas silenciosas.",
      inPractice:
        "Regra prática: se uma tarefa acontece uma vez por ano e leva 5 minutos para fazer à mão, não vale o esforço de construir e manter uma automação.",
      attention:
        "Automatizar um processo bagunçado só faz a bagunça acontecer mais rápido e em maior escala.",
      keyTakeaway:
        "Organize e entenda o processo manual antes de automatizá-lo.",
    },
    {
      id: "m3u1c5",
      chapter: "Capítulo 7 · Anatomia do n8n",
      title: "Nós, Itens (JSON), Execuções e Credenciais",
      summary:
        "Como os dados viajam de um bloco para o outro dentro do n8n.",
      fromZero:
        "No n8n, cada bloco é um Nó. O que passa de um nó para o próximo são Itens (listas de objetos JSON). Tudo o que acontece fica gravado na aba de Execuções — o log que ensina exatamente onde algo deu certo ou falhou.",
      inPractice:
        "Credenciais (chaves de API, senhas) ficam guardadas no cofre criptografado do próprio n8n, nunca escritas soltas dentro do fluxo.",
      attention:
        "Sempre confira a aba de Execuções passo a passo ao depurar um workflow em vez de tentar adivinhar o erro.",
      keyTakeaway:
        "Entender o formato JSON dos 'Itens' entre os nós é a chave para dominar o n8n.",
    },
    {
      id: "m3u1c6",
      chapter: "Capítulo 8 & 9 · Arquitetura Mínima",
      title: "n8n Orquestra, API Python de 40 Linhas Executa",
      summary:
        "Separando o maestro visual do motor de ingestão no Docker Compose.",
      fromZero:
        "Em vez de forçar o n8n a ler PDFs complexos e calcular vetores por conta própria, criamos uma API mínima em Python (cerca de 40 linhas) com endpoints claros e subimos tudo junto via Docker Compose.",
      inPractice:
        "O n8n cuida da agenda, decisões (IF) e notificações; a API Python cuida de chamar o `ingest.py` para indexar documentos novos no RAG.",
      attention:
        "Quando containers rodam no Docker Compose, eles conversam pelo nome do serviço (ex.: `http://rag-api:8000`), e não por `localhost`.",
      keyTakeaway:
        "Orquestrador coordena; serviço especializado executa — simples de testar e manter.",
    },
    {
      id: "m3u1c7",
      chapter: "Capítulo 10 & 11 · Workflow Completo",
      title: "Schedule → HTTP Request → IF → Set com Idempotência",
      summary:
        "Montando o fluxo completo de ingestão automática sem duplicar dados.",
      fromZero:
        "Ligamos os 4 nós essenciais: Schedule (dispara no horário), HTTP Request (chama `/ingest`), IF (verifica se entraram arquivos novos) e Set (formata o resumo final).",
      inPractice:
        "A idempotência garante que, mesmo se o Schedule rodar 10 vezes no mesmo dia sem arquivos novos, nenhum documento será duplicado no índice do RAG.",
      attention:
        "Sem idempotência, cada disparo agendado reindexaria a pasta inteira repetidamente, desperdiçando tempo e tokens.",
      keyTakeaway:
        "Agendamento + Idempotência = ingestão contínua e segura sem trabalho manual.",
    },
    {
      id: "m3u1c8",
      chapter: "Capítulo 12–14 · Operação e Segurança",
      title: "Polling vs. Evento, Retry com Limite e LGPD",
      summary:
        "Escolhendo como disparar e protegendo o fluxo contra quedas.",
      fromZero:
        "Polling é perguntar toda hora 'chegou algo novo?' (gasta recursos mesmo quando não há nada). Evento (Webhook) é quando o sistema te avisa na hora em que algo chega. Além disso, usamos Retry com limite máximo se a API estiver fora do ar.",
      inPractice:
        "Configure alertas para falhas, limite o número de retentativas (ex.: 3 vezes) e evite trafegar dados pessoais desnecessários nos logs (LGPD).",
      attention:
        "Polling em intervalos curtos demais (ex.: a cada segundo) pode sobrecarregar servidores e gerar custos altos.",
      keyTakeaway:
        "Prefira eventos quando possível, use retry com limite e proteja credenciais e dados pessoais.",
    },
  ],
  quiz: [
    {
      id: 1,
      question: "Qual é a principal diferença entre No-Code e Low-Code no contexto deste módulo?",
      options: [
        "No-code não permite abrir o navegador.",
        "No-code usa apenas blocos visuais prontos; Low-code combina blocos visuais com trechos de código e chamadas a APIs.",
        "Low-code funciona apenas sem energia elétrica.",
        "Não existe diferença alguma.",
      ],
      correctIndex: 1,
      explanation:
        "O n8n é um excelente exemplo de plataforma que une orquestração visual com o poder de código e integrações HTTP.",
    },
    {
      id: 2,
      question: "Qual é o maior perigo identificado ao auditar aplicativos gerados por 'vibe coding' sem revisão?",
      options: [
        "A fonte ficar muito grande.",
        "Chaves de API e segredos ficarem expostos no código do frontend (navegador).",
        "O computador ficar rápido demais.",
        "O arquivo ZIP ter nome em minúsculo.",
      ],
      correctIndex: 1,
      explanation:
        "Qualquer segredo colocado no frontend pode ser lido pelo usuário final; credenciais devem ficar no backend.",
    },
    {
      id: 3,
      question: "Quais são 'as três caixas' de qualquer automação?",
      options: [
        "Mouse, Teclado e Monitor.",
        "Gatilho (Trigger), Ação (Processamento) e Destino (Resultado).",
        "PDF, Word e Excel.",
        "Copiar, Colar e Imprimir.",
      ],
      correctIndex: 1,
      explanation:
        "Esse modelo mental serve para desenhar qualquer fluxo antes mesmo de escolher a ferramenta.",
    },
    {
      id: 4,
      question: "Dentro do n8n, o que são os 'Itens' que trafegam de um nó para outro?",
      options: [
        "Arquivos de áudio MP3.",
        "Estruturas de dados em formato JSON que carregam as informações processadas em cada etapa.",
        "Senhas de administrador.",
        "Atalhos da área de trabalho.",
      ],
      correctIndex: 1,
      explanation:
        "Compreender a lista de objetos JSON (Itens) permite usar nós como IF e Set com precisão.",
    },
    {
      id: 5,
      question: "Por que separamos o n8n (orquestrador) da API Python de 40 linhas (executor)?",
      options: [
        "Para deixar a manutenção simples: o n8n agenda e decide, enquanto o Python executa a ingestão pesada do RAG.",
        "Porque o n8n não possui botões coloridos.",
        "Para impedir que o Docker funcione.",
        "Porque Python não aceita JSON.",
      ],
      correctIndex: 0,
      explanation:
        "Separar orquestração de lógica pesada de dados mantém o fluxo limpo, testável e fácil de evoluir.",
    },
    {
      id: 6,
      question: "No Docker Compose, por que o n8n chama `http://rag-api:8000` em vez de `localhost:8000`?",
      options: [
        "Porque dentro de um container, `localhost` aponta para o próprio container do n8n, e não para o container da API.",
        "Porque `localhost` é proibido em redes locais.",
        "Porque portas acima de 1000 exigem outro nome.",
        "Apenas por preferência estética.",
      ],
      correctIndex: 0,
      explanation:
        "Na rede interna do Docker Compose, cada serviço é alcançado pelo seu nome definido no arquivo compose.",
    },
    {
      id: 7,
      question: "O que o nó IF verifica no workflow de ingestão do RAG?",
      options: [
        "Se a cor da tela está azul.",
        "Uma condição nos dados JSON (ex.: se `novos_documentos > 0`) para decidir qual caminho seguir.",
        "Se o mouse está conectado.",
        "Quantas abas estão abertas no Chrome.",
      ],
      correctIndex: 1,
      explanation:
        "O nó IF cria ramificações condicionais (verdadeiro/falso) com base na resposta dos nós anteriores.",
    },
    {
      id: 8,
      question: "Qual é a diferença entre Polling e Evento (Webhook)?",
      options: [
        "Polling pergunta periodicamente se há novidade; no Evento, o sistema avisa na hora em que algo acontece.",
        "Polling funciona só no celular e Evento só no tablet.",
        "Evento é sempre mais lento que Polling.",
        "São exatamente a mesma coisa.",
      ],
      correctIndex: 0,
      explanation:
        "Polling consome verificações periódicas mesmo sem dados novos; eventos disparam imediatamente quando há novidade.",
    },
    {
      id: 9,
      question: "Por que configurar 'Retry com limite' quando a API está fora do ar?",
      options: [
        "Para tentar novamente em caso de falha temporária sem ficar em loop infinito travando o sistema.",
        "Para desligar o servidor após 1 erro.",
        "Para apagar os arquivos da pasta.",
        "Para duplicar todos os documentos.",
      ],
      correctIndex: 0,
      explanation:
        "Retentativas limitadas recuperam quedas breves de rede e registram o erro se o serviço continuar indisponível.",
    },
    {
      id: 10,
      question: "Quando NÃO vale a pena construir uma automação no-code/low-code?",
      options: [
        "Quando a tarefa é rara, leva poucos minutos por ano ou quando o custo de manter supera o retorno.",
        "Quando a tarefa se repete 500 vezes por dia.",
        "Quando há risco alto de erro humano na digitação.",
        "Quando precisamos integrar dois sistemas todo dia.",
      ],
      correctIndex: 0,
      explanation:
        "Toda automação tem custo de criação e manutenção; ela deve se pagar em tempo economizado ou qualidade ganha.",
    },
  ],
  memoryPairs: [
    {
      id: "m3u1m1",
      term: "Gatilho → Ação → Destino",
      definition: "As três caixas universais que definem qualquer fluxo de automação.",
    },
    {
      id: "m3u1m2",
      term: "Itens no n8n",
      definition: "Pacotes de dados JSON que viajam de um nó para o próximo.",
    },
    {
      id: "m3u1m3",
      term: "Polling",
      definition: "Consultar periodicamente se há novos dados, mesmo quando não chegou nada.",
    },
    {
      id: "m3u1m4",
      term: "Engenharia Assistida",
      definition: "Usar IA como copiloto auditando arquitetura, segredos e regras.",
    },
    {
      id: "m3u1m5",
      term: "API Mínima + n8n",
      definition: "Orquestrador visual chama um serviço Python enxuto para processar dados.",
    },
    {
      id: "m3u1m6",
      term: "Retry com Limite",
      definition: "Tentar novamente após falha temporária sem criar loop infinito.",
    },
  ],
};
