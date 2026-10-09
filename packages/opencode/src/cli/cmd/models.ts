import { EOL } from "os"
import { Effect } from "effect"
import { ModelsDev } from "@opencode-ai/core/models-dev"
import { effectCmd, fail } from "../effect-cmd"
import { UI } from "../ui"
import { ProviderV2 } from "@opencode-ai/core/provider"

export const ModelsCommand = effectCmd({
  command: "models [provider]",
  describe: "listar todos os modelos disponíveis",
  builder: (yargs) =>
    yargs
      .positional("provider", {
        describe: "ID do provedor para filtrar modelos",
        type: "string",
        array: false,
      })
      .option("verbose", {
        describe: "exibir saída detalhada com metadados do modelo",
        type: "boolean",
      })
      .option("refresh", {
        describe: "atualizar o cache de modelos",
        type: "boolean",
      }),
  handler: Effect.fn("Cli.models")(function* (args) {
    const { Provider } = yield* Effect.promise(() => import("@/provider/provider"))
    if (args.refresh) {
      yield* ModelsDev.Service.use((s) => s.refresh(true))
      UI.println(UI.Style.TEXT_SUCCESS_BOLD + "Models cache refreshed" + UI.Style.TEXT_NORMAL)
    }

    const provider = yield* Provider.Service
    const providers = yield* provider.list()

    const print = (providerID: ProviderV2.ID, verbose?: boolean) => {
      const p = providers[providerID]
      const sorted = Object.entries(p.models).sort(([a], [b]) => {
        const aQwen = a.toLowerCase().includes("qwen")
        const bQwen = b.toLowerCase().includes("qwen")
        if (aQwen && !bQwen) return -1
        if (!aQwen && bQwen) return 1
        return a.localeCompare(b)
      })
      for (const [modelID, model] of sorted) {
        process.stdout.write(`${providerID}/${modelID}`)
        process.stdout.write(EOL)
        if (verbose) {
          process.stdout.write(JSON.stringify(model, null, 2))
          process.stdout.write(EOL)
        }
      }
    }

    if (args.provider) {
      const providerID = ProviderV2.ID.make(args.provider)
      if (!providers[providerID]) return yield* fail(`Provider not found: ${args.provider}`)
      print(providerID, args.verbose)
      return
    }

    const locals = ["llamacpp", "lmstudio", "ollama"]
    const ids = Object.keys(providers).sort((a, b) => {
      const aIndex = locals.indexOf(a)
      const bIndex = locals.indexOf(b)
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a.localeCompare(b)
    })

    for (const providerID of ids) print(ProviderV2.ID.make(providerID), args.verbose)
  }),
})
