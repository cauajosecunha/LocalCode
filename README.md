# 🚀 LocalCoder

<div align="center">

```
█    █▀▀█ █▀▀█ █▀▀█ █    █▀▀█ █▀▀█ █▀▀▄ █▀▀█ █▀▀█
█    █  █ █    █▀▀█ █    █    █  █ █  █ █▀▀▀ █▀▀▄
▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀  ▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀  ▀
```

**Seu assistente de programação com IA para terminal — Local-First, Rápido e Modular.**

[![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun%201.3+-FBF0DF?logo=bun&logoColor=black)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📖 Visão Geral

O **LocalCoder** é uma ferramenta de linha de comando (CLI) e interface de terminal interativa (TUI) voltada para desenvolvimento auxiliado por inteligência artificial, construída com foco prioritário em **modelos locais** e privacidade.

Com o LocalCoder, você pode interagir com modelos executados diretamente no seu computador (via **LM Studio** e **Ollama**) sem precisar de chaves de API pagas na nuvem ou enviar seu código para servidores de terceiros.

---

## ✨ Principais Recursos

- 🖥️ **Local-First & Plug-and-Play**:
  - **Servidor Dedicado llama.cpp (Padrão Primário)**: Conexão automática com seu servidor em `http://192.168.3.177:8087` (rodando `Qwen3.6-35B-A3B-Claude-4.7-Mini` com janela de 49.152 tokens).
  - Detecção e conexão automática com **LM Studio** (`http://127.0.0.1:1234`) e **Ollama** (`http://127.0.0.1:11434`).
  - Reconhecimento automático dos modelos carregados na sua rede/máquina em tempo real via `/v1/models`.
  - Seleção inteligente de modelo padrão focada em programação (`qwen3.6`, `qwen2.5-coder`, `deepseek-coder`, etc.).
- 💻 **TUI Moderna no Terminal**:
  - Interface rica construída com **OpenTUI** e **SolidJS**.
  - Visualização de diffs em tempo real com realce de sintaxe.
  - Histórico de sessões, aprovações de comandos e navegação fluida.
- 🛠️ **Tool Calling & Ações no Sistema**:
  - Execução de comandos de shell com aprovação segura do usuário.
  - Leitura, edição e criação de arquivos de forma precisa.
  - Suporte a regras locais via arquivo `LOCALCODER.md` ou `AGENTS.md`.
  - Integração com o protocolo **MCP (Model Context Protocol)**.
- ⚡ **Alta Performance**:
  - Desenvolvido em **TypeScript** e executado nativamente sobre o runtime **Bun**.
  - Arquitetura resiliente baseada no ecossistema **Effect TS**.

---

## 📦 Provedores Suportados

1. **llama.cpp Server (Padrão)**: `http://192.168.3.177:8087` (ou via variável `LOCALCODER_LLAMACPP_HOST`).
2. **LM Studio**: `http://127.0.0.1:1234/v1`.
3. **Ollama**: `http://127.0.0.1:11434/v1`.

---

## 🚀 Como Executar

### 1. Clonar e Instalar Dependências

```bash
bun install
```

### 2. Iniciar a CLI Interativa

Para abrir a interface completa no seu projeto atual:

```bash
bun run dev
```

Ou diretamente pelo binário do LocalCoder:

```bash
bun packages/opencode/bin/localcoder
```

---

## 🎯 Comandos Principais

| Comando | Descrição |
| :--- | :--- |
| `localcoder` | Inicia a interface interativa (TUI) no diretório atual. |
| `localcoder run "<mensagem>"` | Executa uma instrução direta e exibe o resultado no terminal. |
| `localcoder models [provedor]` | Lista os modelos disponíveis (ex: `localcoder models lmstudio` ou `localcoder models ollama`). |
| `localcoder providers` | Gerencia provedores e credenciais configuradas. |
| `localcoder serve` | Inicia o servidor headless do LocalCoder em segundo plano. |
| `localcoder web` | Inicia o servidor e abre a interface web local. |
| `localcoder mcp` | Gerencia servidores MCP (Model Context Protocol). |

---

## 🤖 Modelos Locais Recomendados

Para a melhor experiência de codificação local:

1. **Qwen 2.5 Coder** (`qwen2.5-coder:7b`, `14b` ou `32b`): Altíssimo desempenho em compreensão de código e edição.
2. **DeepSeek Coder V2** (`deepseek-coder-v2:16b`): Excelente raciocínio e suporte multilíngue.
3. **Codestral** (`codestral:22b`): Modelo especializado da Mistral para tarefas complexas de código.

---

## 📂 Estrutura do Projeto

```
LocalCoder/
├── packages/
│   ├── opencode/       # Pacote principal da CLI e comandos do LocalCoder
│   ├── core/           # Regras de negócio centrais, sistema de arquivos e sessões
│   ├── tui/            # Interface de texto do terminal (OpenTUI + SolidJS)
│   ├── server/         # Servidor HTTP / WebSocket para sessões remotas
│   └── protocol/       # Schemas, contratos e validações (Effect TS)
├── .localcoder/        # Configurações locais do projeto (opcional)
└── README.md           # Esta documentação
```

---

## 📄 Licença

Este projeto é distribuído sob a licença [MIT](LICENSE).
