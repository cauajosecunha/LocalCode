/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { define } from "./internal"
import { Effect } from "effect"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeLocalcoderContent from "./skill/customize-localcoder.md" with { type: "text" }

export const CustomizeLocalcoderContent = customizeLocalcoderContent
export const CustomizeOpencodeContent = customizeLocalcoderContent

export const Plugin = define({
  id: "skill",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.skill.transform((draft) => {
      draft.source(
        SkillV2.EmbeddedSource.make({
          type: "embedded",
          skill: SkillV2.Info.make({
            name: "customize-localcoder",
            description:
              "Use quando o usuário estiver configurando o LocalCoder: localcoder.json, arquivos em .localcoder/ ou ~/.config/localcoder/, agentes, subagentes, comandos, habilidades, plugins, servidores MCP ou regras de permissão.",
            location: AbsolutePath.make("/builtin/customize-localcoder.md"),
            content: CustomizeLocalcoderContent,
          }),
        }),
      )
    })
  }),
})
