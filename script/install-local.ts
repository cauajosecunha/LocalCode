#!/usr/bin/env bun

import { $ } from "bun"
import fs from "fs"
import os from "os"
import path from "path"

const exeExt = process.platform === "win32" ? ".exe" : ""
console.log(`==> Compilando o binário nativo do LocalCoder (localcode${exeExt})...`)
await $`bun run --cwd packages/opencode script/build.ts --single --skip-install --skip-embed-web-ui`

const targetDir = path.join(os.homedir(), ".bun", "bin")
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}
const distDir = path.join(
  import.meta.dirname,
  "../packages/opencode/dist",
  `opencode-${process.platform === "win32" ? "windows" : process.platform}-${process.arch}/bin`,
)

const localcodeSrc = path.join(distDir, `localcode${exeExt}`)
const localcoderSrc = path.join(distDir, `localcoder${exeExt}`)

const localcodeDst = path.join(targetDir, `localcode${exeExt}`)
const localcoderDst = path.join(targetDir, `localcoder${exeExt}`)

function safeCopy(src: string, dst: string) {
  try {
    fs.copyFileSync(src, dst)
    if (process.platform !== "win32") {
      fs.chmodSync(dst, 0o755)
    }
    console.log(`[OK] Instalado: ${dst}`)
  } catch (err: any) {
    if (err?.code === "EBUSY") {
      console.warn(`[AVISO] ${dst} está em execução. Feche o processo para atualizar este arquivo.`)
    } else {
      throw err
    }
  }
}

if (fs.existsSync(localcodeSrc)) {
  safeCopy(localcodeSrc, localcodeDst)
}

if (fs.existsSync(localcoderSrc)) {
  safeCopy(localcoderSrc, localcoderDst)
}

console.log("\nPronto! Você pode executar 'localcode' ou 'localcoder' diretamente em qualquer terminal.")
