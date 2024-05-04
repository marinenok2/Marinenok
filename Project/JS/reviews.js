'use script'
const reviewsInternet = document.querySelector('.reviews-internet');

const reviewsItemHTML = `
    <div class="reviews-item">
                    <div class="user">
                    <img src="image/Слой 1517.png" alt="" class="photo-user">
                    <div class="info-user">
                        <h4 class="name-user">Надежда Наширбанова</h4>
                        <p class="date-reviews">5 авг 2017 в 9:58</p>
                    </div>
                    </div>
                    <p class="reviews-text">Спасибо за быструю доставку! Отличный поздний ужин после рабочего дня )</p>
                    <img src="image/Слой 1521.png" alt="" class="reviews-photo">
                    <hr>
                    <div class="likes">
                        <i class="fa-solid fa-heart"></i>
                        
                        <i class="fa-solid fa-message"></i>
                        <span class="count-reviews">2</span>
                        <i class="fa-solid fa-bullhorn"></i>

                    </div>
                    <button class="btn-reviews"> <i class="fa-brands fa-telegram"></i>Подписатся</button>
                </div>
`
for (let i = 0; i < 3; i++) {
    reviewsInternet.insertAdjacentHTML('beforeend', reviewsItemHTML);
}
