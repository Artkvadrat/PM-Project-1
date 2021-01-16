/*
 * Data for top menu from config file
 */
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

/*
 * Data for cart
 */

let cart = document.getElementsByClassName('cartMain')[0].childNodes[3];
cart.innerText = `${BASKET.elements} / ${BASKET.price}${CURRENCY === 'UAH' ? 'грн.' : 'р.'}`