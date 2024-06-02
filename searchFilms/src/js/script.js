'use script'

const container = document.querySelector('.container');
const containerSearch = document.querySelector('.container-search');
const btnSearch = document.getElementById('search');
const select = document.getElementById('type-movie');
const perPage = 3; 
let currentPage = 1; 

document.addEventListener('DOMContentLoaded', () => {
    const lastSearchQuery = JSON.parse(localStorage.getItem('lastSearchQuery'));
    const lastSearchResults = JSON.parse(localStorage.getItem('lastSearchResults'));
    const lastTotalItems = localStorage.getItem('lastTotalItems');
    const lastCurrentPage = localStorage.getItem('lastCurrentPage');
    
    if (lastSearchQuery && lastSearchResults) {
        document.getElementById('search-movie-input').value = lastSearchQuery.title;
        select.value = lastSearchQuery.type;
        currentPage = lastCurrentPage ? parseInt(lastCurrentPage) : 1;
        createBlockMovie(lastSearchResults);
        renderPagination(lastTotalItems);
    }
});

btnSearch.addEventListener('click', async function (e) {
    e.preventDefault();
    currentPage = 1; 
    localStorage.removeItem('lastSearchQuery'); 
    localStorage.removeItem('lastSearchResults');
    await showMovie();
});

async function movieSearch(title, type) {
    let response = await fetch(`https://www.omdbapi.com/?s=${title}&type=${type}&apikey=cefde68d`);
    let data = await response.json();
    return data.Search;
}

export async function showMovie() {
    const titleSearch = document.getElementById('search-movie-input');
    const title = titleSearch.value;
    const type = select.value;

    containerSearch.innerHTML = ''; 

    localStorage.setItem('lastSearchQuery', JSON.stringify({ title, type }));

    let listMovie = await movieSearch(title, type);
    
    if (listMovie) {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        const moviesToShow = listMovie.slice(startIndex, endIndex);
        createBlockMovie(moviesToShow);
        renderPagination(listMovie.length);
    } else {
        containerSearch.innerHTML = '';
        const movieNotSearchHTML = `
             <div class="movieSearchNot">
                <p class="info">Enter the name of the movie only in Latin
                There are no results for the given search criteria.</p>
            </div>
        `
        containerSearch.insertAdjacentHTML('beforeend', movieNotSearchHTML);
    }
}


function createBlockMovie(data) {
    if (!data) return;
    containerSearch.innerHTML = '';
    localStorage.setItem('lastSearchResults', JSON.stringify(data)); 
    
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

    localStorage.setItem('lastTotalItems', totalItems);
    localStorage.setItem('lastCurrentPage', currentPage);

    paginationContainer.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', async () => {
            currentPage = parseInt(button.dataset.page);
            await showMovie();
        });
    });
}

 