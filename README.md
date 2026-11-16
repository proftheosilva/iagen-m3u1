# Módulo 3 · Unidade 1 — Automação de Fluxos: No-Code, Low-Code e n8n

Página didática interativa de apoio aos alunos do **Curso de Formação em IA Generativa**.

## Sobre esta Unidade
Esta unidade apresenta a automação de fluxos conectando o espectro **no-code / low-code / código**, a diferença entre *vibe coding* e engenharia assistida, as três caixas universais (*Gatilho → Ação → Destino*), a anatomia do **n8n** (nós, itens JSON, execuções e credenciais em container) e a orquestração de uma API Python mínima e idempotente para automatizar a ingestão do RAG.

### Recursos da Aplicação
- **Simulador Visual Dinâmico**: Fluxo animado de um workflow no n8n (`Schedule → HTTP Request → IF → Set`) chamando uma API Python.
- **Conteúdo Interativo**: Tópicos com explicações *Do Zero*, *Na Prática*, *Atenção / Risco* e *Ponto-chave*.
- **Quiz de Fixação**: 10 perguntas com feedback imediato e explicação.
- **Jogo da Memória**: Combinação de conceitos e definições da unidade.

## Stack Tecnológica
- **Next.js** (App Router com `output: "export"` para deploy estático)
- **Tailwind CSS**
- **Lucide React**

## Como executar localmente
```bash
npm install
npm run dev
```

## Publicação na Vercel
Importe o repositório no GitHub, selecione o diretório `MOD4/M3U1-WEB` como **Root Directory** e faça o deploy (sem necessidade de banco de dados ou variáveis de ambiente).

---
© 2026 **CucandoTI** — Todos os direitos reservados.
