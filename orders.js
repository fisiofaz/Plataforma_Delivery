// Lista inicial de pedidos (mock de dados)
let orders = [
    {
        id: 1,
        customer: 'João Silva',
        items: 'Pizza de Calabresa, Coca-Cola',
        total: 35.90,
        status: 'Recebido'
    },
    {
        id: 2,
        customer: 'Maria Oliveira',
        items: 'Hambúrguer, Batata Frita',
        total: 28.50,
        status: 'Preparando'
    }
];

// Função para renderizar a lista de pedidos
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = ''; // Limpa a lista antes de renderizar

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');

        const orderInfo = `
            <div class="order-info">
                <strong>Cliente: </strong> ${order.customer}
                <span>Itens: ${order.items}</span>
                <span>Total: R$ ${order.total.toFixed(2)}</span>
            </div>
        `;

        const orderStatus = `
            <div class="order-status">
                <strong>Status: </strong>
                <select data-id="${order.id}">
                    <option value="Recebido" ${order.status === 'Recebido' ? 'selected' : ''}>Recebido</option>
                    <option value="Preparando" ${order.status === 'Preparando' ? 'selected' : ''}>Preparando</option>
                    <option value="A Caminho" ${order.status === 'A Caminho' ? 'selected' : ''}>A Caminho</option>
                    <option value="Entregue" ${order.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                </select>
            </div>
        `;

        orderElement.innerHTML = orderInfo + orderStatus;
        ordersList.appendChild(orderElement);
    });

    // Adicionar evento para atualizar status do pedido
    const statusSelectors = document.querySelectorAll('select');
    statusSelectors.forEach(select => {
        select.addEventListener('change', function() {
            const orderId = parseInt(this.getAttribute('data-id'));
            const newStatus = this.value;
            updateOrderStatus(orderId, newStatus);
        });
    });
}

// Função para atualizar o status do pedido
function updateOrderStatus(id, newStatus) {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        renderOrders(); // Atualiza a lista de pedidos após a mudança de status
    }
}

// Inicializar a lista de pedidos ao carregar a página
window.onload = renderOrders;
