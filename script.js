const pokeContainer = document.querySelector("#pokeContainer");
const searchInput = document.querySelector("#search");  // Pegando o input de pesquisa
const pokemonCount = 151;
const music = document.querySelector("#background-music");
const volumeIcon = document.querySelector("#volume-icon");

// Inicializa o volume da música
music.volume = 0.05;

// Alterna entre ativar/desativar música
volumeIcon.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        volumeIcon.textContent = "🔊"; // Ícone de som
    } else {
        music.pause();
        volumeIcon.textContent = "🔇"; // Ícone de mudo
    }
});

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

let lastScrollTop = 0; // Variável para controlar a direção do scroll

// Função para gerenciar o scroll
document.addEventListener('scroll', function() {
    const header = document.querySelector('.header'); // Seleciona a faixa inteira
    const currentScroll = window.scrollY;

    // Se o usuário rolar para baixo, a faixa desaparece
    if (currentScroll > lastScrollTop) {
        header.classList.add('hide-header');
    } else {
        header.classList.remove('hide-header');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Função para buscar os Pokémons
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
       await getPokemons(i);
    }
}

// Função para obter os dados de cada Pokémon
const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
}

// Função para criar o card de cada Pokémon
const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = pokeTypes.join(" / ");
    const mainType = pokeTypes[0]; // Corrigido para pegar o primeiro tipo como principal
    const color = colors[mainType] || '#F5F5F5'; // Garantir que sempre tenha uma cor

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;

    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
};

// Função para filtrar Pokémons pelo nome
const filterPokemons = () => {
    const searchQuery = searchInput.value.toLowerCase();
    const allCards = pokeContainer.querySelectorAll('.pokemon');

    allCards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();

        // Exibe ou esconde o card baseado na pesquisa
        if (name.includes(searchQuery)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
};

// Chama a função para buscar os Pokémons
fetchPokemons();

// Evento para filtrar os Pokémons enquanto digita na barra de pesquisa
searchInput.addEventListener('input', filterPokemons);
