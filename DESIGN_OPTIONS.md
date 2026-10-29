# Deixe Doar — Direções de arte (rodada 2)

Visualização ao vivo em `/` (seletor no topo; cada direção tem URL própria: `/#institucional`, `/#fiscal`, `/#editorial`).

As três propostas da rodada 1 (circo, pista de terra, caderno escolar) foram descartadas: tiravam a seriedade fiscal, reduziam o instituto a uma única frente e não conversavam com a logo. Nesta rodada, as três direções partem do mesmo ponto: o DNA de cor da logo oficial e o arquétipo de plataforma institucional de incentivo fiscal com impacto multissetorial.

Partes comuns às três: o simulador de 6% do IRPF com as duas modalidades (Deixe Doar financiada e Quero Doar Agora), a logo real no header e no footer, e as seis frentes com o mesmo peso.

## DNA da logo (`public/images/logo-deixe-doar.png`)

Cores amostradas diretamente do arquivo:

| Elemento da logo | Hex |
|---|---|
| Anel violeta | `#4717F6` |
| Lettering índigo | `#281885` / `#2A198B` |
| Marinho | `#1A1055` / `#231760` |
| Quase preto | `#06070C` |
| Arco de órbita e figura (vermelho) | `#EE1911` |

**Tratamento da logo:** o PNG (640×640) tem o **miolo transparente**.
- Sobre fundos claros (headers), a logo entra sem nenhum contêiner.
- Sobre fundos escuros (footers), recebe um disco branco recortado no próprio círculo, com a classe `.ds-logo--on-dark`: `radial-gradient(circle closest-side, #fff 0 64%, transparent 65%)`. Assim nunca aparece um quadrado branco atrás da marca.

## Direção 1 — Institucional Evoluído

A logo modernizada vira o sistema inteiro:
- O violeta do anel vira a cor de ação.
- O índigo do lettering vira a cor do texto.
- O arco vermelho com dois pontos vira o único gesto gráfico do site, contornando o simulador. No mobile o arco some.

O fundo é claro e luminoso, e as seis frentes aparecem numa grade 3×2 de mesmo peso.

- **Tipografia:** Plus Jakarta Sans (títulos, ExtraBold) + Familjen Grotesk (texto, formulários, números).
- **Paleta:**

  | Cor | Hex | Uso |
  |---|---|---|
  | Violeta Deixe Doar | `#4A1FE8` | Ação principal |
  | Índigo da marca | `#221673` | Títulos |
  | Vermelho órbita | `#E5231B` | Arco e pontos |
  | Vermelho texto | `#C4150F` | Vermelho em texto, versão AA |
  | Névoa lilás | `#F4F2FF` | Faixas de seção |
  | Noite | `#100C33` | Rodapé |
- **Botões:** pílula violeta sólida, com secundário em contorno.
- **Para quem:** o público geral do site; é a evolução mais segura da marca atual.

## Direção 2 — Confiança Fiscal & Impacto Transparente

Junta a linguagem de relatório anual de fundação com a clareza de um app financeiro, pensada para contribuintes de IRPF (médicos, advogados, servidores, empresários) e para contadores.

- **Barra utilitária:** CNPJ e telefone de atendimento.
- **Selos jurídicos:**
  - CNPJ;
  - recibo legal;
  - 33 projetos em 5 leis de incentivo;
  - "Dedução prevista em lei". Esta redação foi escolhida para não sugerir chancela da Receita Federal.
- **Demonstrativo da doação:** inclui a linha "Juros e taxas R$ 0".
- **Linha do tempo real de 4 passos:** é a única numeração do site.
- **Tabela "Para onde vai o seu imposto"** e um bloco de relatório de impacto.

- **Tipografia:** Newsreader (títulos com tamanho óptico, peso de documento) + Public Sans (interface, tabelas, numerais tabulares).
- **Paleta:**

  | Cor | Hex | Uso |
  |---|---|---|
  | Marinho institucional | `#15104A` | |
  | Índigo da marca | `#2A198B` | |
  | Violeta de dado | `#4717F6` | Só nos valores |
  | Vermelho selo | `#D8170F` | Só no ponto da marca |
  | Papel de relatório | `#F5F6FA` | |
  | Linha | `#DADCE8` | |
- **Botões:** retangulares de cantos curtos, marinho sólido.
- **Para quem:** a conversão de quem precisa de segurança antes de autorizar a doação, além de um canal "Para contadores".

## Direção 3 — Editorial Multissetorial Vibrante

Plataforma de instituto cultural, no espírito do Itaú Cultural: grid de revista, fotografia grande, títulos condensados e uma régua de cores que organiza os eixos.

As cores de eixo não foram inventadas: são seis paradas do degradê da própria logo, do vermelho da órbita ao índigo das letras.

| Eixo | Hex |
|---|---|
| Cultura | `#D7160E` |
| Esporte (BMX Freestyle e Breaking) | `#C2124E` |
| Inclusão (AnDança) | `#951590` |
| Educação | `#6A17D6` |
| Parques (Udi Bike) | `#4717F6` |
| Financiamento fiscal | `#22166F` |

- **Tipografia:** Bricolage Grotesque (títulos condensados, largura 75, também nos valores do simulador) + Atkinson Hyperlegible (texto corrido, desenhada para baixa visão).
- **Base:** tinta `#120E33` sobre papel `#FFFFFF`.
- **Botões:** blocos retos em tinta sólida; cada eixo tem uma etiqueta na cor dele.
- **Para quem:** a vitrine de projetos para empresas (ESG), imprensa e parceiros culturais.

## Revisão contra padrões genéricos

- Nenhuma das paletas usa creme com terracota, fundo escuro neon ou gradiente roxo de SaaS. Todos os tons saem da logo, com contraste AA nos textos. O vermelho puro da marca só entra em elementos gráficos; em texto vira `#C4150F`.
- Nenhum título tem uma palavra isolada em itálico ou colorida.
- Nada de eyebrows monoespaçadas em caixa alta, nem setas `→` em botões.
- A numeração aparece apenas na linha do tempo real da Direção 2.
- Sem ilustrações caricatas. Toda imagem é um espaço de foto explícito ("Foto: …"), à espera do acervo real do instituto.
- Sem Inter, Roboto, Arial, Space Grotesk, Alfa Slab One ou Shantell Sans.

## Pendências antes de escolher

- Fotos reais para cada frente (escolas, Trupe, Udi Bike no Parque do Sabiá, BMX/Breaking, AnDança).
- Validação contábil dos parâmetros de IRPF usados no simulador (tabela anual e limite de 6%).
