/**
 * @description Seleciona e retorna todos os elementos do DOM necessários para a aplicação.
 * Agrupa elementos de interface (UI) em um objeto separado para facilitar a manipulação.
 */
export function pegarElementosHTML() {
    const form = document.getElementById("form-busca");
    const input = document.getElementById("input-busca");
    const uiElementos = {
        resultado: document.getElementById("resultado-pokemon"), 
        listaContainer: document.getElementById("lista-pokemon-container"), 
        erro: document.getElementById("mensagem-erro"),
        loadingSpinner: document.getElementById("container-loading"),
        controlesPaginacao: document.getElementById("controles-paginacao"),
        botaoAnterior: document.getElementById("botao-anterior"),
        botaoProximo: document.getElementById("botao-proximo"),
        indicadorPagina: document.getElementById("indicador-pagina"),
        btnVoltarLista: document.getElementById("btn-voltar-lista"),
        spanVoltarPagina: document.getElementById("span-voltar-pagina")
    };

    return {
        form,
        input,
        uiElementos
    };
}

/**
 * Reseta a interface para o estado de "Carregando".
 * Esconde resultados anteriores, mensagens de erro e mostra o spinner.
 * @param {Object} uiElementos - Objeto contendo as referências do DOM.
 */
export function limpaResultado(uiElementos) {
    if (uiElementos.resultado) {
        uiElementos.resultado.style.display = "none";
    }
    if (uiElementos.listaContainer) {
        uiElementos.listaContainer.style.display = "none";
        uiElementos.listaContainer.innerHTML = ""; 
    }
    if (uiElementos.erro) {
        uiElementos.erro.style.display = "none";
    }
    if (uiElementos.loadingSpinner) {
        uiElementos.loadingSpinner.style.display = "flex";
    }
}