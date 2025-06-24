# Vercel Deployer

```
This packages was made to be run in a CI/CD
```

### Installing Vercel CLI

To download and install Vercel CLI, run the following command:

```bash
pnpm i -g vercel
```

### Scope and Token

You can choose to specify this to options manually or just set the following env variables:

```bash
export VERCEL_SCOPE=...
export VERCEL_TOKEN=...
```

otherwise each time you run the cli you will have to set `-s` and `-t` option

### Deploy

```bash
vercel-deployer -e NEXT_PUBLIC_ENV1=env2 -e NEXT_PUBLIC_ENV_2=env2
```

### Deploy with alias

```bash
vercel-deployer -a my-custom-domain.com
```
