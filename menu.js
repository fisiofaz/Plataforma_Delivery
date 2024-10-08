let menu = [
    { id: 1, name: 'Pizza de Calabresa', description: 'Pizza com calabresa e queijo.', price: 30.00 },
    { id: 2, name: 'Hambúrguer Artesanal', description: 'Hambúrguer com queijo e bacon.', price: 25.00 }
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

function addToCart(item, price) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ item, price });
    localStorage.setItem('orders', JSON.stringify(orders));
    alert(`${item} adicionado ao pedido!`);
}

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    fetch('/api/pedidos', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert('Pedido enviado com sucesso!');
        } else {
            alert('Erro ao enviar o pedido.');
        }
    });
});
window.onload = renderMenu;
