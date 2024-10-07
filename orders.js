let orders = [];
let orderStatus = ['Recebido', 'Em Preparação', 'A Caminho', 'Entregue'];
let currentStatusIndex = 0;

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
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
        `;
        ordersList.appendChild(orderItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    ordersList.innerHTML += `<h3>Total: <span> R$ ${total.toFixed(2)} </span></h3>`;
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

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Limpa a lista anterior

    if (orders.length === 0) {
        orderList.innerHTML = '<p>Nenhum pedido ainda!</p>';
    } else {
        orders.forEach((order, index) => {
            let orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `<p>${order.item} - <span> R$ ${order.price.toFixed(2)}</span> </p>`;
            orderList.appendChild(orderItem);
        });
    }
}

function changeOrderStatus() {
    currentStatusIndex = (currentStatusIndex + 1) % orderStatus.length;
    notifyCustomer(orderStatus[currentStatusIndex]);
    loadOrders();
}

function finalizeOrder() {
    alert("Pedido finalizado com sucesso!");
    localStorage.removeItem('orders');
    loadOrders(); // Recarrega a lista para lim
}

function notifyCustomer(status) {
    let notificationArea = document.getElementById('notification-area');
    let notificationMessage = document.getElementById('notification-message');
    notificationMessage.innerText = `Seu pedido agora está: ${status}`;

    notificationArea.style.display = 'block';
    setTimeout(() => {
        notificationArea.style.display = 'none';
    }, 3000); // Exibe a notificação por 3 segundos
}

window.onload = loadOrders;