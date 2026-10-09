<!--
  Habilidade embutida do LocalCoder.
-->

# Personalizando o LocalCoder

O LocalCoder valida rigorosamente suas configurações. O formato abaixo cobre as opções de configuração do projeto e do usuário.

## Onde os arquivos ficam localizados

| Escopo | Caminho |
| :--- | :--- |
| Configuração do projeto | `./localcoder.json`, `./localcoder.jsonc` ou `.localcoder/localcoder.json` |
| Configuração global | `~/.config/localcoder/localcoder.json` ou `~/.config/localcoder/localcoder.jsonc` |
| Agentes do projeto | `.localcoder/agent/<nome>.md` ou `.localcoder/agents/<nome>.md` |
| Agentes globais | `~/.config/localcoder/agent(s)/<nome>.md` |
| Comandos do projeto | `.localcoder/command/<nome>.md` ou `.localcoder/commands/<nome>.md` |
| Comandos globais | `~/.config/localcoder/command(s)/<nome>.md` |

As configurações de cada escopo são combinadas com sobreposição prioritária do projeto sobre a configuração global.

## Estrutura do localcoder.json

Todos os campos são opcionais:

```json
{
  "username": "string",
  "model": "llamacpp/default",
  "small_model": "llamacpp/default",
  "default_agent": "build",
  "shell": "powershell",
  "logLevel": "DEBUG" | "INFO" | "WARN" | "ERROR",
  "instructions": ["AGENTS.md", "LOCALCODER.md"],

  "provider": {
    "llamacpp": {
      "options": {
        "baseURL": "http://192.168.3.177:8087/v1"
      }
    }
  },

  "agent": {
    "meu-agente": {
      "model": "llamacpp/default",
      "mode": "subagent",
      "description": "Agente especializado em tarefas específicas.",
      "permission": { "edit": "deny" }
    }
  },

  "command": {
    "meu-comando": {
      "description": "Executa fluxo automatizado",
      "template": "Execute a análise de código com base nos argumentos: $ARGUMENTS"
    }
  },

  "mcp": {
    "obsidian": {
      "type": "local",
      "command": ["npx", "-y", "obsidian-mcp"],
      "enabled": true
    }
  },

  "permission": {
    "edit": "allow",
    "bash": { "git *": "allow", "*": "ask" }
  }
}
```

## Agentes

Defina agentes personalizados criando arquivos `.md`:

```markdown
---
description: Revisor de código para encontrar falhas de segurança e lógica.
mode: subagent
model: llamacpp/default
permission:
  edit: deny
  bash: ask
---

Você é um revisor de código experiente focado em segurança, boas práticas e consistência.
```

## Comandos de Barra (/ Slash Commands)

Crie comandos no diretório `.localcoder/command/<nome>.md`:

```markdown
---
description: Executa testes unitários e reporta falhas.
agent: build
---

Execute todos os testes do projeto usando bun test e analise os erros encontrados: $ARGUMENTS
```

## Servidores MCP (Model Context Protocol)

Configure integrações MCP em `localcoder.json`:

```json
{
  "mcp": {
    "ferramenta": {
      "type": "local",
      "command": ["node", "./servidor-mcp.js"],
      "enabled": true
    }
  }
}
```

## Permissões

Ações permitidas: `"allow"`, `"ask"`, `"deny"`.
Ferramentas controladas: `read`, `edit`, `glob`, `grep`, `bash`, `task`, `webfetch`, `lsp`.
Ordene do mais genérico para o mais específico.
