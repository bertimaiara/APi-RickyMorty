const urlApi = "https://rickandmortyapi.com/api/character/";
const listCharacters = document.getElementById('list');
let nextUrl = '';
let prevUrl = '';

const getCharacters = async (url, name = '') => {
    if(name !== ''){
        var response = await fetch(`${url}?name=${name}`)
    }else{
        var response = await fetch(url)
    }
    
    const data = await response.json();
    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    const characters = data.results;
    render(characters);
}

const searchCharacters = (event) => {
    event.preventDefault();
    const name = document.querySelector('input').value;
    getCharacters(urlApi, name);
}

const render = (characters) => {
    listCharacters.innerHTML = "";
  
    characters.forEach((character, index) => {
      if (index % 2 === 0) {
        // Inicia uma nova linha a cada dois cards
        listCharacters.insertAdjacentHTML("beforeend", `<div class="card-row">`);
      }
      listCharacters.insertAdjacentHTML(
        "beforeend",
        `
        <div class='card'>
          <div id="cardBody" class="card-img">
            <img src="${character.image}" alt='${character.name}'/>
          </div><div id="cardBody" class="card-body">
            <h2>${character.name}</h2>
            <p>${character.status} - ${character.species}</p>
            <p style="color: gray;">Última localização conhecida</p>
            <p><strong>${character.location.name}</strong></p>
            <p style="color: gray;">Visto a última vez em</p>
            <p>Nome do capítulo</p>
          </div>
        </div>
      `
      );
  
      if (index % 2 !== 0 || index === characters.length - 1) {
        // Fecha a linha após cada par de cards ou no último card
        listCharacters.insertAdjacentHTML("beforeend", `</div>`);
      }
    });
  };
  
  

const nextPage = () => {
    getCharacters(nextUrl);
}

const previousPage = () => {
    getCharacters(prevUrl);
}

getCharacters(urlApi);