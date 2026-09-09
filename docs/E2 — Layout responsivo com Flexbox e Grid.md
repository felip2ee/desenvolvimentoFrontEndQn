# E2 — Layout responsivo com Flexbox e Grid

**Disciplina:** Desenvolvimento Frontend — 2026.2  
**Aberta na aula 4** (19/08 quarta · 20/08 quinta)  
**Prazo:** **25/08 (quarta) · 26/08 (quinta)**, até 23h59  
**Questionário associado:** **Q2**, na aula 5 (26/08 quarta · 27/08 quinta), nos primeiros momentos de aula.

---

## O que é esta entrega

A segunda etapa do gerenciador de tarefas acadêmicas. Você parte da **mesma estrutura HTML da E1** e acrescenta CSS: estilo, layout e responsividade.

Continua sem JavaScript. Os cartões continuam escritos à mão no HTML.

A regra central desta entrega: **mobile-first**. Você escreve primeiro o CSS da tela estreita, sem nenhuma media query, e só depois acrescenta o que for necessário para telas maiores usando min-width. Não é preferência de estilo, é o que faz o CSS ficar menor e mais previsível, e é o que será verificado.

---

## O que você deve construir

Sobre o HTML da E1:

1. **Um arquivo styles.css**, ligado ao documento. Nada de style inline, nada de \<style\> na página.  
2. **Um sistema de design mínimo**, declarado em propriedades personalizadas no :root:  
   * cores de superfície, texto e borda;  
   * uma cor por status;  
   * uma escala de espaçamento com pelo menos três níveis;  
   * raio de canto.  
3. **Cartões de tarefa estilizados**, com o interior organizado por Flexbox: título ocupando o espaço livre, prioridade visível, prazo posicionado na base do cartão.  
4. **A visão de quadro em Grid:** as quatro colunas de status lado a lado em telas largas, empilhadas em telas estreitas.  
5. **Responsividade real**, de 320px a 1920px, sem rolagem horizontal em nenhum ponto.  
6. **Títulos longos truncados** com reticências, sem estourar o cartão.

---

## Itens mínimos verificáveis

**Uma entrega que não cumpre os itens mínimos é considerada não entregue** — e, sem entrega, não há Q2.

### Estrutura e organização

* Arquivo styles.css externo, ligado por \<link\>  
* Nenhum atributo style e nenhuma tag \<style\> no HTML  
* box-sizing: border-box aplicado universalmente  
* Pelo menos **seis** propriedades personalizadas declaradas em :root e efetivamente usadas  
* A cor de cada status vem de propriedade personalizada, não repetida em cada regra  
* O HTML da E1 permanece **estruturalmente correto**, a estrutura semântica não pode ser quebrada para facilitar o layout

### Layout

* O quadro usa **Grid**  
* As colunas usam **Flexbox** em direção vertical  
* min-width: 0 aplicado onde há truncamento de texto  
* Título longo trunca com text-overflow: ellipsis e **funciona de fato**  
* gap usado para espaçamento entre itens, em vez de margens compensadas

### Responsividade

* **Mobile-first**: o CSS base é o da tela estreita; nenhuma media query max-width como estratégia principal  
* Nenhuma **rolagem horizontal** em largura de 320px  
* Meta tag de viewport presente, **sem** user-scalable=no e **sem** maximum-scale  
* Cada ponto de quebra está **comentado no CSS**, com a justificativa: que aspecto do conteúdo quebrou ali  
* Pelo menos um uso de clamp(), combinando rem e vw

### Acessibilidade e verificação

* Todo par texto/fundo com **contraste mínimo de 4,5:1** (3:1 para texto a partir de 24px, ou 18,5px em negrito)  
* Nenhum alvo de clique menor que **24 × 24 pixels CSS**  
* **Foco visível** em todos os elementos focáveis — se você removeu o contorno padrão, precisa ter colocado outro  
* A ordem de foco pelo Tab continua fazendo sentido; se usou order, a ordem visual e a de foco continuam equivalentes  
* Tipografia em unidades relativas (rem), respeitando a configuração de tamanho de fonte do usuário

---

## Como verificar você mesmo, antes de entregar

**1\. Teste dos 320px.** Modo responsivo, largura 320\. Existe rolagem horizontal? Se sim, procure um minmax() com mínimo maior do que cabe, ou um elemento de largura fixa.

**2\. Teste do arrasto.** Arraste a largura da janela devagar, de 320 até o máximo. Anote cada ponto em que o layout fica feio. Esses são os seus pontos de quebra, não os números que você achou numa tabela de dispositivos.

**3\. Teste do contraste.** No painel de estilos do navegador, clique no quadradinho de cor de cada texto. A razão de contraste aparece ali. Menor que 4,5:1 em texto normal, corrija.

**4\. Teste do tamanho de fonte.** Nas preferências do navegador, mude o tamanho de fonte padrão de 16 para 24\. Recarregue. Seu texto cresceu? Se não cresceu, você usou px onde devia ter usado rem.

**5\. Teste do Tab.** Guarde o mouse. Navegue a página inteira. Você vê onde o foco está o tempo todo? A ordem continua fazendo sentido depois do layout?

**6\. Teste do título longo.** Coloque um título de tarefa com sessenta caracteres em um cartão. Ele trunca com reticências ou estoura a coluna? Se estoura, falta min-width: 0.

---

## O que NÃO faz parte desta entrega

* JavaScript de qualquer tipo  
* Cadastro, edição ou exclusão de tarefas  
* Dados carregados de arquivo ou API  
* Filtro ou busca **funcionando**, os controles existem visualmente, mas ainda não fazem nada  
* Arrastar e soltar cartões, isso está fora do escopo do projeto inteiro, por decisão da disciplina

---

## Como entregar

1. No mesmo **repositório pessoal** da E1.  
2. Commits ao longo do trabalho, não um único no fim.  
3. O prazo é **23h59 da véspera da aula 5,**  25/08 para a turma de quarta, 26/08 para a turma de quinta.  
4. O que está no GitHub no prazo é o que conta.

---

## Como isso é avaliado

**A entrega em si não recebe nota.** Ela é o pré-requisito para você fazer o **Q2**, que vale 1,0 ponto.

O Q2 tem no máximo 10 questões objetivas, é individual e sem consulta, e dura cerca de 30 minutos. **As perguntas são sobre o que você entregou**, por que você escolheu Grid aqui e Flexbox ali, o que flex: 1 faz com o tamanho dos itens, por que aquele texto trunca, onde estão seus pontos de quebra e por quê.

Entregar código que você não entende não adianta. O uso de assistentes de IA é permitido; a avaliação recai sobre a sua compreensão do que foi entregue.

**Sem entrega no prazo, você não realiza o Q2 e fica com zero naquela etapa.**

