/**
 * @description Arquivo principal. Gerencia o aplicativo, 
 * os eventos do usuário e a comunicação entre a API, a Validação e a Interface (UI).
 */
import { validaInput } from './valida-entrada-pokemon.js';
import { fetchPokemon, fetchPokemonList, mostraErro } from './conexao-api.js';
import { montaPokemonCard, criaURL } from './monta-pokemon.js';
import { pegarElementosHTML, limpaResultado } from './manipula-html.js';

document.addEventListener("DOMContentLoaded", () => {
    const { form, input, uiElementos } = pegarElementosHTML();
    const LIMIT = 20;
    let corte = 0; 
    let paginaAtual = 1;
    /**
     * Gerencia o carregamento da lista paginada.
     * Limpa a tela, busca os dados na API baseada no estado atual da @var corte e renderiza a grade.
     * @async 
     * @returns {Promise<void>} Não retorna valor, apenas manipula o DOM.
     */
    async function carregarPaginaAtual() {
        limpaResultado(uiElementos);
        uiElementos.btnVoltarLista.style.display = "none";
        uiElementos.controlesPaginacao.style.display = "flex";
        uiElementos.botaoAnterior.disabled = (paginaAtual === 1);
        try {
            const lista = await fetchPokemonList(LIMIT, corte);
            montaPokemonCard(lista, uiElementos.listaContainer);
            uiElementos.listaContainer.style.display = "grid"; 
            uiElementos.indicadorPagina.textContent = `Página ${paginaAtual}`;
        } catch (error) {
            console.error("Erro ao carregar lista:", error);
            mostraErro("Não foi possível carregar a lista de Pokémon.", uiElementos);
        } finally {
            uiElementos.loadingSpinner.style.display = "none";
        }
    }

    /**
     * formulário de busca.
     * Realiza a validação, busca o Pokémon único e altera a interface para o modo "Detalhe".
     * @event submit
     */
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        limpaResultado(uiElementos);
        let pokemonFinalParaAPI;
        try {
            pokemonFinalParaAPI = validaInput(input.value);
            if (pokemonFinalParaAPI.error) {
                mostraErro(pokemonFinalParaAPI.error, uiElementos);
                return;
            }
            const urlPokemon = criaURL(pokemonFinalParaAPI.pokemonFinalParaAPI);
            const dadosPokemon = await fetchPokemon(urlPokemon);            
            montaPokemonCard(dadosPokemon, uiElementos.resultado);
            uiElementos.controlesPaginacao.style.display = "none";
            uiElementos.spanVoltarPagina.textContent = paginaAtual; 
            uiElementos.btnVoltarLista.style.display = "inline-block";
        } catch (error) {
            const mensagemErro = `Pokémon "${pokemonFinalParaAPI.pokemonDigitado}" não encontrado!`;
            mostraErro(mensagemErro, uiElementos);
        } finally {
            uiElementos.loadingSpinner.style.display = "none";
        }
    });
    /**
     * Avança para a próxima página da lista.
     * Atualiza a @var paginaAtual para 1 a mais.
     * @event click
     */
    uiElementos.botaoProximo.addEventListener("click", () => {
        corte += LIMIT; 
        paginaAtual++;
        carregarPaginaAtual();
    });
    /**
     * Retorna para a página anterior da lista.
     * Atualiza a @var paginaAtual para 1 a menos.
     * Verifica se a @var corte é maior que o limite para evitar páginas negativas.
     * @event click
     */
    uiElementos.botaoAnterior.addEventListener("click", () => {
        if (corte >= LIMIT) {
            corte -= LIMIT; 
            paginaAtual--;
            carregarPaginaAtual();
        }
    });
    /**
     * Sai do modo de busca detalhada e volta para a lista paginada.
     * Restaura a última página sem fazer novas alterações.
     * @event click
     */
    uiElementos.btnVoltarLista.addEventListener("click", (event) => {
        event.preventDefault();
        carregarPaginaAtual();
    });
    // Carrega a primeira página ao abrir o site
    carregarPaginaAtual();
});