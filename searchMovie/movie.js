'use script'
async function getIDMovie(id) {
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=cefde68d`);
    return await res.json()
}
async function showPageMovie() {
    const container = document.querySelector('.container');
    let URLData = new URLSearchParams(window.location.search);
    let id = URLData.get('movie_id');
    let postMovie = await getIDMovie(id);
    const postMovieHTML = `
        <div>
            <div class="film-info">
                    <div class="film-info-img">
                        <img src="${postMovie.Poster}" alt="">
                    </div>
                    <div class="film-info-text">
                        <p>Title:<span>${postMovie.Title}</span></p>
                        <p>Released:<span>${postMovie.Released}</span></p>
                        <p>Genre:<span>${postMovie.Genre}</span></p>
                        <p>Country:<span>${postMovie.Country}</span></p>
                        <p>Director:<span>${postMovie.Director}</span></p>
                        <p>Writer:<span>${postMovie.Writer}</span></p>
                        <p>Actors:<span>${postMovie.Actors}</span></p>
                        <p>Awards:<span>${postMovie.Awards}</span></p>
                    </div>
            </div>
            <a href="/index.html" class="goToSearch">Go to search</a>
        </div>
    `
    container.insertAdjacentHTML('beforeend', postMovieHTML)
}

showPageMovie()
