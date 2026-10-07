// Dados técnicos dos componentes do Kit IoT ESP32-C3 Mini (SENAI São Carlos).
// GPIOs conforme gravação na tampa de acrílico.

const GPIO_MAP = [
  { gpio: 0,  func: "SCL (I2C)",          comp: "mpu",    shared: ["lcd"] },
  { gpio: 1,  func: "SDA (I2C)",          comp: "mpu",    shared: ["lcd"] },
  { gpio: 2,  func: "Não Usar",           comp: "esp32" },
  { gpio: 3,  func: "Echo (HC-SR04)",     comp: "hcsr04" },
  { gpio: 4,  func: "Trigger (HC-SR04)",  comp: "hcsr04" },
  { gpio: 5,  func: "CLK (KY-040)",       comp: "ky040" },
  { gpio: 6,  func: "DT (KY-040)",        comp: "ky040" },
  { gpio: 7,  func: "Botão (KY-040)",     comp: "ky040" },
  { gpio: 8,  func: "Não Usar",           comp: "esp32" },
  { gpio: 9,  func: "Não Usar",           comp: "esp32" },
  { gpio: 10, func: "PWM (SG90)",         comp: "sg90" },
];

const COMPONENTS = {
  esp32: {
    nome: "ESP32-C3 Super Mini",
    tipo: "Microcontrolador Wi-Fi + Bluetooth LE",
    lcd: ["ESP32-C3 MINI", "WiFi: conectado"],
    gpios: [
      ["GPIO2", "Não usar (strapping)"],
      ["GPIO8", "Não usar (strapping / LED)"],
      ["GPIO9", "Não usar (strapping / BOOT)"],
      ["USB-C", "Gravação + Serial"],
    ],
    specs: [
      ["CPU", "RISC-V 32 bits, single-core, até 160 MHz"],
      ["Memória", "400 KB SRAM · 4 MB Flash"],
      ["Rádio", "Wi-Fi 802.11 b/g/n 2,4 GHz · Bluetooth 5 (LE)"],
      ["Alimentação", "5 V (USB-C / pino 5V) · lógica 3,3 V"],
      ["USB", "USB Serial/JTAG nativo (sem chip conversor)"],
      ["Periféricos", "ADC 12 bits, PWM (LEDC), I²C, SPI, UART"],
      ["Dimensões", "22,5 × 18 mm"],
    ],
    desc:
      "Cérebro do kit. Executa o firmware, lê os sensores e se conecta à rede Wi-Fi para enviar dados (MQTT, HTTP, etc.). " +
      "Os pinos GPIO2, GPIO8 e GPIO9 são pinos de 'strapping', lidos no boot para definir o modo de inicialização — por isso estão marcados como 'Não Usar' na tampa. " +
      "Na Super Mini, o GPIO8 também aciona o LED azul e o GPIO9 é o botão BOOT.",
    dica: "Os pinos NÃO são tolerantes a 5 V. Para gravar: segure BOOT, pressione RST e solte BOOT, caso a porta USB não apareça.",
    codigo:
`#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.begin("MinhaRede", "senha123");
  while (WiFi.status() != WL_CONNECTED) delay(300);
  Serial.println(WiFi.localIP());
}

void loop() {}`,
    view: { alpha: -1.25, beta: 0.55, radius: 0.075 },
    explode: [0, 38, 0],
  },

  mpu: {
    nome: "MPU-6050 (GY-521)",
    tipo: "Acelerômetro + Giroscópio 6 eixos",
    lcd: ["MPU-6050 0x68", "Ax0.02 Az1.00"],
    gpios: [["GPIO0", "SCL (I²C)"], ["GPIO1", "SDA (I²C)"]],
    specs: [
      ["Acelerômetro", "3 eixos · ±2 / ±4 / ±8 / ±16 g"],
      ["Giroscópio", "3 eixos · ±250 / ±500 / ±1000 / ±2000 °/s"],
      ["Conversor", "ADC de 16 bits por eixo + DMP integrado"],
      ["Interface", "I²C até 400 kHz · endereço 0x68 (AD0 = GND) ou 0x69"],
      ["Extras", "Sensor de temperatura interno, pino INT"],
      ["Alimentação", "Módulo 3–5 V (regulador 3,3 V na placa)"],
    ],
    desc:
      "Unidade de medida inercial (IMU) que mede aceleração linear e velocidade angular. Permite detectar inclinação, vibração, quedas e movimento do kit. " +
      "Compartilha o barramento I²C com o display LCD — cada dispositivo responde em um endereço diferente.",
    dica: "Para calcular inclinação: ângulo = atan2(Ay, Az) × 180/π. Use um filtro complementar para combinar acelerômetro e giroscópio.",
    codigo:
`#include <Wire.h>

void setup() {
  Serial.begin(115200);
  Wire.begin(1, 0);              // SDA=GPIO1, SCL=GPIO0
  Wire.beginTransmission(0x68);
  Wire.write(0x6B); Wire.write(0); // acorda o sensor
  Wire.endTransmission();
}

void loop() {
  Wire.beginTransmission(0x68);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(0x68, 6);
  int16_t ax = Wire.read() << 8 | Wire.read();
  int16_t ay = Wire.read() << 8 | Wire.read();
  int16_t az = Wire.read() << 8 | Wire.read();
  Serial.printf("%.2f %.2f %.2f g\\n",
    ax / 16384.0, ay / 16384.0, az / 16384.0);
  delay(200);
}`,
    view: { alpha: -1.45, beta: 0.3, radius: 0.075 },
    explode: [0, 26, -6],
  },

  lcd: {
    nome: "Display LCD 16x2 I²C",
    tipo: "Display de caracteres (HD44780 + PCF8574)",
    lcd: ["LCD 16x2 I2C", "Endereco: 0x27"],
    gpios: [["GPIO0", "SCL (I²C)"], ["GPIO1", "SDA (I²C)"]],
    specs: [
      ["Formato", "16 colunas × 2 linhas, matriz 5×8 por caractere"],
      ["Controlador", "HD44780 ou compatível"],
      ["Interface", "Módulo I²C PCF8574 · endereço 0x27 (ou 0x3F)"],
      ["Alimentação", "5 V · backlight LED verde-amarelo"],
      ["Contraste", "Ajuste no trimpot azul do módulo I²C"],
      ["Dimensões", "Módulo 80 × 36 mm · área visível 64,5 × 14,5 mm"],
    ],
    desc:
      "Mostra mensagens e leituras dos sensores localmente, sem precisar do computador. " +
      "O módulo adaptador I²C (soldado atrás do display) reduz as 16 ligações do LCD para apenas 2 fios de dados (SDA/SCL), compartilhados com o MPU-6050.",
    dica: "Se a tela acender mas não mostrar texto, gire o trimpot de contraste. Use um scanner I²C para descobrir o endereço (0x27 ou 0x3F).",
    codigo:
`#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Wire.begin(1, 0);      // SDA=GPIO1, SCL=GPIO0
  lcd.init();
  lcd.backlight();
  lcd.print("SENAI S.Carlos");
  lcd.setCursor(0, 1);
  lcd.print("Kit IoT ESP32C3");
}

void loop() {}`,
    view: { alpha: -1.5708, beta: 0.62, radius: 0.15 },
    explode: [0, 52, -10],
  },

  hcsr04: {
    nome: "HC-SR04",
    tipo: "Sensor de distância ultrassônico",
    lcd: ["HC-SR04", "Dist: 23.4 cm"],
    gpios: [["GPIO3", "Echo"], ["GPIO4", "Trigger"]],
    specs: [
      ["Alimentação", "5 V DC · ~15 mA"],
      ["Frequência", "40 kHz"],
      ["Alcance", "2 cm a 400 cm · resolução ≈ 3 mm"],
      ["Ângulo", "Abertura efetiva < 15°"],
      ["Trigger", "Pulso de 10 µs em nível alto"],
      ["Echo", "Pulso com duração = tempo de ida e volta"],
      ["Dimensões", "45 × 20 × 15 mm"],
    ],
    desc:
      "Emite um pulso ultrassônico de 40 kHz pelo transdutor T e mede o tempo até o eco voltar ao transdutor R. " +
      "Distância (cm) = tempo (µs) × 0,0343 ÷ 2  (≈ tempo ÷ 58). Os transdutores ficam expostos na lateral do gabinete.",
    dica: "O pino Echo do HC-SR04 clássico sai em 5 V e o ESP32-C3 trabalha em 3,3 V: use divisor resistivo ou a versão HC-SR04P (3,3 V).",
    codigo:
`const int TRIG = 4, ECHO = 3;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  float cm = t * 0.0343 / 2;
  Serial.printf("Distancia: %.1f cm\\n", cm);
  delay(200);
}`,
    view: { alpha: 0.25, beta: 1.25, radius: 0.13 },
    explode: [30, 8, 0],
  },

  ky040: {
    nome: "KY-040",
    tipo: "Encoder rotativo com botão",
    lcd: ["KY-040 Encoder", "Contagem: 12"],
    gpios: [["GPIO5", "CLK"], ["GPIO6", "DT"], ["GPIO7", "Botão (SW)"]],
    specs: [
      ["Tipo", "Encoder incremental de quadratura (sinais A/B)"],
      ["Resolução", "20 pulsos por volta, com detentes"],
      ["Rotação", "360° contínuos, sem fim de curso"],
      ["Botão", "Push-button no eixo (SW), ativo em nível baixo"],
      ["Alimentação", "3,3 V a 5 V"],
      ["Pull-ups", "10 kΩ em CLK e DT no módulo"],
      ["Knob", "WH148 preto com ponteiro amarelo, encaixe no eixo de 6 mm"],
    ],
    desc:
      "Botão giratório usado como interface do usuário: navegar em menus, ajustar valores ou o ângulo do servo. " +
      "O sentido de giro é descoberto comparando a fase entre CLK e DT; o eixo também funciona como botão ao ser pressionado. " +
      "O eixo sai pela lateral do gabinete e recebe um knob WH148, cujo ponteiro amarelo indica a posição.",
    dica: "O pino SW não tem pull-up no módulo: configure GPIO7 como INPUT_PULLUP. Use interrupção em CLK para não perder passos.",
    codigo:
`const int CLK = 5, DT = 6, SW = 7;
volatile int pos = 0;

void IRAM_ATTR girou() {
  pos += (digitalRead(DT) != digitalRead(CLK)) ? 1 : -1;
}

void setup() {
  Serial.begin(115200);
  pinMode(CLK, INPUT); pinMode(DT, INPUT);
  pinMode(SW, INPUT_PULLUP);
  attachInterrupt(CLK, girou, CHANGE);
}

void loop() {
  Serial.printf("pos=%d botao=%d\\n", pos, !digitalRead(SW));
  delay(100);
}`,
    view: { alpha: -0.45, beta: 1.2, radius: 0.1 },
    explode: [30, 8, -8],
  },

  sg90: {
    nome: "Servo SG90",
    tipo: "Micro servomotor 180°",
    lcd: ["Servo SG90", "Angulo: 090"],
    gpios: [["GPIO10", "PWM (sinal)"]],
    specs: [
      ["Tensão", "4,8 V a 6 V"],
      ["Torque", "1,8 kgf·cm (4,8 V)"],
      ["Velocidade", "0,1 s / 60°"],
      ["Curso", "≈ 180°"],
      ["Sinal", "PWM 50 Hz (20 ms) · pulso 0,5–2,4 ms (1,5 ms = 90°)"],
      ["Fios", "Marrom = GND · Vermelho = V+ · Laranja = sinal"],
      ["Peso / tamanho", "9 g · 22,2 × 11,8 × 31 mm"],
    ],
    desc:
      "Atuador que gira o eixo até um ângulo definido pela largura do pulso PWM. Útil para demonstrar controle de posição: " +
      "acionar uma trava, apontar o sensor ou mostrar uma variável como um ponteiro. O ESP32-C3 gera o PWM pelo periférico LEDC no GPIO10.",
    dica: "Alimente o servo pelo 5 V (não pelo 3,3 V). Picos de corrente podem resetar o ESP32 — um capacitor de 100–470 µF perto do servo ajuda.",
    codigo:
`#include <ESP32Servo.h>

Servo servo;

void setup() {
  servo.attach(10, 500, 2400);  // GPIO10, pulso min/max (µs)
}

void loop() {
  for (int a = 0; a <= 180; a += 5) { servo.write(a); delay(30); }
  for (int a = 180; a >= 0; a -= 5) { servo.write(a); delay(30); }
}`,
    view: { alpha: -1.0, beta: 0.85, radius: 0.09 },
    explode: [0, 30, 0],
  },

  chave: {
    nome: "Chave RUN / PROG",
    tipo: "Chave alavanca (toggle) de 2 posições",
    lcd: ["Chave RUN/PROG", "Modo: RUN"],
    gpios: [["—", "Seleção de modo"]],
    specs: [
      ["Tipo", "Mini toggle, 2 posições, fixação por rosca e porca"],
      ["Posições", "RUN (cima) · PROG (baixo)"],
      ["Local", "Parede traseira, ao lado da abertura do USB-C"],
    ],
    desc:
      "Seleciona o modo de trabalho do kit: PROG para gravar o firmware pelo USB-C e RUN para a operação normal com os periféricos. " +
      "A função elétrica exata (por exemplo, cortar a alimentação dos periféricos durante a gravação) depende do esquemático do kit. Clique novamente para alternar a alavanca.",
    dica: "Se a gravação falhar, coloque em PROG, grave e volte para RUN antes de testar os sensores.",
    codigo: null,
    view: { alpha: 1.35, beta: 1.2, radius: 0.09 },
    explode: [0, 10, 25],
  },

  pcb: {
    nome: "Placa base",
    tipo: "PCB de interligação com conectores JST",
    lcd: ["Placa base", "JST 2.54mm"],
    gpios: [["5V / 3V3 / GND", "Distribuição"], ["GPIO0/1", "Barramento I²C"]],
    specs: [
      ["Função", "Suporte do ESP32-C3 e do MPU-6050"],
      ["Conectores", "JST-XH 2,54 mm para cada periférico"],
      ["Alimentação", "Distribui 5 V, 3,3 V e GND"],
      ["Montagem", "Espaçadores impressos no fundo do gabinete"],
    ],
    desc:
      "Placa que interliga o microcontrolador aos sensores e atuadores. Os conectores JST permitem trocar ou desconectar cada módulo sem solda, " +
      "facilitando manutenção e atividades práticas em sala.",
    dica: "Os conectores JST têm trava e só encaixam em um sentido — confira a cor dos fios (GND normalmente preto ou marrom).",
    codigo: null,
    view: { alpha: -1.4, beta: 0.45, radius: 0.11 },
    explode: [0, 18, 0],
  },

  gabinete: {
    nome: "Gabinete",
    tipo: "Caixa impressa em 3D + tampa de acrílico",
    lcd: ["SENAI S.Carlos", "120x95x40 mm"],
    gpios: [["Tampa", "Mapa de GPIOs gravado"]],
    specs: [
      ["Medidas", "120 × 95 × 40 mm (C × L × A)"],
      ["Material", "Impressão 3D em PLA vermelho"],
      ["Fixação", "4 insertos de latão roscados nos cantos"],
      ["Tampa", "Acrílico transparente com mapa de GPIOs gravado a laser"],
      ["Gravações", "SÃO CARLOS · KIT IoT ESP32 C3 MINI · SENAI · RUN/PROG"],
      ["Aberturas", "USB-C, transdutores do HC-SR04, eixo do encoder, chave"],
    ],
    desc:
      "Protege a eletrônica e organiza os módulos. A tampa transparente deixa os componentes à vista e traz a referência de pinos, " +
      "para o aluno programar sem consultar outro material.",
    dica: "Use o botão 'Tampa' para abrir ou remover a tampa, e 'Explodir' para separar as peças.",
    codigo: null,
    view: null,
    explode: [0, 0, 0],
  },
};

const COMP_ORDER = ["esp32", "mpu", "lcd", "hcsr04", "ky040", "sg90", "chave", "pcb", "gabinete"];

// Rótulo curto, ícone e etiqueta usados na interface (lista de módulos)
const COMP_UI = {
  esp32:    { curto: "ESP32-C3",   icon: "chip",   tag: "MCU" },
  mpu:      { curto: "MPU-6050",   icon: "gyro",   tag: "IMU" },
  lcd:      { curto: "LCD 16x2",   icon: "lcd",    tag: "I²C" },
  hcsr04:   { curto: "HC-SR04",    icon: "sonar",  tag: "Distância" },
  ky040:    { curto: "KY-040",     icon: "knob",   tag: "Encoder" },
  sg90:     { curto: "Servo SG90", icon: "servo",  tag: "PWM" },
  chave:    { curto: "RUN/PROG",   icon: "toggle", tag: "Modo" },
  pcb:      { curto: "Placa base", icon: "pcb",    tag: "JST" },
  gabinete: { curto: "Gabinete",   icon: "box",    tag: "120×95×40" },
};
