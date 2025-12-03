/**
 * @description Responsável por criar os elementos HTML (DOM) dos cards de Pokémon
 * e renderizá-los na tela.
 */

/**
 * Gera a URL completa para consultar a API da PokeAPI.
 * @param {string|number} pokemonIdentificacao - O nome ou número do Pokémon.
 * @returns {string} - A URL formatada para o endpoint v2/pokemon.
 */
export function criaURL(pokemonIdentificacao) {
    return `https://pokeapi.co/api/v2/pokemon/${pokemonIdentificacao}`;
}

/**
 * Função cria o elemento HTML visual de um card.
 * Constrói a estrutura DOM (li > img, div, div > ul, h4), aplica classes CSS
 * e adiciona o evento de clique para expansão.
 * * @param {Object} pokemonDados - O objeto JSON cru retornado pela PokeAPI.
 * @returns {HTMLLIElement} - O elemento <li> construído e pronto para ser anexado.
 */
function criaCardPokemon(pokemonDados) {
    const li = document.createElement("li");
    li.className = "pokemon-item cursor-pointer";
    li.title = "Clique para ver detalhes";
    const imagem = document.createElement("img");
    imagem.className = "pokemon-item-sprite";
    imagem.src = pokemonDados.sprites.other?.['official-artwork']?.front_default || pokemonDados.sprites.front_default;
    imagem.alt = pokemonDados.name;
    const cabecalho = document.createElement("div");
    cabecalho.className = "pokemon-header-info";
    const nome = document.createElement("h3");
    nome.className = "pokemon-item-nome";
    nome.textContent = pokemonDados.name;
    const id = document.createElement("span");
    id.className = "pokemon-item-id";
    id.textContent = `#${pokemonDados.id}`;
    cabecalho.append(nome, id);
    const detalhesPokemon = document.createElement("div");
    detalhesPokemon.className = "pokemon-item-detalhes";
    const tiposLista = document.createElement("ul");
    tiposLista.className = "pokemon-item-tipos";

    pokemonDados.types.forEach(tipoInfo => {
        const tipoLi = document.createElement("li");
        tipoLi.className = `tipo-${tipoInfo.type.name}`;
        tipoLi.textContent = tipoInfo.type.name;
        tiposLista.appendChild(tipoLi);
    });
    const peso = document.createElement("h4");
    peso.className = "pokemon-item-info";
    peso.textContent = `Peso: ${(pokemonDados.weight / 10)} kg`;
    const altura = document.createElement("h4");
    altura.className = "pokemon-item-info";
    altura.textContent = `Altura: ${(pokemonDados.height / 10)} m`;
    detalhesPokemon.append(tiposLista, peso, altura);
    li.append(imagem, cabecalho, detalhesPokemon);
    li.addEventListener("click", function() {
        this.classList.toggle("expandido");
    });
    return li;
}

/**
 * Função principal de renderização.
 * Limpa o container alvo e insere os cards gerados, lidando tanto com 
 * um único Pokémon quanto com uma lista de Pokémons.
 * * @param {Array|Object} dados - Um array de objetos Pokémon (lista) OU um único objeto Pokémon.
 * @param {HTMLElement} container - O elemento HTML onde os cards serão inseridos (ex: <ul>).
 */
export function montaPokemonCard(dados, container) {
    container.innerHTML = "";
    if (Array.isArray(dados)) {
        dados.forEach(pokemon => {
            container.appendChild(criaCardPokemon(pokemon));
        });
    } else {
        container.appendChild(criaCardPokemon(dados));
    }
    container.style.display = "grid";
}