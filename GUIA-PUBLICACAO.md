# Guia de Publicação — Site Marcus² com IA

Este guia coloca o site no ar, com domínio próprio e a **IA funcionando de verdade** — com a chave protegida no servidor, como deve ser. Não precisa saber programar; é seguir os passos.

Vamos usar a **Netlify**: hospedagem grátis, rápida, com suporte à função de IA e domínio próprio.

---

## Visão geral (o que vamos fazer)

1. Organizar os arquivos numa pasta.
2. Criar uma conta na Netlify e subir a pasta.
3. Pegar a chave da IA na Anthropic e colocá-la na Netlify (protegida).
4. Testar a IA no ar.
5. (Opcional) Colocar um domínio próprio, tipo `marcus2.com.br`.

Tempo estimado: 30–45 minutos.

---

## Passo 1 — Organize a pasta do site

Crie uma pasta no seu computador (ex.: `site-marcus2`) e coloque os arquivos **exatamente nesta estrutura**:

```
site-marcus2/
├── index.html
├── netlify.toml
└── netlify/
    └── functions/
        └── chat.js
```

Todos esses arquivos já foram gerados para você. Só mantenha os nomes e a estrutura de pastas iguais.

---

## Passo 2 — Suba o site na Netlify

1. Acesse **https://app.netlify.com** e crie uma conta grátis (pode entrar com o Google).
2. No painel, procure a opção **"Add new site" → "Deploy manually"** (ou acesse **https://app.netlify.com/drop**).
3. **Arraste a pasta inteira** `site-marcus2` para a área indicada.
4. Em segundos, a Netlify publica o site e te dá um endereço grátis, tipo `https://algum-nome-aleatorio.netlify.app`.

Nesse momento o site já está no ar. A IA ainda não responde — falta a chave, que é o próximo passo.

> **Para atualizar o site depois:** é só arrastar a pasta de novo no mesmo lugar. A Netlify substitui a versão anterior.

---

## Passo 3 — Pegue a chave da IA (Anthropic)

1. Acesse **https://console.anthropic.com** e crie uma conta.
2. Adicione um método de pagamento e um crédito inicial (em **Billing / Plans**). O uso é barato — veja "Custos" no fim.
3. Vá em **API Keys** e clique em **Create Key**. Dê um nome (ex.: "site marcus2").
4. **Copie a chave** que aparece (algo como `sk-ant-...`). Guarde num lugar seguro — ela só aparece uma vez.

> **Nunca** cole essa chave dentro do `index.html` nem mande pra ninguém. Ela vai só na Netlify, protegida (próximo passo). Quem tiver a chave pode gastar seu crédito.

---

## Passo 4 — Coloque a chave na Netlify (protegida)

1. No painel da Netlify, abra o seu site.
2. Vá em **Site configuration → Environment variables** (Configurações do site → Variáveis de ambiente).
3. Clique em **Add a variable** e preencha:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** cole a chave que você copiou (`sk-ant-...`)
4. Salve.
5. Vá em **Deploys** e clique em **Trigger deploy → Deploy site** para a mudança valer (ou arraste a pasta de novo).

Pronto — a função da IA agora tem acesso à chave, mas ela continua invisível para quem visita o site.

---

## Passo 5 — Teste

1. Abra o endereço do seu site (o `.netlify.app`).
2. No console de IA (lá no topo), clique numa das sugestões ou escreva uma pergunta.
3. A resposta agora vem da IA de verdade (não mais do modo demonstração).

Se aparecer "A IA ainda não foi configurada", volte ao Passo 4 e confira o nome exato da variável: `ANTHROPIC_API_KEY`.

---

## Passo 6 (opcional) — Domínio próprio

1. Compre um domínio (ex.: em Registro.br para `.com.br`, ou em Namecheap/GoDaddy para `.com`).
2. Na Netlify: **Domain management → Add a domain** e digite seu domínio.
3. A Netlify mostra os **servidores DNS** (ou registros) que você deve configurar no site onde comprou o domínio. Cole as informações lá.
4. Em algumas horas o domínio passa a apontar para o site, já com **HTTPS (cadeado)** automático e grátis.

---

## Custos (transparência)

- **Hospedagem Netlify:** grátis no plano inicial, de sobra para um site assim.
- **Domínio:** ~R$ 40/ano (`.com.br`) — opcional.
- **IA (Anthropic):** o modelo usado é o **Claude Haiku 4.5**, dos mais baratos. Cada conversa custa **centavos**. Você pode definir um **limite de gasto mensal** no console da Anthropic (em Billing) para nunca ter surpresa.

---

## Ajustes rápidos (se precisar)

Tudo que é editável fica no comecinho de cada arquivo:

- **`index.html`** → bloco "TROQUE AQUI": WhatsApp, e-mails e LinkedIn dos dois Marcus.
- **`netlify/functions/chat.js`** → o texto em `SYSTEM` define como a IA fala e o que ela sabe. Dá pra ajustar quando quiser (e subir a pasta de novo).

---

## Resumo dos endereços úteis

- Publicar/gerenciar site: https://app.netlify.com
- Subir pasta direto: https://app.netlify.com/drop
- Chave da IA: https://console.anthropic.com
- Documentação da IA: https://docs.claude.com

Qualquer passo que travar, me manda em que ponto você está e o que apareceu na tela — a gente resolve.
