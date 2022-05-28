const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; // Armazenar as informações resgatadas do endpoint acima.
fetch(endpoint)
    .then((res) => res.json()) // http response: Converte os dados que foram recuperados do endpoint para json.
    .then((data) => cities.push(...data)); // Recupera os dados do endpoint e armazena na array cities.
function findMatches(wordToMatch, cities) {
    // Função para buscar as cidades que incluem a palavra buscada passada como 1o parametro.
    return cities.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi'); // String que será passada como váriavel na função .match, com as flags Global e Case 'insensitível'
        return place.city.match(regex) || place.state.match(regex);
    });
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
    const matchArray = findMatches(this.value, cities); // this.value referencia o valor que está sendo digitado na classe .search (searchInput)
    const html = matchArray
        .map((place) => {
            // Para cada lugar compativel, criar um elemento li com as suas devidas informações (propriedades)
            const regex = new RegExp(this.value, 'gi'); // Procura o this.value no ajax, e substitue no metodo .replace abaixo.
            const cityName = place.city.replace(
                regex,
                (match) => `<span class="hl">${match}</span>`
            );

            const stateName = place.state.replace(
                regex,
                (match) => `<span class="hl">${match}</span>`
            );
            return ` 
          <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">
              <small>population</small><br/>
              ${Number(place.population).toLocaleString()}</span>
            </li>
          `;
        })
        .join(''); // Altera de uma array para uma string

    suggestions.innerHTML = html;
    if (!searchInput.value) {
        suggestions.innerHTML = `<li>Filter for a city</li><li>or a state</li>`;
    }
}

searchInput.addEventListener('input', displayMatches); // Toda vez que uma tecla volta ao estado normal (keyup), chama a função displayMatches