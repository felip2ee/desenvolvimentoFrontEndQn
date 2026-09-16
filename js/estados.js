const regiaoEstado = document.querySelector("[data-estado]");
const botaoTentarNovamente = document.querySelector("[data-tentar-novamente]");

// Decide qual tela vale a partir do estado e da lista já derivada.
// Não faz requisição e não move o foco do teclado.
export function renderizarEstado(estado, visiveis) {
    const total = estado.tarefas.length;
    let tipo;
    let mensagem;

    if (estado.carregamento) {
        tipo = "carregando";
        mensagem = "Carregando tarefas...";
    } else if (estado.erro) {
        tipo = "erro";
        mensagem = estado.erro;
    } else if (total === 0) {
        tipo = "vazio";
        mensagem = "Nenhuma tarefa cadastrada ainda.";
    } else if (visiveis.length === 0) {
        tipo = "sem-resultados";
        mensagem = `0 de ${total} tarefas. Nenhuma tarefa corresponde aos critérios; altere ou limpe os filtros.`;
    } else {
        tipo = "sucesso";
        mensagem = `${visiveis.length} de ${total} tarefas`;
    }

    regiaoEstado.textContent = mensagem;
    regiaoEstado.dataset.tipo = tipo;
    botaoTentarNovamente.hidden = tipo !== "erro";
}
