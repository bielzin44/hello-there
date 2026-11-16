# Mapa Visual do Técnico Refrigerista

Landing page da coleção digital de refrigeração. O projeto usa React, TanStack Start e Vite, com a integração existente do Lovable.

## Executar localmente

```sh
npm install
npm run dev
```

## Atendimento pelo WhatsApp

Configure a variável pública `VITE_WHATSAPP_NUMBER` com o número comercial em formato internacional. Para um número brasileiro, inclua `55`, DDD e número, apenas com dígitos. Configure essa variável no ambiente de build e gere uma nova versão após alterá-la.

Quando a variável está disponível, os botões abrem o WhatsApp com a mensagem da oferta preenchida. Em ambiente sem o número, a página mostra os detalhes da oferta e o estado do canal.

## Conferência

```sh
npm run test
npm run build
```

## Checkouts Cakto

Os botões de compra já usam os checkouts públicos dos planos Básico e Completo na Cakto. Se um link mudar, configure `VITE_CAKTO_BASICO_URL` ou `VITE_CAKTO_COMPLETO_URL` no ambiente de build e gere uma nova versão. Cada link deve pertencer a `https://pay.cakto.com.br` e corresponder ao plano indicado.
