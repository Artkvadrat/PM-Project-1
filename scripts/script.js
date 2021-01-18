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
 * Function for checking should mobile button be disabled
 *
 * @param {Number} index of last element that is showing
 * @param {Number} amount of all items that should be shown depending on screen width
 * @param {Number} amount of all elements that should be shown
 * @param {HTML Element} html element that should be changed
 *
 * @return {void} function doesn't return any data. It change innerHTML of container that is received
 */

function disablingMobileCarousel (lastItemIndex, maxAmountOfItems, allItemsAmount, container) {
    if (lastItemIndex === maxAmountOfItems - 1) {
        container.firstElementChild.disabled = true;
        container.firstElementChild.firstElementChild.src = 'images/icons/carouselLeftButtonMobileDisabled.png';
    } else if(lastItemIndex === allItemsAmount-1) {
        container.lastElementChild.disabled = true;
        container.lastElementChild.lastElementChild.src = 'images/icons/carouselRightButtonMobileDisabled.png';
    } else {
        container.firstElementChild.disabled = false;
        container.firstElementChild.firstElementChild.src = 'images/icons/carouselLeftButtonMobile.png';
        container.lastElementChild.disabled = false;
        container.lastElementChild.lastElementChild.src = 'images/icons/carouselRightButtonMobile.png';
    }
}

/*
 * Function that takes data and update showing content on page (carousel)
 *
 * @param newData {Array} data that should be shown
 * @param allItemsAmount {Number} amount of all elements that should be shown
 * @param lastItem {Number} index of last shown element on page
 * @param maxItemsAmount {Number} max amount of showing elements on page depending on screen width
 * @param container {HTML Element} element that will be changed
 * @param mobileContainer {HTML Element} element that transmitted to disablingMobileCarousel function
 * @param leftHandler {String} name of handler function for left arrow
 * @param rightHandler {String} name of handler function for right arrow
 * @param className {String} name of class that is transmitted in getProductItem function for showing labels on the
 *  top of item
 *
 * @return {void} function doesn't return anything, it change innerHTML of container or called another functions
 */

function updateProducts (newData, allItemsAmount, lastItem, maxItemsAmount, container, mobileContainer, leftHandler, rightHandler, className) {
    if (window.innerWidth <= 980) {
        disablingMobileCarousel(lastItem, maxItemsAmount, allItemsAmount, mobileContainer);
    }

    let filling = '';
    filling += `<button onclick="${leftHandler}()" ${lastItem === maxItemsAmount - 1 ? 'disabled' : ''}>\n` +
        `<img src="images/icons/carouselLeftButton${lastItem === maxItemsAmount - 1 ? 'Disabled' : ''}.png" alt="Влево">\n` +
        '          </button>\n' +
        '          <div>'

    newData.map((item) => {
        filling += getProductItem(item, className);
    });

    filling += '</div>\n' +
        `          <button onclick="${rightHandler}()" ${lastItem === allItemsAmount-1 ? 'disabled' : ''}>` +
        `            <img src="images/icons/carouselRightButton${lastItem === allItemsAmount-1 ? 'Disabled' : ''}.png" alt="Влево">\n` +
        '          </button>';

    container.innerHTML = filling;
}

/*
 * New products realisation
 */

try {
    let dataForNewBlock = ITEMS
        .filter((item) => {
        return item.type === 'new';
        })
        .sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
        });

    if (dataForNewBlock.length !== 0) {
        let newProductsContainer = document.getElementsByClassName('newProductItemsBlock')[0];

        let newProductsFilling = '';

        let maxAmountOfItems;

        if (window.innerWidth > 980) {
            maxAmountOfItems = 4;
        } else if (window.innerWidth > 750 && window.innerWidth <= 980) {
            maxAmountOfItems = 3;
        } else {
            maxAmountOfItems = 1;
        }


        if (dataForNewBlock.length <= maxAmountOfItems) {
            newProductsFilling += '<div>\n';

            dataForNewBlock.map((item) => {
                newProductsFilling += getProductItem(item, 'newProductItem');
            });

            newProductsFilling += '</div>';
            newProductsContainer.innerHTML = newProductsFilling;
        } else {
            let mobileCarouselContainer = document.getElementsByClassName('mobileCarousel')[0];

            let newProductShowingData = dataForNewBlock.slice(0,maxAmountOfItems);
            let lastItemIndex = maxAmountOfItems-1;

            updateProducts(newProductShowingData,
                dataForNewBlock.length,
                lastItemIndex,
                maxAmountOfItems,
                newProductsContainer,
                mobileCarouselContainer,
                'newProductsLeftButtonHandler',
                'newProductsRightButtonHandler',
                'newProductItem');

            function newProductsLeftButtonHandler () {
                lastItemIndex--;
                newProductShowingData = dataForNewBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(newProductShowingData,
                    dataForNewBlock.length,
                    lastItemIndex,
                    maxAmountOfItems,
                    newProductsContainer,
                    mobileCarouselContainer,
                    'newProductsLeftButtonHandler',
                    'newProductsRightButtonHandler',
                    'newProductItem');
            }

            function newProductsRightButtonHandler () {
                lastItemIndex++;
                newProductShowingData = dataForNewBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(newProductShowingData,
                    dataForNewBlock.length,
                    lastItemIndex,
                    maxAmountOfItems,
                    newProductsContainer,
                    mobileCarouselContainer,
                    'newProductsLeftButtonHandler',
                    'newProductsRightButtonHandler',
                    'newProductItem');
            }

        }
    } else {
        throw new Error('There is no date for newProducts block');
    }
} catch (e) {
    console.error(e);
}

/*
 * Recommend product realisation
 */

try {
    let dataForRecommendBlock = ITEMS
        .filter((item) => {
            return item.type === 'recommended';
        })
        .sort((a, b) => {
            return a.price - b.price;
        });

    if (dataForRecommendBlock.length !== 0) {
        let recommendProductsContainer = document.getElementsByClassName('recommendProductItemsBlock')[0];

        let recommendProductsFilling = '';

        let maxAmountOfItems;

        if (window.innerWidth > 980) {
            maxAmountOfItems = 4;
        } else if (window.innerWidth > 750 && window.innerWidth <= 980) {
            maxAmountOfItems = 3;
        } else {
            maxAmountOfItems = 1;
        }


        if (dataForRecommendBlock.length <= maxAmountOfItems) {
            recommendProductsFilling += '<div>\n';

            dataForRecommendBlock.map((item) => {
                recommendProductsFilling += getProductItem(item, 'recommendProductItem');
            });

            recommendProductsFilling += '</div>';
            recommendProductsContainer.innerHTML = recommendProductsFilling;
        } else {
            let mobileCarouselContainer = document.getElementsByClassName('mobileCarousel')[1];

            let recommendProductShowingData = dataForRecommendBlock.slice(0,maxAmountOfItems);
            let lastItemIndex = maxAmountOfItems-1;

            updateProducts(recommendProductShowingData,
                dataForRecommendBlock.length,
                lastItemIndex, maxAmountOfItems,
                recommendProductsContainer,
                mobileCarouselContainer,
                'recommendProductsLeftButtonHandler',
                'recommendProductsRightButtonHandler',
                'recommendProductItem');

            function recommendProductsLeftButtonHandler () {
                lastItemIndex--;
                recommendProductShowingData = dataForRecommendBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(recommendProductShowingData,
                    dataForRecommendBlock.length,
                    lastItemIndex, maxAmountOfItems,
                    recommendProductsContainer,
                    mobileCarouselContainer,
                    'recommendProductsLeftButtonHandler',
                    'recommendProductsRightButtonHandler',
                    'recommendProductItem');
            }

            function recommendProductsRightButtonHandler () {
                lastItemIndex++;
                recommendProductShowingData = dataForRecommendBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(recommendProductShowingData,
                    dataForRecommendBlock.length,
                    lastItemIndex, maxAmountOfItems,
                    recommendProductsContainer,
                    mobileCarouselContainer,
                    'recommendProductsLeftButtonHandler',
                    'recommendProductsRightButtonHandler',
                    'recommendProductItem');
            }

        }
    } else {
        throw new Error('There is no date for recommended block');
    }
} catch (e) {
    console.error(e);
}
/*
 * Sale block
 */

try {
    let dataForSaleBlock = ITEMS
        .filter((item) => {
            return item.type === 'sale';
        })
        .sort((a, b) => {
            return (b.oldPrice - b.price) - (a.oldPrice - a.price);
        });

    if (dataForSaleBlock.length !== 0) {
        let saleProductsContainer = document.getElementsByClassName('discountProductItemsBlock')[0];

        let saleProductsFilling = '';

        let maxAmountOfItems;

        if (window.innerWidth > 980) {
            maxAmountOfItems = 4;
        } else if (window.innerWidth > 750 && window.innerWidth <= 980) {
            maxAmountOfItems = 3;
        } else {
            maxAmountOfItems = 1;
        }


        if (dataForSaleBlock.length <= maxAmountOfItems) {
            saleProductsFilling += '<div>\n';

            dataForSaleBlock.map((item) => {
                saleProductsFilling += getProductItem(item, 'discountProductItem');
            });

            saleProductsFilling += '</div>';
            saleProductsContainer.innerHTML = saleProductsFilling;
        } else {
            let mobileCarouselContainer = document.getElementsByClassName('mobileCarousel')[2];

            let saleProductShowingData = dataForSaleBlock.slice(0,maxAmountOfItems);
            let lastItemIndex = maxAmountOfItems-1;

            updateProducts(saleProductShowingData,
                dataForSaleBlock.length,
                lastItemIndex,
                maxAmountOfItems,
                saleProductsContainer,
                mobileCarouselContainer,
                'saleProductsLeftButtonHandler',
                'saleProductsRightButtonHandler',
                'discountProductItem');

            function saleProductsLeftButtonHandler () {
                lastItemIndex--;
                saleProductShowingData = dataForSaleBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(saleProductShowingData,
                    dataForSaleBlock.length,
                    lastItemIndex,
                    maxAmountOfItems,
                    saleProductsContainer,
                    mobileCarouselContainer,
                    'saleProductsLeftButtonHandler',
                    'saleProductsRightButtonHandler',
                    'discountProductItem');
            }

            function saleProductsRightButtonHandler () {
                lastItemIndex++;
                saleProductShowingData = dataForSaleBlock.slice(lastItemIndex-(maxAmountOfItems-1), lastItemIndex+1);
                updateProducts(saleProductShowingData,
                    dataForSaleBlock.length,
                    lastItemIndex,
                    maxAmountOfItems,
                    saleProductsContainer,
                    mobileCarouselContainer,
                    'saleProductsLeftButtonHandler',
                    'saleProductsRightButtonHandler',
                    'discountProductItem');
            }

        }
    } else {
        throw new Error('There is no date for sale block');
    }
} catch (e) {
    console.error(e);
}