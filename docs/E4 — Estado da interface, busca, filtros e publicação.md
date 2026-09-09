# E4 — Estado da interface, busca, filtros e publicação

**Disciplina:** Desenvolvimento Frontend — 2026.2  
**Aberta na aula 7** (09/09 quarta · 10/09 quinta)  
**Prazo:** **15/09 (quarta) · 16/09 (quinta)**, até 23h59  
**Questionário associado:** **Q4**, na aula 8 (16/09 quarta · 17/09 quinta), nos primeiros 15 minutos.

---

## O que é esta entrega

A quarta e última etapa individual do gerenciador de tarefas acadêmicas. Você parte da **E3 funcionando**, com dados.json carregado por fetch e os estados de carregando, sucesso, erro e vazio. Agora os controles criados nas primeiras etapas passam a operar de verdade, e a aplicação é publicada.

A regra central desta entrega: **o estado é a fonte; a tela é uma projeção.** Busca, filtros, ordenação, cartões, contagem e mensagens devem permanecer sincronizados porque todos derivam do mesmo objeto de estado.

carregarTarefas() continua responsável apenas pela obtenção dos dados, e renderizarTarefas() continua recebendo um array. Não mova regras de filtro para a função de API e não leia cartões do DOM para descobrir quais tarefas existem.

---

## O que você deve construir

1. **Um estado único da aplicação**, contendo as tarefas originais, o texto de busca, os filtros de status e prioridade, o critério de ordenação, a situação do carregamento e o erro atual.  
2. **Uma função de derivação**, que recebe o estado e devolve a lista visível após combinar busca, filtros e ordenação, sem alterar o array original.  
3. **Um ciclo único de atualização**: cada evento altera o estado e chama o mesmo ponto de renderização; cartões, contagem, mensagens e controles são sincronizados a partir daí.  
4. **Controles funcionando em conjunto**: busca por título, filtro por status, filtro por prioridade, ordenação por prazo e botão “Limpar filtros”.  
5. **Feedback de resultados acessível**, distinguindo origem vazia, nenhum resultado para os critérios, carregamento e erro.  
6. **A aplicação publicada no GitHub Pages**, com a URL registrada no README.md e todos os recursos carregando na versão pública.

---

## Itens mínimos verificáveis

**Uma entrega que não cumpre os itens mínimos é considerada não entregue** e, sem entrega, não há Q4.

### Estado e responsabilidades

* Existe um objeto de estado único com tarefas, busca, status, prioridade, ordenacao, carregamento e erro  
* O array recebido de carregarTarefas() é armazenado em estado.tarefas  
* Não existe uma segunda lista filtrada armazenada permanentemente no estado  
* carregarTarefas() não lê controles e não manipula o DOM  
* A função que deriva a lista não consulta elementos do DOM  
* A função que deriva a lista não altera o objeto de estado nem o array estado.tarefas

### Busca, filtros e ordenação

* A busca por título reage ao evento input e ignora diferenças entre maiúsculas e minúsculas  
* O filtro por status possui a opção “Todos” e funciona sozinho  
* O filtro por prioridade possui a opção “Todas” e funciona sozinho  
* **Busca, status e prioridade funcionam combinados**, independentemente da ordem em que foram alterados  
* A ordenação por prazo funciona sem usar sort() diretamente sobre estado.tarefas  
* O botão “Limpar filtros” restaura os valores iniciais do estado e dos controles

### Atualização e renderização

* Cada ouvinte altera o estado e chama o mesmo ponto de renderização  
* A lista visível é derivada uma vez por ciclo e alimenta cartões e contagem  
* A renderização anterior é substituída; interações repetidas não duplicam cartões  
* Eventos delegados dos cartões continuam funcionando depois de uma nova renderização  
* Nenhum ouvinte percorre cartões para esconder ou mostrar elementos um por um

### Estados e acessibilidade

* Carregando, erro, origem vazia e resultado vazio produzem mensagens distintas  
* Resultado vazio é decidido pela lista derivada e não entra no catch  
* A região de resultados já existe no HTML com role="status" e aria-live="polite"  
* A região informa “N de M tarefas” ou uma mensagem equivalente após cada mudança  
* A atualização dos resultados não move o foco do teclado

### Publicação

* A aplicação está publicada no GitHub Pages a partir da branch padrão e da pasta correta  
* O README.md contém a URL pública clicável  
* **A URL pública carrega dados.json, CSS e módulos JavaScript sem resposta 404**  
* A aplicação publicada executa busca, filtros, ordenação e limpeza sem erros em **DevTools \> Console**

---

## Como verificar você mesmo, antes de entregar

**1\. Teste da fonte original.** Abra **DevTools \> Console**, registre a ordem dos IDs de estado.tarefas, aplique filtros e ordenação e confira novamente. A ordem e a quantidade originais permaneceram iguais? Se mudaram, sua derivação está alterando o estado canônico.

**2\. Teste dos critérios combinados.** Digite parte de um título, escolha um status e uma prioridade. Depois altere os controles em outra ordem. O mesmo conjunto de critérios produz o mesmo resultado? Se não produz, algum ouvinte está filtrando o resultado anterior ou manipulando cartões diretamente.

**3\. Teste de limpeza.** Ative todos os critérios e clique em “Limpar filtros”. Os campos voltam aos valores iniciais, todos os cartões reaparecem e a contagem volta ao total? Se somente a tela ou somente os controles mudam, existem duas fontes de verdade.

**4\. Teste do resultado vazio.** Escolha uma combinação válida que não encontre tarefa. A mensagem orienta a alterar ou limpar os critérios? Se aparecer erro de rede ou a tela ficar em branco, resultado vazio foi confundido com falha.

**5\. Teste de nova renderização.** Altere os filtros dez vezes e acione um botão de cartão. A ação ocorre uma única vez? Se não ocorre, o ouvinte estava preso aos nós substituídos; se ocorre várias vezes, você reinstalou o ouvinte a cada renderização.

**6\. Teste de teclado.** Guarde o mouse. Use Tab, digite na busca, altere os campos com o teclado e acione “Limpar filtros”. O foco permanece visível e a ordem é lógica? Se o foco pula ou desaparece, reveja a ordem do HTML e qualquer tabindex positivo.

**7\. Teste da URL pública.** Abra a aplicação publicada em uma janela privada. Em **DevTools \> Network**, recarregue e confirme status 200 para dados.json, CSS e todos os módulos JavaScript. Em **DevTools \> Console**, confirme que não há erros. Se local funciona e público não, revise caminhos relativos e diferenças entre letras maiúsculas e minúsculas.

**8\. Teste da largura.** Na versão pública, use o modo responsivo de 320px até uma tela larga. Busca, filtros e cartões continuam utilizáveis sem rolagem horizontal? Se falhar, a E4 quebrou uma garantia da E2.

---

## Desafio opcional

Sincronize os critérios de busca e filtro com a URL usando URLSearchParams, permitindo copiar um endereço que reabre a mesma visão.

O desafio é opcional porque acrescenta uma segunda forma de entrada: além dos controles, o estado inicial passa a depender da URL. Faça somente depois de todos os itens mínimos e mantenha o objeto de estado como representação canônica.

---

## O que NÃO faz parte desta entrega

* Frameworks ou bibliotecas de interface  
* Vite, bundler ou processo de build; isso começa na Aula 08  
* API pública externa ou json-server; isso começa depois da G1  
* Cadastro, edição e exclusão de tarefas  
* Persistência das alterações em banco de dados ou localStorage  
* Paginação, autenticação ou controle de acesso  
* Arrastar e soltar cartões  
* Implementar Redux, reducer, store genérica ou sistema próprio de reatividade

---

## Como entregar

1. No mesmo **repositório pessoal** usado nas entregas E1, E2 e E3.  
2. Commits ao longo do trabalho, não um único commit no fim.  
3. Publique a aplicação no GitHub Pages e registre a URL clicável no README.md.  
4. O prazo é **23h59 da véspera da Aula 08**: 15/09 para a turma de quarta e 16/09 para a turma de quinta.  
5. O que está no GitHub e funciona na URL pública no prazo é o que conta.

---

## Como isso é avaliado

**A entrega em si não recebe nota.** Ela é o pré-requisito para você fazer o **Q4**, que vale 1,0 ponto.

O Q4 tem no máximo 5 questões objetivas, é individual e sem consulta, e dura cerca de 30 minutos. **As perguntas são sobre o que você entregou:** por que a lista filtrada não deve ser armazenada como segunda fonte de verdade; por que sort() pode alterar o array original; qual é a sequência evento → estado → derivação → renderização; por que zero resultados não é erro; e por que a versão local pode funcionar enquanto a URL publicada retorna 404\.

Entregar código que você não entende não adianta. O uso de assistentes de IA é permitido; a avaliação recai sobre a sua compreensão do que foi entregue.

**Sem entrega no prazo, você não realiza o Q4 e fica com zero naquela etapa.** Falta justificada com atestado dá direito a fazer o questionário em data a combinar, desde que a entrega tenha sido feita no prazo.

