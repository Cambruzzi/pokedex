/**
 * Busca os detalhes de um único Pokémon dada uma URL ou ID.
 * @param {string} url - A URL completa do Pokémon ou endpoint.
 * @returns {Promise<Object>} - O objeto JSON com os dados do Pokémon.
 */
export async function fetchPokemon(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
}

/**
 * Busca uma lista paginada de Pokémons e, em seguida, busca os detalhes de cada um.
 * @param {number} limit - Quantidade de itens por página (padrão 20).
 * @param {number} offset - Quantidade de itens a pular (padrão 0).
 * @returns {Promise<Array>} - Lista contendo os objetos detalhados dos Pokémons.
 */
export async function fetchPokemonList(limit = 20, offset = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Não foi possível buscar a lista de Pokémon.");
    }
    const data = await response.json();
    const promises = data.results.map(pokemon => fetchPokemon(pokemon.url));
    const detailedPokemonList = await Promise.all(promises);
    return detailedPokemonList;
}

/**
 * Exibe uma mensagem de erro na interface e esconde os resultados.
 * @param {string} message - A mensagem para o usuário.
 * @param {Object} uiElementos - Objeto contendo os elementos do DOM.
 */
export function mostraErro(message, uiElementos) {
    if (uiElementos.erro) {
        uiElementos.erro.textContent = message;
        uiElementos.erro.style.display = "flex";
    }
    if (uiElementos.resultado) {
        uiElementos.resultado.style.display = "none";
    }
    if (uiElementos.listaContainer) {
        uiElementos.listaContainer.style.display = "none";
    }
}