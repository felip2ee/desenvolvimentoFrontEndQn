export function criarCartao(tarefa) {
    const item = document.createElement("li");
    const cartao = document.createElement("article");
    const titulo = document.createElement("h4");
    const prioridade = document.createElement("p");
    const prazo = document.createElement("p");

    cartao.dataset.tarefaId = tarefa.id;

    titulo.textContent = tarefa.titulo;

    prioridade.className = "prioridade";
    prioridade.textContent = tarefa.prioridade;

    prazo.className = "prazo";
    prazo.textContent = `Prazo: ${tarefa.prazo}`;

    cartao.append(titulo, prioridade, prazo);
    item.append(cartao);

    return item;
}

export function renderizarTarefas(tarefas, quadro) {
    const listas = quadro.querySelectorAll("[data-lista-status]");

    listas.forEach((lista) => {
        const statusDaLista = lista.dataset.listaStatus;

        const tarefasDoStatus = tarefas.filter(
            (tarefa) => tarefa.status === statusDaLista
        );

        const cartoes = tarefasDoStatus.map(criarCartao);

        if (cartoes.length === 0) {
            const mensagem = document.createElement("li");

            mensagem.className = "mensagem-coluna-vazia";
            mensagem.textContent = "Nenhuma tarefa neste status.";

            cartoes.push(mensagem);
        }

        lista.replaceChildren(...cartoes);
    });
}