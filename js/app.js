import {
    renderizarTarefas,
    configurarEventosDoQuadro
} from "./renderizacao.js";

import { carregarTarefas } from "./api.js";

import { 
    mostrarCarregando,
    mostrarSucesso,
    mostrarVazio,
    mostrarErro
} from "./estados.js";



const quadro = document.querySelector("[data-quadro]");
const estado = document.querySelector("[data-estado]");
const botaoTentarNovamente = document.querySelector(
    "[data-tentar-novamente]"
);
const formularioFiltros = document.querySelector(
    ".area-filtros form"
);

let tarefasCarregadas = [];

configurarEventosDoQuadro(
    quadro,
    () => tarefasCarregadas
);

async function atualizarAplicacao() {
    mostrarCarregando(estado, botaoTentarNovamente);

    try {
        tarefasCarregadas = await carregarTarefas();

        if (tarefasCarregadas.length === 0) {
            renderizarTarefas([], quadro);
            mostrarVazio(estado, botaoTentarNovamente);
            return;
        }

        aplicarFiltros();

        mostrarSucesso(
            estado,
            botaoTentarNovamente,
            tarefasCarregadas.length
        );
    } catch (erro) {
        tarefasCarregadas = [];
        renderizarTarefas([], quadro);

        let mensagem;

        if (erro instanceof TypeError) {
            mensagem = "Não foi possível conectar ao servidor.";
        } else if (erro instanceof SyntaxError) {
            mensagem = "O arquivo JSON possui formato inválido.";
        } else {
            mensagem = "Não foi possível carregar as tarefas.";
        }

        mostrarErro(
            estado,
            botaoTentarNovamente,
            mensagem
        );

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
    atualizarAplicacao
);

formularioFiltros.addEventListener(
    "input",
    aplicarFiltros
);

atualizarAplicacao();


