# E1 — Estrutura semântica e acessível da interface

**Disciplina:** Desenvolvimento Frontend — 2026.2  
**Prazo:** **11/08 (quarta)** até 23h59  
**Questionário associado:** **Q1**, na aula 3 (12/08 quarta), nos primeiros momentos de aula.

---

## O que é esta entrega

A primeira etapa do seu **gerenciador de tarefas acadêmicas**, o projeto que você vai construir ao longo de todo o primeiro bloco do semestre.

Nesta entrega você constrói **apenas a estrutura HTML** da interface. Sem CSS. Sem JavaScript. Sem dados carregados de lugar nenhum, os cartões de tarefa são escritos à mão, direto no HTML.

A página vai ficar feia. Isso é proposital, e é o ponto: uma interface bem estruturada continua compreensível e navegável mesmo sem nenhum estilo. Se, ao abrir seu arquivo sem CSS, não der para entender o que é cada coisa, a estrutura está errada, e nenhum CSS conserta isso depois.

---

## O que a aplicação faz

Um quadro de tarefas de projetos acadêmicos. Duas entidades:

**Projeto** — identificador, nome, descrição, disciplina, data de criação.

**Tarefa** — identificador, projeto a que pertence, título, descrição, status, prioridade, responsável, prazo.

Os status possíveis: **a fazer**, **em andamento**, **em revisão**, **concluída**.  
As prioridades possíveis: **baixa**, **média**, **alta**.

---

## O que você deve construir

Uma única página (index.html) contendo:

1. **Cabeçalho da página**, com o nome da aplicação.  
2. **Região de busca e filtros**, contendo:  
   * um campo de busca por título da tarefa;  
   * um filtro por status;  
   * um filtro por prioridade.  
3. **Visão de quadro**: quatro agrupamentos, um por status, cada um identificado pelo nome do status.  
4. **Cartões de tarefa** dentro de cada agrupamento. Escreva **no mínimo oito tarefas** à mão, distribuídas entre os quatro status, com prioridades variadas. Cada cartão exibe: título, projeto, responsável, prazo e prioridade.  
5. **Rodapé**, com seu nome e a identificação da disciplina.

---

## Itens mínimos verificáveis

Esta lista é a régua da entrega. **Uma entrega que não cumpre os itens mínimos é considerada não entregue** e, sem entrega, não há Q1.

* Arquivo index.html no repositório pessoal da disciplina, versionado com Git  
* \<html lang="pt-BR"\>  
* \<title\> descritivo  
* Meta tag de viewport presente  
* **Exatamente um \<h1\>** na página  
* **Nenhum nível de cabeçalho pulado** (de h1 só se vai para h2; de h2 só para h3)  
* \<main\> presente e único  
* Cada agrupamento de status é uma \<section\> **com nome acessível** (aria-labelledby apontando para o cabeçalho da seção)  
* Cada cartão de tarefa é um \<article\>  
* A pilha de cartões de cada coluna está marcada como lista (\<ul\> com \<li\>)  
* **Todo controle de formulário tem \<label\> associado**, verificado pelo teste do clique  
* Grupos de opções mutuamente exclusivas dentro de \<fieldset\> com \<legend\>  
* **Nenhum placeholder usado como substituto de rótulo**  
* Nenhum tabindex com valor positivo  
* Nenhuma \<div\> com onclick no lugar de \<button\>  
* Toda imagem com atributo alt presente (vazio se decorativa)  
* **A página inteira é navegável apenas com Tab**, em ordem que faz sentido  
* **Nenhum arquivo CSS.** Nenhum atributo style. Nenhuma tag \<style\>

---

## Verificando sua aplicação

Faça estes cinco testes. Levam cinco minutos e pegam quase todos os problemas.

**1\. Teste do sumário.** Abra o console do navegador e rode:

$$('h1,h2,h3,h4,h5,h6').map(h \=\> \`${h.tagName} ${h.textContent.trim().slice(0,60)}\`).join('\\n')

*Se o código não funcionar no seu terminal, pesquise maneiras de adaptá-lo para seu ecossistema. A saída deve ser um sumário coerente da página, sem níveis pulados.*

**2\. Teste do clique no rótulo.** Clique no **texto** de cada rótulo de formulário. O cursor deve entrar no campo correspondente ou a opção deve marcar. Se clicar e nada acontecer, não há rótulo, há texto solto.

**3\. Teste do Tab.** Guarde o mouse. Navegue a página inteira só com Tab. Você consegue chegar a todos os controles? A ordem faz sentido? Você consegue ver onde o foco está?

**4\. Teste do sem estilo.** Abra a página. Ela já está sem estilo. Alguém que nunca a viu conseguiria entender o que é cada parte só lendo?

**5\. Teste do validador.** Passe a página em https://validator.w3.org/nu/. Não é critério de acessibilidade, mas erros de marcação aqui costumam indicar problemas reais.

---

## O que NÃO faz parte desta entrega

* Estilo de qualquer tipo  
* JavaScript  
* Cadastro, edição ou exclusão de tarefas  
* Dados carregados de arquivo ou API  
* Responsividade

Tudo isso vem nas entregas seguintes.

---

## Como entregar

1. Trabalhe no **repositório pessoal da disciplina**, criado na aula 1\.  
2. Faça *commits* ao longo do trabalho, não um único *commit* no fim.  
3. O arquivo principal deve se chamar *index.html* e estar **ou na raiz do repositório ou em uma pasta com um nome que evidencie a atividade.**  
4. O prazo é **23h59 da véspera da aula 3**. 11/08 para a turma de quarta, 12/08 para a turma de quinta.  
5. Nada precisa ser enviado por e-mail. Responda essa atividade com o link do seu repositório. **O que está no GitHub no prazo é o que conta.**

---

## Como isso é avaliado

**A entrega em si não recebe nota.** Ela é o **pré-requisito** para você fazer o Q1.

O Q1 vale 1,0 ponto, tem no máximo 5 questões objetivas, é individual e sem consulta, e dura cerca de 15 minutos. **As perguntas são sobre o que você entregou**, decisões de marcação, consequências para navegação por teclado e leitores de tela, e os conceitos das aulas 1 e 2\.

Por isso: entregar código que você não entende não adianta. O uso de assistentes de IA é permitido; a avaliação recai sobre a sua compreensão do que foi entregue.

**Sem entrega no prazo, você não realiza o Q1 e fica com zero naquela etapa.** Falta justificada com atestado dá direito a fazer o questionário em data a combinar, desde que a entrega tenha sido feita no prazo.

 

* **MDN — HTML: uma boa base para acessibilidade**  
  [https://developer.mozilla.org/pt-BR/docs/Learn\_web\_development/Core/Accessibility/HTML](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Accessibility/HTML)  
* **W3C WAI — Tutorial de formulários: rotulando controles**  
  [https://www.w3.org/WAI/tutorials/forms/labels/](https://www.w3.org/WAI/tutorials/forms/labels/)  
* **WCAG 2.2 — Referência rápida** (filtre por nível A e AA)  
  [https://www.w3.org/WAI/WCAG22/quickref/](https://www.w3.org/WAI/WCAG22/quickref/)

