const items = [{
        title: "Австрия",
        description: "Центр горнолыжного туризма!",
        price: 590,
        img: "./img/austria_1.jpg",
        rating: 4.0,
    },
    {
        title: "Великобритания",
        description: "Страна активного отдыха!",
        price: 940,
        img: "./img/great-britain_2.jpg",
        rating: 3.6,
    },
    {
        title: "Грузия",
        description: "Страна гор, вина и потрясающего гостеприимства!",
        price: 360,
        img: "./img/georgia_3.jpg",
        rating: 5.1,
    },
    {
        title: "Италия",
        description: "Богатая культура, история и изысканная кухня!",
        price: 665,
        img: "./img/italy_4.jpg",
        rating: 4.3,
    },
    {
        title: "Куба",
        description: "Остров сальсы и рома",
        price: 1400,
        img: "./img/cuba_5.jpg",
        rating: 3.8,
    },
    {
        title: "Новая Зеландия",
        description: "Страна длинного белого облака!",
        price: 1320,
        img: "./img/new-zealand-6.jpg",
        rating: 4.0,
    },
    {
        title: "Перу",
        description: "Одно из самых загадочных мест на земле!",
        price: 1890,
        img: "./img/peru_7.jpg",
        rating: 3.7,
    },
    {
        title: "Сингапур",
        description: "Невероятно зеленый город",
        price: 2600,
        img: "./img/singapore_8.jpg",
        rating: 4.2,
    },
    {
        title: "Таиланд",
        description: "Идеальное место для отдыха!",
        price: 1520,
        img: "./img/thailand_9.jpg",
        rating: 5.0,
    },
    {
        title: "Черногория",
        description: "Молодая страна с богатым событиями прошлым!",
        price: 840,
        img: "./img/montenegro_10.jpg",
        rating: 4.5,
    },
    {
        title: "Корея",
        description: "Белоснежные пляжи, целебные минеральные источники, развитая экономика!",
        price: 3450,
        img: "./img/korea_11.jpg",
        rating: 3.9,
    },
    {
        title: "Япония",
        description: "Страна из тысячи островов!",
        price: 3800,
        img: "./img/japan_12.jpg",
        rating: 4.7,
    },
];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const shopItems = document.getElementById('shop-items');
const nothingFound = document.getElementById('nothing-found');
const sortSelect = document.getElementById('sort');
const itemTemplate = document.getElementById('item-template').content;

let currentItems = [...items];

function renderItems(itemList) {
    shopItems.innerHTML = '';
    if (itemList.length === 0) {
        nothingFound.style.display = 'block';
    } else {
        nothingFound.style.display = 'none';
        itemList.forEach(item => {
            const itemNode = itemTemplate.cloneNode(true);
            itemNode.querySelector('img').src = item.img;
            itemNode.querySelector('h1').textContent = item.title;
            itemNode.querySelector('p').textContent = item.description;
            itemNode.querySelector('.price').textContent = `$${item.price}`;
            itemNode.querySelector('.rating').textContent = `Rating: ${item.rating}`;
            shopItems.appendChild(itemNode);
        });
    }
}


function filterItems(searchText) {
    searchText = searchText.toLowerCase();
    return items.filter(item =>
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
    );
}


function sortItems(sortType, itemList) {
    switch (sortType) {
        case 'alphabet':
            return [...itemList].sort((a, b) => a.title.localeCompare(b.title));
        case 'expensive':
            return [...itemList].sort((a, b) => b.price - a.price);
        case 'cheap':
            return [...itemList].sort((a, b) => a.price - b.price);
        case 'rating':
            return [...itemList].sort((a, b) => b.rating - a.rating);
        default:
            return itemList;
    }
}


function handleSearch() {
    const searchText = searchInput.value.trim();
    if (!searchText) {
        currentItems = [...items];
        sortSelect.value = 'alphabet';
    } else {
        currentItems = filterItems(searchText);
    }
    currentItems = sortItems(sortSelect.value, currentItems);
    renderItems(currentItems);
}


searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

sortSelect.addEventListener('change', () => {
    currentItems = sortItems(sortSelect.value, currentItems);
    renderItems(currentItems);
});


renderItems(currentItems);