/*
 * Data for top menu from config file
 */
try {
    if (Object.keys(TOP_MENU).length !== 0) {
        let topMenuContainer = document.getElementsByClassName('navigation')[0];

        let dataForTopMenu = Object.values(TOP_MENU).sort((a, b) => {
            return a.order - b.order;
        });

        let topMenuFilling = '<ul>';
        let amountOfMenuItems = Math.min(9, dataForTopMenu.length);
        for (let i = 0; i < amountOfMenuItems; i++) {
            let result = '<li>';
            if (dataForTopMenu[i].submenu) {
                result += `<p class="dropdownMenu">${dataForTopMenu[i].title}</p><div>`;
                dataForTopMenu[i].submenu.map((subMenuItem) => {
                    result += `<a href="${subMenuItem.url}">${subMenuItem.title}</a>`;
                });
                result += '</div>'
            } else {
                result += `<a href="${dataForTopMenu[i].url}">${dataForTopMenu[i].title}</a>`
            }
            result += '</li>';
            topMenuFilling += result;
        }
        topMenuFilling += '</ul>';

        topMenuContainer.innerHTML = topMenuFilling;
    } else {
        throw new Error('There is no data for top menu');
    }
} catch (e) {
    console.error(e);
}


/*
 * Data for cart
 */

let cart = document.getElementsByClassName('cartMain')[0];
if (BASKET.elements && BASKET.price) {
    cart.childNodes[3].innerText = `${BASKET.elements} / ${BASKET.price}${CURRENCY === 'UAH' ? 'грн.' : 'р.'}`;
} else {
    cart.childNodes[1].innerText = 'КОРЗИНА ПУСТА'
}

/*
 * Catalog menu realisation
 */

try {
    if (MENU.length !== 0) {
        let catalogMenuContainer = document.getElementsByClassName('catalogMenu')[0];

        let dataForCatalogMenu = MENU.sort((a, b) => {
            return a.order - b.order;
        });

        let catalogMenuFilling = '';

        if (dataForCatalogMenu.length >= 1 && dataForCatalogMenu.length <= 10) {
            catalogMenuFilling += '<ul>';
            dataForCatalogMenu.map((item) => {
                catalogMenuFilling += `<li class="catalogMenuItem">
                <a href="${item.url}">
                  ${item.title}
                </a>
              </li>`
            });
            catalogMenuFilling += '</ul>';
            catalogMenuContainer.innerHTML = catalogMenuFilling;
        } else {
            let catalogMenuShowingData = dataForCatalogMenu.slice(0,10);
            let lastItemIndex = 9;

            updateCatalogMenu(catalogMenuShowingData);

            function updateCatalogMenu (data) {
                catalogMenuFilling = '';

                if (lastItemIndex === 9) {
                    catalogMenuFilling += '<ul>\n'
                } else {
                    catalogMenuFilling += '<ul>\n' +
                        '          <li class="catalogMenuButton">\n' +
                        '            <button onclick="catalogMenuLeftButtonHandler(event)">\n' +
                        '              <img src="images/icons/catalogLeftButton.png" alt="Меню каталога влево">\n' +
                        '            </button>\n' +
                        '          </li>';
                }

                data.map((item) => {
                    catalogMenuFilling += `<li class="catalogMenuItem">
                <a href="${item.url}">
                  ${item.title}
                </a>
              </li>`
                });


                if (lastItemIndex === dataForCatalogMenu.length-1) {
                    catalogMenuFilling += '        </ul>';
                } else {
                    catalogMenuFilling += '<li class="catalogMenuButton">\n' +
                        '            <button onclick="catalogMenuRightButtonHandler(event)">\n' +
                        '              <img src="images/icons/catalogRightButton.png" alt="Меню каталога влево">\n' +
                        '            </button>\n' +
                        '          </li>\n' +
                        '        </ul>';
                }


                catalogMenuContainer.innerHTML = catalogMenuFilling;

            }

            function catalogMenuLeftButtonHandler () {
                lastItemIndex--;
                catalogMenuShowingData = dataForCatalogMenu.slice(lastItemIndex-9, lastItemIndex+1);
                updateCatalogMenu(catalogMenuShowingData);

            }

            function catalogMenuRightButtonHandler () {
                lastItemIndex++;
                catalogMenuShowingData = dataForCatalogMenu.slice(lastItemIndex-9, lastItemIndex+1);
                updateCatalogMenu(catalogMenuShowingData);
            }
        }

    } else {
        throw new Error('There is no data for menu');
    }
} catch (e) {
    console.error(e);
}

/*
 * News column realisation
 */

try {
    if (NEWS.length !== 0) {
        let newsColumnContainer = document.getElementsByClassName('newsContainer')[0];

        let randomNewsIndexes = [];

        while (randomNewsIndexes.length !== 3) {
            let randomNumber = Math.floor(Math.random() * NEWS.length);
            if (randomNewsIndexes.indexOf(randomNumber) === -1) {
                randomNewsIndexes.push(randomNumber);
            }
        }

        let newsColumnFilling = '';
        let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        randomNewsIndexes.map((item) => {
            let date = NEWS[item].date[8]+NEWS[item].date[9];
            let monthNumber = Number(NEWS[item].date[5]+NEWS[item].date[6]);
            newsColumnFilling += `<div class="newsColumnItem">
              <div class="newsColumnItemImg">
                <img src="${NEWS[item].img}"
                     alt="${NEWS[item].title}">
                <p>${date}</p>
                <p>${months[monthNumber-1]}</p>
              </div>
              <div class="newsColumnItemInfo">
                <a href="${NEWS[item].url}">${NEWS[item].title}</a>
                <p>${NEWS[item].description}</p>
              </div>
            </div>`
        });

        newsColumnContainer.innerHTML = newsColumnFilling;
    } else {
        throw new Error ('There is no data for news column')
    }
} catch (e) {
    console.error(e);
}

/*
 * Function to return an item block.
 *
 * @param {object} object that contains data
 * @param {string} string that show class for :before element
 * @return {string} html string
 */

function getProductItem (data, className) {
    return `<div class="productItem ${className}">
                <a href="${data.url}">
                    <div class="productItemImg">
                        <img src="${data.img || 'images/IP телефон 2.png'}" alt="${data.description}">
                    </div>
                    <a href="${data.url}">${data.description}</a>
                    <div class="productItemPriceBlock">
                        <p>Цена:</p>
                        <p class="price">${data.price} ${data.currency === 'UAH' && data.price ? 'грн.' : ''} ${data.currency === 'RUB' && data.price ? 'р.' : ''}</p>
                        <p class="oldPrice">${data.oldPrice ? data.oldPrice : ''} ${data.currency === 'UAH' && data.oldPrice && data.price ? 'грн.' : ''}${data.currency === 'RUB' && data.oldPrice && data.price ? 'р.' : ''}</p>
                    </div>
                    <div class="productItemBuyLine">
                        <button class="productItemBuyButton">
                        <img src="images/icons/foodBasket.png" alt="купить">
                            купить
                        </button>
                        <a href="${data.url}">Подробнее</a>
                    </div>
                </a>
            </div>`;
}

/*
 * New products realisation
 */

try {
    let data = ITEMS
        .filter((item) => {
        return item.type === 'new';
        })
        .sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
        });

    if (data.length !== 0) {
        let newProductsContainer = document.getElementsByClassName('newProductItemsBlock')[0];

        let newProductsFilling = '';

        if (data.length <= 4) {
            newProductsFilling += '<div>\n';

            data.map((item) => {
                newProductsFilling += getProductItem(item, 'newProductItem');
            });

            newProductsFilling += '</div>';
            newProductsContainer.innerHTML = newProductsFilling;
        } else {
            let newProductShowingData = data.slice(0,4);
            let lastItemIndex = 3;

            updateNewProducts(newProductShowingData, data.length);

            function updateNewProducts (newData, allItemsAmount) {
                newProductsFilling = '';
                newProductsFilling += `<button onclick="productsLeftButtonHandler()" ${lastItemIndex === 3 ? 'disabled' : ''}>\n` +
                               `<img src="images/icons/carouselLeftButton${lastItemIndex === 3 ? 'Disabled' : ''}.png" alt="Влево">\n` +
                    '          </button>\n' +
                    '          <div>'

                newData.map((item) => {
                    newProductsFilling += getProductItem(item, 'newProductItem');
                });

                newProductsFilling += '</div>\n' +
                    `          <button onclick="productsRightButtonHandler()" ${lastItemIndex === allItemsAmount-1 ? 'disabled' : ''}>` +
                    `            <img src="images/icons/carouselRightButton${lastItemIndex === allItemsAmount-1 ? 'Disabled' : ''}.png" alt="Влево">\n` +
                    '          </button>';

                newProductsContainer.innerHTML = newProductsFilling;
            }

            function productsLeftButtonHandler () {
                lastItemIndex--;
                newProductShowingData = data.slice(lastItemIndex-3, lastItemIndex+1);
                updateNewProducts(newProductShowingData, data.length);
            }

            function productsRightButtonHandler () {
                lastItemIndex++;
                newProductShowingData = data.slice(lastItemIndex-3, lastItemIndex+1);
                updateNewProducts(newProductShowingData, data.length);
            }

        }
    } else {
        throw new Error('There is no date for newProducts block');
    }
} catch (e) {
    console.error(e);
}


