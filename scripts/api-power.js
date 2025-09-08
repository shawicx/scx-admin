#!/usr/bin/env node
import { runCLI } from '@scxfe/api-tool'

async function main() {
  try {
    await runCLI()
  } catch (error) {
    console.error('CLI execution failed:', error.message)
    process.exit(1)
  }
}

main()
