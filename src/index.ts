#! /usr/bin/env node

import { program } from "commander";
import { execSync } from "node:child_process";

program.requiredOption("-s, --scope <scope>", "Vercel scope", process.env.VERCEL_SCOPE);
program.requiredOption("-t, --token <token>", "Vercel token to deploy", process.env.VERCEL_TOKEN);
program.option("-e, --environmentVariable <environmentVariable...>", "Environment variable to deploy");
program.option("-a, --alias <alias>", "Alias to deploy");

program.parse();

const options = program.opts();

const [publicEnvironmentVariables, privateEnvironmentVariables] =
  options.environmentVariable?.reduce(
    (acc: string[][], env: string) => {
      const [key, value] = env.split("=");
      if (key?.startsWith("NEXT_PUBLIC_")) {
        acc[0]?.push(`-b ${key}="${value}"`);
      } else {
        acc[1]?.push(`-e ${key}="${value}"`);
      }
      return acc;
    },
    [[], []],
  ) ?? [];

const cmd = `vercel deploy \
  --token ${options.token} \
  ${publicEnvironmentVariables ? publicEnvironmentVariables.join(" ") : ""} \
  ${privateEnvironmentVariables ? privateEnvironmentVariables.join(" ") : ""} \
  -f`;

const deploymentUrl = execSync(cmd).toString().trim();

if (options.alias) {
  const aliasCmd = `vercel alias ${deploymentUrl} ${options.alias} --token ${options.token} --scope ${options.scope}`;
  execSync(aliasCmd);
}
