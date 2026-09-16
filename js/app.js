import {
    renderizarTarefas,
    configurarEventosDoQuadro
} from "./renderizacao.js";

import { carregarTarefas } from "./api.js";

import { renderizarEstado } from "./estados.js";

const quadro = document.querySelector("[data-quadro]");
const formularioFiltros = document.querySelector(".area-filtros form");
const botaoLimparFiltros = document.querySelector("[data-limpar-filtros]");
const botaoTentarNovamente = document.querySelector("[data-tentar-novamente]");

const FILTROS_INICIAIS = {
    busca: "",
    status: "todos",
    prioridade: "todas",
    ordenacao: "original"
};

// Fonte única da verdade. A tela é sempre uma projeção deste objeto.
const estado = {
    tarefas: [],
    ...FILTROS_INICIAIS,
    carregamento: false,
    erro: null
};

// Recebe o estado e devolve a lista visível.
// Não consulta o DOM e não altera estado.tarefas.
function derivarTarefasVisiveis(estadoAtual) {
    const textoBuscado = estadoAtual.busca.trim().toLowerCase();

    // filter() cria um array novo; o sort() abaixo atua nessa cópia.
    const visiveis = estadoAtual.tarefas.filter((tarefa) => {
        const correspondeAoTexto = tarefa.titulo
            .toLowerCase()
            .includes(textoBuscado);

        const correspondeAoStatus =
            estadoAtual.status === "todos" ||
            tarefa.status === estadoAtual.status;

        const correspondeAPrioridade =
            estadoAtual.prioridade === "todas" ||
            tarefa.prioridade === estadoAtual.prioridade;

        return (
            correspondeAoTexto &&
            correspondeAoStatus &&
            correspondeAPrioridade
        );
    });

    if (estadoAtual.ordenacao === "prazo-crescente") {
        visiveis.sort((a, b) => a.prazo.localeCompare(b.prazo));
    } else if (estadoAtual.ordenacao === "prazo-decrescente") {
        visiveis.sort((a, b) => b.prazo.localeCompare(a.prazo));
    }

    return visiveis;
}

function sincronizarControles() {
    const campos = formularioFiltros.elements;

    if (campos.busca.value !== estado.busca) {
        campos.busca.value = estado.busca;
    }

    campos.status.value = estado.status;
    campos.prioridade.value = estado.prioridade;
    campos.ordenacao.value = estado.ordenacao;
}

// Ponto único de renderização: deriva uma vez e alimenta tudo.
function atualizarTela() {
    const visiveis = derivarTarefasVisiveis(estado);

    renderizarTarefas(visiveis, quadro);
    renderizarEstado(estado, visiveis);
    sincronizarControles();
}

function mensagemDeErro(erro) {
    if (erro.name === "TypeError") {
        return "Não foi possível conectar ao servidor. Verifique sua conexão.";
    }

    if (erro.name === "SyntaxError") {
        return "O arquivo de tarefas está com formato inválido.";
    }

    return `O servidor respondeu com falha: ${erro.message}`;
}

async function carregarAplicacao() {
    estado.carregamento = true;
    estado.erro = null;
    atualizarTela();

    try {
        estado.tarefas = await carregarTarefas();
    } catch (erro) {
        estado.tarefas = [];
        estado.erro = mensagemDeErro(erro);
        console.error("Falha ao carregar tarefas:", erro);
    }

    estado.carregamento = false;
    atualizarTela();
}

configurarEventosDoQuadro(quadro, () => estado.tarefas);

formularioFiltros.addEventListener("input", (evento) => {
    const campo = evento.target;

    if (!(campo.name in FILTROS_INICIAIS)) {
        return;
    }

    estado[campo.name] = campo.value;
    atualizarTela();
});

// Enter na busca não pode recarregar a página.
formularioFiltros.addEventListener("submit", (evento) => {
    evento.preventDefault();
});

botaoLimparFiltros.addEventListener("click", () => {
    Object.assign(estado, FILTROS_INICIAIS);
    atualizarTela();
});

botaoTentarNovamente.addEventListener("click", carregarAplicacao);

carregarAplicacao();
