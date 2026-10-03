# ⚓ Naval Shooter 2D

Um jogo de tiro naval 2D desenvolvido com **React, TypeScript e PixiJS**.

O jogador controla um navio pirata em uma arena naval vista de cima, navegando entre ilhas e enfrentando navios inimigos com disparos de canhão direcionais.

## 🎮 Gameplay

A implementação atual possui:

- Movimentação 2D do navio do jogador
- Rotação do navio
- Movimento para frente
- Detecção de colisão elíptica
- Colisão com ilhas
- Navio inimigo com movimentação autônoma
- Inimigo seguindo e mirando no jogador
- Disparos automáticos do inimigo
- Disparos do jogador
- Disparos para frente, esquerda e direita
- Movimento dos projéteis utilizando `deltaTime`
- Colisão dos projéteis com ilhas
- Dano dos projéteis contra inimigos e jogador
- Sistema de vida do jogador e inimigo
- Destruição do inimigo
- Estado de morte do jogador
- Interface de controles para gameplay
- Renderização dos elementos utilizando PixiJS

## 🛠️ Tecnologias

- **React**
- **TypeScript**
- **PixiJS**
- **Vite**
- **ESLint**

## 📋 Requisitos

- Node.js
- npm

Recomenda-se utilizar **Node.js 20+**.

## 🚀 Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd PixiJS_NavalShooter2D
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível na URL fornecida pelo Vite.

## 🎮 Controles

| Ação | Controle |
|---|---|
| Mover para frente | Seta para cima |
| Girar para a esquerda | Seta para a esquerda |
| Girar para a direita | Seta para a direita |
| Atirar para frente | W |
| Atirar para a esquerda | Q |
| Atirar para a direita | E |

A interface também possui controles na tela para permitir a utilização em dispositivos móveis e por cliques do mouse.

## 🧱 Arquitetura

O projeto separa a lógica do jogo, entidades, elementos da arena e entrada do jogador:

```text
src/
├── game/
│   ├── elements/
│   │   ├── Arena.ts
│   │   ├── Island.ts
│   │   ├── IslandLayout.ts
│   │   └── Water.ts
│   ├── entities/
│   │   ├── Enemy.ts
│   │   ├── Player.ts
│   │   └── Projectile.ts
│   ├── input/
│   │   ├── GameInputs.ts
│   │   ├── InputManager.ts
│   │   └── KeyboardInput.ts
│   ├── utils/
│   │   └── EllipseCollider.ts
│   ├── Game.ts
│   └── GameConfig.ts
│
├── screens/
│   ├── Buttons/
│   │   ├── MovementTouchButtons.tsx
│   │   ├── ProjectileTouchButtons.tsx
│   │   └── TouchButton.tsx
│   └── GameCanvas.tsx
|
├── App.tsx
├── main.tsx
└── style.css
```

A classe `Game` é responsável por coordenar a simulação, entidades, colisões e projéteis.

`GameCanvas` conecta a lógica do jogo ao loop de renderização do PixiJS.

As entidades possuem suas próprias responsabilidades de movimentação e comportamento.

## 💥 Sistema de Colisão

As colisões utilizam um modelo de **colisão elíptica**, permitindo que objetos tenham raios diferentes nos eixos horizontal e vertical.

A verificação é baseada na fórmula:

```text
(dx² / rx²) + (dy² / ry²) < 1
```

O sistema atualmente trata:

- Jogador ↔ Ilha
- Jogador ↔ Inimigo
- Projétil ↔ Ilha
- Projétil do jogador ↔ Inimigo
- Projétil do inimigo ↔ Jogador

## 🔫 Sistema de Projéteis

Os projéteis são representados por sprites do PixiJS.

Cada projétil possui informações como:

- Posição
- Direção
- Dono
- Velocidade
- Dano

O proprietário do projétil é identificado como:

```text
player
enemy
```

Isso permite diferenciar os disparos do jogador dos disparos do inimigo e controlar quais entidades podem receber dano.

## 🌐 Variáveis de Ambiente

A implementação atual do gameplay não depende de um backend externo ou API.

Portanto, **nenhuma variável de ambiente é obrigatória para executar a versão atual**.

## 🌐 Cenários de Rede

A versão atual ainda não possui a camada de API/ranking e os mocks de rede utilizando MSW.

## 🧪 Testes e Verificações

### Lint

```bash
npm run lint
```

### Verificação de tipos

```bash
npx tsc -b
```

### Build de produção

```bash
npm run build
```

O comando de build executa:

```text
ESLint → TypeScript → Vite
```

A build de produção atual é gerada com sucesso.

## 🧹 Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa lint, verificação de tipos e build de produção |
| `npm run lint` | Executa o ESLint |
| `npx tsc -b` | Executa a verificação de tipos do TypeScript |

## 📦 Build de Produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos gerados ficam no diretório:

```text
dist/
```

A build de produção foi validada com sucesso utilizando Vite.

## 📱 Dispositivos Móveis

A interface possui controles voltados para dispositivos móveis.

## 🚧 Limitações Atuais

Esta versão representa a implementação desenvolvida dentro do tempo disponível para o desafio.

As seguintes funcionalidades previstas no escopo completo ainda não foram implementadas:

- Sistema persistente de ranking/histórico
- Integração com TanStack Query
- Camada de requisições utilizando Axios
- Mocks de API utilizando MSW
- Simulação completa de falhas de rede
- Suíte completa de testes E2E/regressão visual com Playwright
- Testes automatizados de acessibilidade
- Otimização completa de performance e divisão de código
- Múltiplos cenários de gameplay

A implementação atual possui o **loop principal jogável**, incluindo renderização, controles, movimentação, colisões, combate, inimigo e sistema de projéteis.

## 🌍 Deploy

A aplicação está publicada utilizando **Vercel**.

**Demo:**  
[`https://pixi-js-naval-shooter2-ev9l1m5ge-dac-863c.vercel.app/`
](https://pixi-js-naval-shooter2-ev9l1m5ge-dac-863c.vercel.app/)
