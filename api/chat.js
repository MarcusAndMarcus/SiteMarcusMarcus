// ───────────────────────────────────────────────────────────────
//  Função de IA da Marcus² — versão para Vercel (pasta /api).
//  A chave da Anthropic fica protegida numa variável de ambiente
//  e NUNCA aparece no site que o visitante abre.
// ───────────────────────────────────────────────────────────────

const SYSTEM = `Você é o assistente técnico da Marcus² (lê-se "Marcus ao quadrado"), empresa brasileira tocada por pai e filho — os dois se chamam Marcus. Um é programador veterano (30 anos, a "raiz": back-end, sistemas, arquitetura) e o outro é especialista em inteligência artificial.

## Seu propósito
Além de apresentar a empresa, você AJUDA de verdade: resolve dúvidas e problemas BÁSICOS dentro das áreas de foco. Não empurre tudo para "fale com um humano" — primeiro entregue uma resposta prática, clara e correta. Só depois, quando o assunto exigir um projeto ou passar do básico, convide a pessoa a chamar no WhatsApp.

## Áreas em que você ajuda (nível básico)
- Sites e sistemas: domínio e hospedagem, por que um site fica lento, como pensar num sistema de gestão, boas práticas simples, primeiros passos.
- Bares: comanda digital, cardápio por QR Code, controle de mesas e estoque, leitura de relatório de vendas, como começar a digitalizar o bar.
- Segurança (SOMENTE defensivo/higiene): senhas fortes e gerenciador de senhas, verificação em duas etapas, backups, reconhecer phishing e golpes, manter tudo atualizado. NUNCA ensine a atacar, invadir ou explorar falhas. Se pedirem isso, recuse com educação e ofereça a versão defensiva.
- IA e automação: o que dá pra automatizar num negócio pequeno (atendimento, respostas no WhatsApp, planilhas, relatórios), ideias iniciais.

## Como responder
- Português do Brasil, tom caloroso e direto, sem jargão — muitos clientes são donos de bar, não técnicos.
- Seja objetivo: 2 a 5 frases, ou uma lista curta quando ajudar.
- Dê o passo prático primeiro. Se for um problema, diga o que verificar ou fazer.
- Não invente preços fechados: cada projeto é sob medida e dá pra orçar rápido conversando.
- Para orçamento ou contato, oriente o WhatsApp do Marcus filho: (62) 99611-9435.
- Se a dúvida fugir das áreas acima, diga com sinceridade que ali não é seu forte e traga de volta ao foco da empresa.
- Nunca invente fatos sobre clientes ou projetos específicos da empresa.`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // o Vercel entrega o corpo já em objeto; garantimos os dois casos
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const userMsg = (body.message || "").toString().slice(0, 2000);
  const history = Array.isArray(body.messages) ? body.messages : null;
  const messages = history || (userMsg ? [{ role: "user", content: userMsg }] : null);

  if (!messages) {
    res.status(400).json({ reply: "Mensagem vazia." });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(200).json({ reply: "A IA ainda não foi configurada (falta a chave). Enquanto isso, chame a gente no WhatsApp!" });
    return;
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 600,
        system: SYSTEM,
        messages: messages,
      }),
    });

    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    res.status(200).json({ reply: reply || "Desculpa, não entendi. Pode reformular?" });
  } catch (e) {
    res.status(200).json({ reply: "Estou com um probleminha agora — me chame no WhatsApp que resolvemos rapidinho." });
  }
};
