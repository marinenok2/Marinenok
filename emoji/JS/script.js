
'use strict';
const container = document.querySelector('.container');
const selectCategory = document.querySelector('#category');
const selectGroup = document.querySelector('#group');
const emojiBlock = document.querySelector('.emojiBlock');
const paginationContainer = document.querySelector('.pagination');

let allEmojis = []; 
let emojisByCategory = {}; 
let emojisByGroup = {}; 
const perPage = 45; 
let currentPage = 1;

emojihub();

async function emojihub() {
    let response = await fetch('https://emojihub.yurace.pro/api/all');
    let data = await response.json();

    data.forEach(emoji => {
        let category = emoji.category.toLowerCase();
        let group = emoji.group.toLowerCase();
        
        allEmojis.push(emoji);
        
        if (!emojisByCategory[category]) {
            emojisByCategory[category] = [];
        }
        emojisByCategory[category].push(emoji);
        
        if (!emojisByGroup[group]) {
            emojisByGroup[group] = [];
        }
        emojisByGroup[group].push(emoji);
    });

    let categories = Object.keys(emojisByCategory).sort();

    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        selectCategory.appendChild(option);
    });
    selectCategory.addEventListener('change', displayEmojisByCategory);

    let groups = Object.keys(emojisByGroup).sort();

    groups.forEach(group => {
        let option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        selectGroup.appendChild(option);
    });
    selectGroup.addEventListener('change', displayEmojisByGroup);

    displayEmojisByCategory();
}

function displayEmojis(emojisToDisplay) {
    emojiBlock.innerHTML = '';

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, emojisToDisplay.length);
    const emojisOnPage = emojisToDisplay.slice(startIndex, endIndex);

    emojisOnPage.forEach(emoji => {
        unicode(emoji);
    });

    emojiBlock.querySelectorAll('div').forEach(div => {
        div.addEventListener('click', showEmojiInfo);
    });

    renderPagination(emojisToDisplay.length);
}

function displayEmojisByCategory() {
    let selectedCategory = selectCategory.value.toLowerCase();
    let emojisToDisplay = emojisByCategory[selectedCategory];
    
    currentPage = 1;
    displayEmojis(emojisToDisplay);
}

function displayEmojisByGroup() {
    let selectedGroup = selectGroup.value.toLowerCase();
    let emojisToDisplay = emojisByGroup[selectedGroup];
    
    currentPage = 1;
    displayEmojis(emojisToDisplay);
}

function showEmojiInfo(event) {
    let emojiInfoData = JSON.parse(event.target.getAttribute('data-emoji-info')); 
    let emojiInfo = document.querySelector('.emoji-info');
    let selectedEmojis = document.querySelector('.selected-emojis')
    let emojiHTMLCode = document.createElement('p');
    emojiInfo.innerHTML = '';
    
    if (emojiInfoData) {
        let emojiInfoHTML = `
        <div class="info">
            <p>Name: ${emojiInfoData.name}</p>
            <p>Category: ${emojiInfoData.category}</p>
            <p>Group: ${emojiInfoData.group}</p>
            <p>HtmlCode: ${emojiInfoData.htmlCode}</p>
            <p>Unicode: ${emojiInfoData.unicode}</p>
        </div>
        `;
        emojiInfo.insertAdjacentHTML('beforeend', emojiInfoHTML);
        emojiHTMLCode.innerHTML = emojiInfoData.htmlCode[0];
        selectedEmojis.appendChild(emojiHTMLCode)
    }

}

function unicode(emoji) {
    let hex = emoji.unicode[0].substring(2);
    let dec = parseInt(hex, 16); 
    let emojiSymbol = String.fromCodePoint(dec);
    
    let unicodeDiv = document.createElement('div');
    unicodeDiv.textContent = emojiSymbol;
    unicodeDiv.setAttribute('data-emoji-info', JSON.stringify(emoji)); 
    emojiBlock.appendChild(unicodeDiv);
}

function renderPagination(totalItems) {
    const totalPages = totalItems / perPage;
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    paginationContainer.innerHTML = paginationHTML;
    paginationContainer.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.dataset.page);
            displayEmojisByCategory();

        });
    });
}

selectCategory.addEventListener('change', () => {
    currentPage = 1;
    displayEmojisByCategory();
});
function displayEmojisByCategory() {
    let selectedCategory = selectCategory.value.toLowerCase();
    let emojisToDisplay = emojisByCategory[selectedCategory];
    
    displayEmojis(emojisToDisplay);
}








