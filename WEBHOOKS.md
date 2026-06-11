Configurar Webhook Mercado Pago

1. URL do webhook
   - Use: `https://YOUR_SITE_DOMAIN/api/mercado-pago/webhook`
   - No Render: defina essa URL no painel de "Webhooks" do Mercado Pago (Credentials -> IPN / Webhooks) apontando para o domínio público do serviço.

2. Tipo de notificações
   - Recomendo assinar `payment` e `merchant_order`.

3. Segurança
   - A rota valida o pagamento consultando a API do Mercado Pago usando `MERCADO_PAGO_ACCESS_TOKEN`.
   - Não é usado HMAC — o endpoint confirma o pagamento pela API do Mercado Pago, o que é compatível com o fluxo do Mercado Pago.

4. Testes
   - No modo sandbox, crie um pagamento de teste e verifique os logs do servidor para ver a atualização do pedido.

5. Rotas implementadas
   - `POST /api/mercado-pago/webhook` — processa notificações e atualiza `Pedido.statusPagamento` no banco.
   - `GET /api/mercado-pago/webhook` — responde 200 para testes simples.

6. Observações
   - Certifique-se de que `MERCADO_PAGO_ACCESS_TOKEN` está configurado nas variáveis de ambiente do servidor.
   - Para maior segurança, você pode implementar verificação adicional comparando `x-hook-secret` ou IPs, se desejar.
