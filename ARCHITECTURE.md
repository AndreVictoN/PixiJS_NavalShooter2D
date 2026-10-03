# 🏗️ Arquitetura — Naval Shooter 2D

## 1. Visão Geral

O **Naval Shooter 2D** utiliza uma arquitetura híbrida entre **React** e **PixiJS**.

O React é responsável pela estrutura da aplicação e pela interface, enquanto o PixiJS é utilizado para a renderização e atualização dos elementos do jogo.

A lógica de gameplay é mantida separada da camada de renderização sempre que possível.

```text
React
 │
 ├── Interface
 │   └── Controles
 │
 └── GameCanvas
      │
      ▼
    PixiJS
      │
      └── Game
           ├── Player
           ├── Enemy
           ├── Projectile
           ├── Island
           └── Arena
```

---

# 2. Integração React / PixiJS

A integração entre React e PixiJS é realizada através de `@pixi/react`.

O componente `GameCanvas` funciona como ponte entre as duas camadas.

### React

O React é utilizado para:

- Inicialização da aplicação
- Organização das telas
- Interface dos controles
- Controles para dispositivos móveis
- Gerenciamento do ciclo de vida do componente que contém o jogo

### PixiJS

O PixiJS é responsável por:

- Renderização 2D
- Sprites
- Containers
- Texturas
- Loop de atualização
- Renderização dos elementos do cenário

O objeto `Game` contém a lógica principal da simulação e é criado fora da lógica de renderização do PixiJS.

O `GameCanvas` utiliza `useTick` para executar a atualização do jogo a cada frame.

---

# 3. Ciclo da Simulação

A cada frame, o `GameCanvas` obtém o tempo transcorrido desde o último frame:

```ts
const deltaTime = ticker.deltaMS / 1000;
```

Esse valor é utilizado para atualizar a simulação.

O fluxo principal é:

```text
PixiJS Ticker
      │
      ▼
Calcula deltaTime
      │
      ▼
game.update(deltaTime)
      │
      ├── Atualiza entrada do jogador
      │
      ├── Atualiza jogador
      │
      ├── Verifica colisão do jogador
      │
      ├── Atualiza inimigo
      │
      ├── Processa disparos
      │
      ├── Atualiza colisões dos projéteis
      │
      ├── Aplica dano
      │
      └── Verifica estados de morte
      │
      ▼
Atualização visual dos sprites
      │
      ▼
Renderização pelo PixiJS
```

## 3.1 `deltaTime`

A movimentação utiliza `deltaTime` para evitar que a velocidade dos objetos dependa diretamente da quantidade de frames por segundo.

Por exemplo, a movimentação de um projétil é calculada com base em:

```text
velocidade × deltaTime
```

Isso torna o comportamento mais consistente em diferentes taxas de atualização.

---

# 4. Entidades

As principais entidades do jogo estão localizadas em `src/game/entities`.

## Player

`Player.ts` representa o estado lógico do jogador.

Responsabilidades:

- Posição
- Rotação
- Controle de vida
- Velocidade
- Movimento
- Rotação
- Collider

O jogador lógico não é diretamente um `Sprite`.

O sprite visual é mantido no `GameCanvas` e sincronizado com a posição e rotação do `Player`.

## Enemy

`Enemy.ts` é uma entidade que também possui representação visual através de um `Sprite` do PixiJS.

Responsabilidades:

- Movimentação em direção ao jogador
- Rotação em direção ao jogador
- Controle de vida
- Temporizador de disparo
- Disparo automático
- Collider

O inimigo se aproxima do jogador até uma distância definida. Quando está suficientemente próximo, passa a realizar disparos periódicos.

## Projectile

`Projectile.ts` representa os disparos.

Cada projétil possui:

- Posição
- Rotação
- Direção
- Dono
- Velocidade
- Dano

O campo `owner` diferencia projéteis do:

```text
player
enemy
```

Essa informação é utilizada para determinar quais entidades podem receber dano.

---

# 5. Entrada do Jogador

A entrada é separada da lógica de gameplay através de:

```text
src/game/input/
├── GameInputs.ts
├── InputManager.ts
└── KeyboardInput.ts
```

O `InputManager` mantém o estado atual das entradas.

O `KeyboardInput` traduz eventos do teclado para essas entradas.

Os controles de interface utilizam os mesmos estados de entrada, permitindo que teclado e controles na tela acionem a mesma lógica de gameplay.

Isso evita duplicação da lógica de movimentação e disparo.

---

# 6. Colisões

O jogo utiliza colisores elípticos para representar objetos com diferentes dimensões nos eixos X e Y.

A verificação utiliza:

```text
(dx² / rx²) + (dy² / ry²) < 1
```

onde:

- `dx` é a diferença entre as posições X
- `dy` é a diferença entre as posições Y
- `rx` é o raio horizontal
- `ry` é o raio vertical

A implementação está centralizada na lógica de colisão da classe `Game`.

## 6.1 Colisões implementadas

Atualmente existem os seguintes relacionamentos:

```text
Player      ↔ Island
Player      ↔ Enemy
Projectile  ↔ Island
Player Shot ↔ Enemy
Enemy Shot  ↔ Player
```

## 6.2 Colisão com a ilha

Quando o jogador colide com uma ilha, sua posição anterior é restaurada.

Projéteis que atingem uma ilha são removidos do jogo.

## 6.3 Colisão entre jogador e inimigo

Quando jogador e inimigo colidem, as posições anteriores são restauradas para impedir que as entidades atravessem umas às outras.

## 6.4 Colisão dos projéteis

Os projéteis são verificados a cada atualização.

Quando ocorre uma colisão:

1. O dano é aplicado.
2. O projétil é destruído.
3. O projétil é removido da lista de entidades ativas.

---

# 7. Gerenciamento de Recursos

Os assets utilizados pelo jogo são carregados através do sistema de assets do PixiJS.

Exemplos de recursos utilizados:

- Texturas de água
- Texturas das ilhas
- Sprites dos navios
- Sprites dos projéteis

Os assets são referenciados a partir do diretório público:

```text
public/assets/
```

Os caminhos utilizados pelo código seguem o formato:

```text
/assets/...
```

O carregamento é realizado durante a inicialização do `GameCanvas`.

O `Assets.load()` é utilizado para obter as texturas antes de adicioná-las à cena.

## 7.1 Limitações atuais

O carregamento inicial ainda pode ser otimizado.

Parte dos assets é carregada durante a inicialização do jogo, o que pode aumentar o tempo até que todos os elementos estejam disponíveis.

Uma evolução possível seria utilizar:

- Pré-carregamento em paralelo
- Tela de loading

---

# 8. Persistência Local

A versão atual **não possui persistência local de progresso, ranking ou histórico**.

Não são utilizados atualmente:

- `localStorage` para ranking
- IndexedDB
- Cache API
- Banco de dados local

Portanto, os estados atuais do jogo existem apenas durante a execução da aplicação.

---

# 9. Ranking e Histórico

A arquitetura prevista no desafio inclui ranking e histórico de partidas, porém esses recursos **não foram implementados na versão atual**.

Consequentemente, também não existem atualmente:

- Endpoint de ranking
- Endpoint de histórico
- Cliente Axios
- TanStack Query
- Cache de requisições
- Persistência de registros pendentes
- Sincronização posterior
- MSW para simulação da API

## 9.1 Recuperação de registros pendentes

A versão atual não possui mecanismo de recuperação de registros pendentes.

Em uma implementação futura, partidas finalizadas durante uma indisponibilidade de rede poderiam ser armazenadas localmente e sincronizadas posteriormente quando a conexão fosse restabelecida.

Esse mecanismo ainda não faz parte da implementação entregue.

---

# 10. Cache

Não existe atualmente um sistema de cache de dados de ranking ou histórico.

Uma futura implementação de ranking poderia utilizar o cache do TanStack Query para:

- Ranking atual
- Histórico de partidas
- Estados de carregamento
- Atualizações após envio de uma nova partida

---

# 11. Cenários de Rede

A versão atual não possui integração com uma API.

Consequentemente, não existem atualmente:

- Mocks utilizando MSW
- Estados de erro de API
- Timeout simulado
- Falha de conexão
- Recuperação automática
- Reset dos cenários de rede

Esses recursos fazem parte do escopo previsto para a camada de dados, mas não foram implementados nesta versão.

---

# 12. Decisões de Balanceamento

O balanceamento atual foi mantido simples para priorizar a implementação do loop principal dentro do tempo disponível.

## Jogador

O jogador possui:

- Movimento para frente
- Rotação independente
- Três direções de disparo

Os disparos laterais utilizam múltiplos projéteis para representar os canhões laterais do navio.

## Inimigo

O inimigo possui comportamento simples:

1. Localiza a posição do jogador.
2. Rotaciona em direção ao jogador.
3. Aproxima-se enquanto estiver distante.
4. Quando entra em uma distância adequada, começa a disparar.
5. Continua disparando em intervalos regulares.

## Limitações do balanceamento

O balanceamento atual ainda é experimental.

Não foram implementados:

- Diferentes tipos de inimigos
- Progressão de dificuldade
- Múltiplas ondas
- Power-ups
- Sistema de pontuação completo
- Diferentes tipos de projéteis
- Ajuste dinâmico de dificuldade

---

# 13. Performance

O loop de gameplay utiliza `deltaTime` para tornar a simulação independente da taxa de FPS.

Os projéteis ativos são armazenados em uma lista e removidos quando:

- Colidem com uma ilha
- Atingem uma entidade
- Saem dos limites da arena

Isso evita manter projéteis que não possuem mais utilidade na simulação.

# 14. Limitações Gerais

A arquitetura atual foi desenvolvida priorizando um **MVP jogável dentro do tempo disponível para o desafio**.

As principais funcionalidades arquiteturais ainda ausentes são:

- Persistência de ranking
- Histórico de partidas
- API# 🏗️ Arquitetura — Naval Shooter 2D

# 15. React

O React é utilizado para:

- Inicialização da aplicação
- Organização das telas
- Interface dos controles
- Controles para dispositivos móveis
- Gerenciamento do ciclo de vida do componente que contém o jogo

# 16. PixiJS

O PixiJS é responsável por:

- Renderização 2D
- Sprites
- Containers
- Texturas
- Loop de atualização
- Renderização dos elementos do cenário

---

# 17. Colisões

O jogo utiliza colisores elípticos para representar objetos com diferentes dimensões nos eixos X e Y.

A verificação utiliza:

```text
(dx² / rx²) + (dy² / ry²) < 1
```

onde:

- `dx` é a diferença entre as posições X
- `dy` é a diferença entre as posições Y
- `rx` é o raio horizontal
- `ry` é o raio vertical

# 18. Performance

O loop de gameplay utiliza `deltaTime` para tornar a simulação independente da taxa de FPS.

Os projéteis ativos são armazenados em uma lista e removidos quando:

- Colidem com uma ilha
- Atingem uma entidade
- Saem dos limites da arena

Isso evita manter projéteis que não possuem mais utilidade na simulação.

## Limitações

O bundle principal da aplicação ainda possui um tamanho considerável após a minificação.

Também existem oportunidades de otimização relacionadas a:

- Code splitting
- Carregamento sob demanda
- Pré-carregamento de assets
- Redução do tamanho inicial do bundle

---

# 19. Limitações Gerais

A arquitetura atual foi desenvolvida priorizando um **MVP jogável dentro do tempo disponível para o desafio**.

As principais funcionalidades arquiteturais ainda ausentes são:

- Persistência de ranking
- Histórico de partidas
- API
- Axios
- TanStack Query
- MSW
- Recuperação de registros pendentes
- Cache de dados de servidor
- Testes E2E completos com Playwright
- Regressão visual automatizada
- Sistema completo de cenários de rede
- Otimização avançada de carregamento de recursos

A estrutura atual, entretanto, mantém a lógica de gameplay separada da interface e da renderização, permitindo que essas funcionalidades sejam adicionadas posteriormente sem precisar reestruturar completamente o núcleo do jogo.
