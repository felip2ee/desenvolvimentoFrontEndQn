# E3 — Consumo de dados com fetch e os quatro estados da tela

**Disciplina:** Desenvolvimento Frontend — 2026.2  
**Aberta e inicio da atividade na aula 6** (02/09 quarta · 03/09 quinta)  
**Prazo para entrega final:** **08/09 (quarta) · 09/09 (quinta)**, até 23h59  
**Questionário associado:** **Q3**, na aula 7 (09/09 quarta · 10/09 quinta), nos primeiros minutos.

---

## O que é esta entrega

A terceira etapa do gerenciador de tarefas acadêmicas. Você parte do **mesmo projeto da E2, com o JavaScript das aulas 5 e 6**, e troca a origem dos dados: sai o array escrito dentro de dados.js, entra um arquivo dados.json carregado pela rede com fetch.

A regra central desta entrega: **a tela tem quatro estados, não um.** Carregando, sucesso, erro e vazio.

Todos os quatro acontecem com usuários reais, e todos os quatro precisam produzir uma tela diferente. Não é preferência de estilo, é o que separa software que funciona de software que só funciona quando tudo dá certo.

renderizarTarefas **não deve ser alterada.** Se você precisar mexer nela para os dados virem do JSON, o acoplamento não foi resolvido e é isso que você conserta primeiro.

---

## O que você deve construir

Sobre o projeto da E2:

1. **Um arquivo dados.json**, servido pela mesma origem da página, com **pelo menos oito tarefas** distribuídas entre os quatro status.  
2. **Um módulo js/api.js** que exporta carregarTarefas(), uma função assíncrona responsável por buscar, verificar e devolver o array. Nenhuma manipulação de DOM dentro dele.  
3. **Um módulo js/estados.js** que exporta renderizarEstado(estado, dados), responsável por decidir qual das quatro telas está valendo. Nenhuma requisição dentro dele.  
4. **Uma região de status no HTML**, presente e vazia desde o início do documento, que anuncia as mudanças de estado a leitores de tela.  
5. **Mensagens de erro diferenciadas** por tipo de falha: rede, protocolo e formato produzem textos distintos.  
6. **A separação preservada**: obter dados e desenhar dados continuam em funções diferentes.

---

## Itens mínimos verificáveis

**Uma entrega que não cumpre os itens mínimos é considerada não entregue** e, sem entrega, não há Q3.

### Dados e estrutura

* Arquivo dados.json na mesma origem da página, salvo em **UTF-8**  
* O documento raiz do JSON é um **objeto** com a chave tarefas, não um array solto  
* Pelo menos **oito** tarefas, distribuídas entre os quatro status  
* Todas as tarefas têm id, titulo, status, prioridade e prazo  
* js/dados.js não é mais importado por nenhum módulo em execução  
* js/api.js e js/estados.js existem, com exportações nomeadas  
* **renderizacao.js não foi alterado** em relação à entrega da aula 5

### Consumo de dados

* A obtenção usa fetch com caminho relativo  
* **response.ok é verificado antes de ler o corpo**, e o código lança erro com o status quando falso  
* O corpo é lido com await resposta.json(), com a espera presente  
* carregarTarefas() devolve o array e **não** toca no DOM  
* A chamada está envolvida em try/catch  
* Nenhum await de nível superior: a inicialização acontece dentro de uma função

### Os quatro estados

* O estado de **carregando** é aplicado **antes** do await, não depois  
* O estado de **sucesso** renderiza os cartões e informa quantos são  
* O estado de **vazio** é alcançado por tarefas.length \=== 0 e **não** pelo catch  
* O estado de **erro** exibe mensagem na tela, não apenas no console  
* Os quatro estados produzem **quatro telas distintas**; nenhum deles deixa a tela em branco  
* O catch distingue pelo menos **rede** (TypeError) e **formato** (SyntaxError) por erro.name

### Acessibilidade e verificação

* Existe um elemento de status com role="status" e aria-live="polite"  
* Esse elemento está **vazio na marcação inicial** e é preenchido depois, por JavaScript  
* O texto dos estados entra por textContent, nunca por innerHTML  
* aria-live="assertive" não é usado  
* A página continua sendo servida por **HTTP local**, não por file:  
* Nenhum erro em **DevTools \> Console** no caminho de sucesso

---

## Como verificar você mesmo, antes de entregar

**1\. Teste do carregando.** Em **DevTools \> Network**, escolha o throttling Slow 4G e recarregue. A mensagem de carregamento fica visível tempo suficiente para ser lida? Se a tela ficar em branco antes dos cartões aparecerem, o estado não está sendo aplicado antes do await.

**2\. Teste do vazio.** Aponte temporariamente o código para um arquivo com {"tarefas": \[\]}. Aparece uma mensagem explicando que não há tarefas? Se aparecer "erro", você tratou vazio como falha.

**3\. Teste do 404\.** Aponte para um caminho que não existe. A tela mostra erro? Se mostrar a tela de sucesso vazia, faltou o if (\!resposta.ok), e este é o item que mais reprova esta entrega.

**4\. Teste do offline.** Em **DevTools \> Network**, mude o throttling para Offline e recarregue. A mensagem é **diferente** da do teste anterior? Se for igual, você não está distinguindo os tipos de falha. **Volte o throttling para No throttling depois.**

**5\. Teste do JSON quebrado.** Coloque uma vírgula depois do último item do array e recarregue. Você recebe uma mensagem de formato, e não uma de rede?

**6\. Teste da região viva.** Em **DevTools \> Elements**, procure o elemento de status **antes** de qualquer interação. Ele existe e está vazio? Se ele só aparece depois do carregamento, nada será anunciado a quem usa leitor de tela.

**7\. Teste do acoplamento.** Abra renderizacao.js e compare com a versão da aula 5\. Mudou alguma coisa? Se mudou, explique a si mesmo por quê, porque essa pergunta pode aparecer no Q3.

---

## O que NÃO faz parte desta entrega

* Consumo de API pública externa, isso vem na segunda metade do semestre  
* Busca e filtros **funcionando**, os controles continuam existindo sem operar  
* Cadastro, edição ou exclusão de tarefas  
* Estado da interface centralizado, isso é a aula 7  
* Botão de tentar novamente, é bem-vindo mas não é exigido  
* Qualquer biblioteca ou framework

---

## Como entregar

1. No mesmo **repositório pessoal** da E1 e da E2.  
2. Commits iniciam na data da postagem da atividade, e ao longo do trabalho, não um único no fim.  
3. O prazo é **23h59 da véspera da aula 7**, 08/09 para a turma de quarta, 09/09 para a turma de quinta.  
4. O que está no GitHub no prazo é o que conta.

---

## Como isso é avaliado

**A entrega em si não recebe nota.** Ela é o pré-requisito para você fazer o **Q3**, que vale 1,0 ponto.

O Q3 tem no máximo 5 questões objetivas, é individual e sem consulta, e dura cerca de 30 minutos. **As perguntas são sobre o que você entregou:** por que fetch não rejeitou no 404, por que existem duas esperas, onde cada tipo de erro é tratado, por que o estado vazio não está no catch, e por que a região de status precisa existir antes da mudança.

Entregar código que você não entende não adianta. O uso de assistentes de IA é permitido; a avaliação recai sobre a sua compreensão do que foi entregue.

**Sem entrega no prazo, você não realiza o Q3 e fica com zero naquela etapa.** Falta justificada com atestado dá direito a fazer o questionário em data a combinar, desde que a entrega tenha sido feita no prazo.

---

## Onde buscar ajuda

* **MDN — Using the Fetch API**  
  [https://developer.mozilla.org/en-US/docs/Web/API/Fetch\_API/Using\_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
  Comece por aqui. A primeira função da página é o esqueleto desta entrega.  
* **MDN — Using promises**  
  [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using\_promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)  
  Leia mesmo escrevendo com async/await: explica o que está sendo esperado.  
* **MDN — ARIA live regions**  
  [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live\_regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)  
  A seção sobre criar a região antes da mudança resolve o erro mais comum do item de acessibilidade.  
* **RFC 8259 — o padrão do JSON**  
  [https://www.rfc-editor.org/rfc/rfc8259](https://www.rfc-editor.org/rfc/rfc8259)  
  Curto. As seções 6 e 7 contêm as regras que mais quebram arquivos na prática.

