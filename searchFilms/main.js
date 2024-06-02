import './src/css/style.css'
import { showMovie } from './src/js/script';

document.getElementById('search').addEventListener('click', async function (e) {
    e.preventDefault();
    await showMovie();
});


