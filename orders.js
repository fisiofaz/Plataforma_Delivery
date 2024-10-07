let orders = [];

function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        ordersList.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <h3>${item.name}</h3>
            <span>Preço: R$ ${item.price.toFixed(2)}</span>
        `;
        ordersList.appendChild(orderItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    ordersList.innerHTML += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

function submitOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    const newOrder = {
        id: orders.length + 1,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        status: 'Recebido'
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart'); 
    alert('Pedido enviado com sucesso!');
    renderOrders();
}

window.onload = renderOrders;
