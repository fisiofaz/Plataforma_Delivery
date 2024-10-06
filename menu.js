let menu = [
    { id: 1, name: 'Pizza de Calabresa', description: 'Deliciosa pizza com calabresa', price: 30.00 },
    { id: 2, name: 'Hambúrguer Artesanal', description: 'Hambúrguer com queijo cheddar', price: 25.00 }
];

let cart = [];

function renderMenu() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';

    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span>Preço: R$ ${item.price.toFixed(2)}</span>
            <button onclick="addToCart(${item.id})">Adicionar ao Pedido</button>
        `;
        menuList.appendChild(menuItem);
    });
}

function addToCart(itemId) {
    const item = menu.find(menuItem => menuItem.id === itemId);
    if (item) {
        cart.push(item);
        alert(`${item.name} foi adicionado ao pedido!`);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Armazena o carrinho no localStorage
}

window.onload = renderMenu;
