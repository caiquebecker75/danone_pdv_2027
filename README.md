# Danone PDV 2027 · planejamento estratégico 75LAB

Planejamento estratégico da 75LAB para a Danone em formato de apresentação navegável: o sistema inteligente de trade marketing e ponto de venda, com **YoPRO UHT** como marca demonstradora e **Cada PDV Conta** como território recomendado.

Publicação prevista: https://projetos.75lab.com.br/danone_pdv_2027/ (quando o GitHub Pages estiver ativo no repositório).

Fonte do conteúdo: `DANONE_PDV_2027_Planejamento_Estrategico_75LAB.pdf` (23 páginas, nov/2026). O PDF fica fora do Git.

## Telas (41)

| Capítulo | Telas |
|---|---|
| Abertura | Capa · síntese em seis respostas |
| 1 · Diagnóstico | Leitura do desafio · a Danone já é madura em PDV · decupagem do briefing · o que sabemos e o que falta descobrir · por que YoPRO UHT · linguagem e posicionamento · mercado e canais · concorrência · shopper e jornada · tendências 2027 |
| 2 · Estratégia | Insights · tensão central · grande oportunidade e "como podemos" · estratégia central e ciclo de valor · pilares · territórios (abas, com notas) |
| 3 · Solução | Hero + Support + Scale · configurações A, B, C · enxoval · clusters · engenharia e critérios do protótipo |
| 4 · Tecnologia | Seis camadas e WebAR · rastreabilidade · plataforma de promotores · exemplo integrado, dados e LGPD |
| 5 · Execução | MoSCoW · entregáveis e modelo comercial · KPIs · pré-mortem · roadmap · recomendação · roteiro de 14 telas · plano de ação · bases e notas |

Cada capítulo abre com uma tela-divisória vermelha.

## Navegação

← → ou espaço avançam · clique nas bordas da tela · **M** índice · **F** tela cheia · Home/End · os botões do topo levam ao início de cada capítulo.
No celular, as telas viram uma página de rolagem; tocar no topo abre o índice.
QA: `?static` (sem animação), `?desktop` (força o palco no celular).

## Estrutura

- `index.html`: todas as telas (`section.slide`, com `data-cap` para o capítulo e `data-title` para o índice).
- `assets/css/deck.css`: palco de 1600 × 900 escalado à janela, componentes (cards, tabelas, fluxos, selos) e versão celular (`html.m`).
- `assets/js/deck.js`: navegação, índice, trilha de capítulos, abas (`data-abas`) e notas de 1 a 5 (`data-nota`).
- `assets/img/packs/`: embalagens YoPRO UHT do site oficial yopro.com.br (recortadas, em webp).
- `assets/img/fotos/`: imagens de campanha do site oficial YoPRO.
- `assets/img/logos/`: YoPRO (versões branca e preta) e 75LAB.

HTML, CSS e JS puros, sem build e sem dependências (só fontes do Google: Archivo e Figtree).

## Cuidados

Documento de prospecção: conceitos, clusters, fluxos e capacidades futuras são propostas da 75LAB, não decisões nem resultados da Danone. Números e claims precisam ser conferidos nas fontes originais antes de qualquer versão externa.
