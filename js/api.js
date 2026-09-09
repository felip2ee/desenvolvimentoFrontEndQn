export async function carregarTarefas() {
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

    return documento.tarefas;
}