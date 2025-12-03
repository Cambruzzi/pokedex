/**
 * Valida e formata a entrada do usuário para ser compatível com a PokeAPI.
 * @param {string} pokemonDigitado - O texto bruto digitado pelo usuário.
 * @returns {Object} - Objeto contendo erro ou os dados formatados.
 */


export function validaInput(pokemonDigitado) {
    const entradaLimpa = pokemonDigitado.trim();
    if (entradaLimpa === "") {
        return { error: "Por favor, digite o nome ou número do Pokémon." };
    }
    const temLetras = /[a-zA-Z]/.test(entradaLimpa);
    const temNumeros = /[0-9]/.test(entradaLimpa);
    const temEspaco = /\s/.test(entradaLimpa);
    if (temLetras && temNumeros && temEspaco) {
        return { error: "Erro: Digite apenas o nome (ex: Porygon) OU apenas o número (ex: 137)." };
    }
    // Formatação para a API regex
    const pokemonFinalParaAPI = entradaLimpa
        .replace(/[^a-zA-Z0-9 -]/g, '') // Remove caracteres especiais 
        .replace(/\s+/g, '-')           // Troca espaços por hífens 
        .replace(/-+/g, '-')            // Remove hífens duplicados 
        .toLowerCase();
    if (pokemonFinalParaAPI === "") {
        return { error: "Entrada inválida. Use apenas letras e números." };
    }
    return { 
        pokemonFinalParaAPI, 
        pokemonDigitado 
    };
}