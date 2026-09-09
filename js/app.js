import { renderizarTarefas } from "./renderizacao.js";

const quadro = document.querySelector("[data-quadro]");
const estado = document.querySelector("[data-estado]");
const botaoTentarNovamente = document.querySelector(
    "[data-tentar-novamente]"
);
const formularioFiltros = document.querySelector(
    ".area-filtros form"
);

let tarefasCarregadas = [];

async function carregarTarefas() {
    estado.textContent = "Carregando tarefas...";
    estado.dataset.tipo = "carregando";
    botaoTentarNovamente.hidden = true;

    try {
        const resposta = await fetch("./dados.json");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const documento = await resposta.json();
        if (!Array.isArray(documento.tarefas)) {
            throw new Error(
                'O JSON precisa possuir a propriedade "tarefas" como array.'
            );
        }
        tarefasCarregadas = documento.tarefas;

        if (documento.tarefas.length === 0) {
            renderizarTarefas([], quadro);
            estado.textContent = "Nenhuma tarefa encontrada.";
            estado.dataset.tipo = "vazio";
            return;
        }

        renderizarTarefas(documento.tarefas, quadro);

        estado.textContent =
            `${documento.tarefas.length} tarefas carregadas.`;
        estado.dataset.tipo = "sucesso";
    } catch (erro) {
        renderizarTarefas([], quadro);
        botaoTentarNovamente.hidden = false;
        botaoTentarNovamente.focus();
        estado.textContent = "Não foi possível carregar as tarefas.";
        estado.dataset.tipo = "erro";         
        console.error("Falha ao carregar tarefas:", erro);
    }
}

function aplicarFiltros() {
    const dadosFormulario = new FormData(formularioFiltros);

    const textoBuscado = dadosFormulario
        .get("busca")
        .trim()
        .toLowerCase();

    const statusSelecionado =
        dadosFormulario.get("status");

    const prioridadeSelecionada =
        dadosFormulario.get("prioridade");

    const tarefasFiltradas = tarefasCarregadas.filter(
        (tarefa) => {
            const correspondeAoTexto = tarefa.titulo
                .toLowerCase()
                .includes(textoBuscado);

            const correspondeAoStatus =
                statusSelecionado === "todos" ||
                tarefa.status === statusSelecionado;

            const correspondeAPrioridade =
                prioridadeSelecionada === "todas" ||
                tarefa.prioridade === prioridadeSelecionada;

            return (
                correspondeAoTexto &&
                correspondeAoStatus &&
                correspondeAPrioridade
            );
        }
    );

    renderizarTarefas(tarefasFiltradas, quadro);
}

botaoTentarNovamente.addEventListener(
    "click",
    carregarTarefas
);

formularioFiltros.addEventListener(
    "input",
    aplicarFiltros
);

carregarTarefas();


