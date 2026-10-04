# Kit IoT ESP32-C3 Mini — laboratório virtual 3D / WebXR

Modelo 3D interativo do kit IoT do SENAI São Carlos (gabinete 120 × 95 × 40 mm), feito com Babylon.js, para o ensino de Mecatrônica e Indústria 4.0.

Online: https://luctrevisan.github.io/kit_iot/

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Interface responsiva (mobile first): barra superior, palco 3D, painel de módulos e ficha técnica, modais e overlay do AR |
| `app.js` | Cena 3D procedural em milímetros, câmera, interação, layout e WebXR |
| `components.js` | Descrição técnica, GPIOs, dicas e código de exemplo de cada componente; mapa de GPIOs da tampa; rótulos e ícones da lista |

Para alterar textos, especificações ou o ângulo de câmera de um componente, edite só o `components.js`.

## Uso

- Toque em um módulo, no modelo 3D ou na lista: a câmera aproxima e a ficha mostra GPIOs, descrição, dica, especificações e um exemplo para a Arduino IDE (com botão Copiar).
- **Celular em pé:** painel inferior expansível. Arraste a alça, ou toque nela, para alternar entre recolhido, meia tela e tela cheia.
- **Celular deitado, tablet largo ou desktop:** painel lateral fixo.
- **Ferramentas sobre o 3D:** vista inicial, tampa (fechada, aberta ou removida), vista explodida e mapa de GPIOs.
- **Gestos:** 1 dedo gira, pinça aproxima, 2 dedos movem, toque duplo no fundo reenquadra. No desktop: arrastar, roda do mouse, botão direito ou Ctrl+arrastar, e as teclas ← → e Esc.
- **Link direto para um componente:** `index.html#hcsr04` (ids: `esp32`, `mpu`, `lcd`, `hcsr04`, `ky040`, `sg90`, `chave`, `pcb`, `gabinete`).

## Executar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## VR / AR

| Dispositivo | VR | AR |
|---|---|---|
| Meta Quest (navegador do Quest) | ✅ | ✅ (Quest 3/3S, passthrough) |
| Android + Chrome + ARCore | — (desativado, ver abaixo) | ✅ |
| iPhone / iPad (Safari) | — | — (sem WebXR) |
| Desktop | só com headset PC ou emulador WebXR | — |

- WebXR exige **HTTPS**. O GitHub Pages já atende.
- Os botões AR e VR ficam esmaecidos quando o modo não está disponível. Ao tocar, o app explica o motivo.
- **Erro "The specified session configuration is not supported":** o Chrome no Android responde `true` para `isSessionSupported('immersive-vr')`, mas recusa a sessão VR ao iniciá-la. Por isso o VR fica desativado em celulares, que usam o AR. Qualquer recusa (`NotSupportedError`, `NotAllowedError` etc.) vira uma mensagem amigável, e o modo recusado é desativado.
- A sessão pede somente recursos opcionais. O VR usa o espaço de referência `local-floor`; o AR usa `local`, garantido em qualquer sessão imersiva.
- **No AR do celular:** controles HTML sobre a câmera via DOM Overlay (Sair, Recentrar, Tampa, Explodir) e ficha resumida ao tocar em um componente.
- **No Quest:** painel 3D e barra flutuante. Funciona com controles ou com as mãos (pinça).
