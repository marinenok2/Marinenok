'use script'

const container = document.querySelector('.container');
const containerSearch = document.querySelector('.container-search');
const btnSearch = document.getElementById('search');
const select = document.getElementById('type-movie');
const perPage = 3; 
let currentPage = 1; 

btnSearch.addEventListener('click', async function (e) {
    e.preventDefault();
    currentPage = 1; 
    await showMovie();
});

async function movieSearch(title, type) {
    let response = await fetch(`http://www.omdbapi.com/?s=${title}&type=${type}&apikey=cefde68d`);
    let data = await response.json();
    console.log(data)
    return data.Search;
}

async function showMovie() {
    const titleSearch = document.getElementById('search-movie-input');
    const title = titleSearch.value;
    const type = select.value;

    containerSearch.innerHTML = ''; 

    let listMovie = await movieSearch(title, type);
    
    if (listMovie) {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const moviesToShow = listMovie.slice(startIndex, endIndex);
        createBlockMovie(moviesToShow);
        renderPagination(listMovie.length);
    } else {
        const movieNotSearchHTML = `
             <div class="movieSearchNot">
                <p class="info">Немає результатів для введених критеріїв пошуку.</p>
            </div>
        `
        containerSearch.insertAdjacentHTML('beforeend', movieNotSearchHTML);
    }
}


function createBlockMovie(data) {
    if (!data) return;
    
    data.forEach(item => {
        const movieSearchHTML = `
            <div class="movie">
                <img src="${item.Poster}" alt="${item.Title}">
                <div class="info">
                    <p>${item.Type}</p>
                    <h3>${item.Title}</h3>
                    <p>${item.Year}</p>
                    <a class="btn-details" data-details="info" href="movie.html?movie_id=${item.imdbID}">Details</a>
                </div>
            </div>
        `;
        containerSearch.insertAdjacentHTML('beforeend', movieSearchHTML);
    });
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / perPage);
    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = paginationHTML;

    paginationContainer.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.dataset.page);
            showMovie();
        });
    });
}

 