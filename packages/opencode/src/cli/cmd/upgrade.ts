import type { Argv } from "yargs"
import { UI } from "../ui"
import * as prompts from "@clack/prompts"

export const UpgradeCommand = {
  command: "upgrade [target]",
  describe: "atualizar o localcoder para a versão mais recente ou específica",
  builder: (yargs: Argv) => {
    return yargs
      .positional("target", {
        describe: "version to upgrade to, for ex '0.1.48' or 'v0.1.48'",
        type: "string",
      })
      .option("method", {
        alias: "m",
        describe: "installation method to use",
        type: "string",
        choices: ["curl", "npm", "pnpm", "bun", "brew", "choco", "scoop"],
      })
  },
  handler: async () => {
    UI.empty()
    UI.println(UI.logo("  "))
    UI.empty()
    prompts.intro("Upgrade")
    prompts.log.warn("O sistema de detecção e atualização automática foi desativado no LocalCoder.")
    prompts.log.info("Para atualizar o LocalCoder:")
    prompts.log.info("  1. Obtenha as novidades no repositório: git pull origin master")
    prompts.log.info("  2. Recompile e reinstale localmente: bun run install:local")
    prompts.outro("Concluído")
  },
}
