# Kit IoT ESP32-C3 Mini — visualizador 3D / WebXR

Modelo 3D interativo do kit IoT do SENAI São Carlos (gabinete 120 × 95 × 40 mm), feito com Babylon.js.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Interface (lista de componentes, painel de descrição, barra de ferramentas) |
| `app.js` | Cena 3D procedural em milímetros, interação, zoom e WebXR |
| `components.js` | Descrição técnica, GPIOs, dicas e código de exemplo de cada componente; mapa de GPIOs da tampa |

Para alterar textos, especificações ou o ângulo de câmera de um componente, edite só o `components.js`.

## Como usar

- Clique em um componente (no 3D ou na lista): a câmera dá zoom e o painel mostra a descrição técnica, os GPIOs e um exemplo para a Arduino IDE.
- **Tampa**: alterna entre fechada, aberta e removida. **Explodir**: separa as peças. **Mapa GPIO**: tabela da tampa de acrílico.
- Link direto para um componente: `index.html#hcsr04` (ids: `esp32`, `mpu`, `lcd`, `hcsr04`, `ky040`, `sg90`, `chave`, `pcb`, `gabinete`).
- Algumas peças têm animação: o servo gira, o encoder roda, o HC-SR04 emite ondas e o LCD mostra leituras simuladas.

## Executar

Os arquivos precisam ser servidos por HTTP; abrir com dois cliques (`file://`) não funciona.

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## VR / AR

WebXR **exige HTTPS**. Para testar no Meta Quest (VR) ou no Chrome do Android (AR), publique a pasta no GitHub Pages, Netlify ou Vercel, ou use um túnel HTTPS (por exemplo, `ngrok http 8000`).
Os botões "Entrar em VR" e "Ver em AR" só aparecem quando o dispositivo tem suporte. No iPhone (Safari), o WebXR ainda não é suportado.

Dentro do XR, aponte o controle e aperte o gatilho sobre um componente. O kit se aproxima, gira para mostrar o componente e um painel 3D exibe a descrição. A barra flutuante tem os botões Recentrar, Tampa, Explodir e Sair.
