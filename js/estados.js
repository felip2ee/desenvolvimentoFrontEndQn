export function mostrarCarregando(estado, botao) {
    estado.textContent = "Carregando tarefas...";
    estado.dataset.tipo = "carregando";

    botao.hidden = true;
}

export function mostrarSucesso(estado, botao, quantidade) {
    estado.textContent = `${quantidade} tarefas carregadas.`;
    estado.dataset.tipo = "sucesso";

    botao.hidden = true;
}

export function mostrarVazio(estado, botao) {
    estado.textContent = "Nenhuma tarefa encontrada.";
    estado.dataset.tipo = "vazio";

    botao.hidden = true;
}

export function mostrarErro(estado, botao, mensagem) {
    estado.textContent = mensagem;
    estado.dataset.tipo = "erro";

    botao.hidden = false;
    botao.focus();
}