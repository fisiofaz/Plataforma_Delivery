function renderDashboardSummary() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const summaryContainer = document.getElementById('dashboardSummary');
    summaryContainer.innerHTML = '';

    if (orders.length === 0) {
        summaryContainer.innerHTML = '<p>Nenhum pedido foi recebido ainda.</p>';
        return;
    }

    orders.forEach(order => {
        const summaryItem = document.createElement('div');
        summaryItem.classList.add('summary-item');
        summaryItem.innerHTML = `
            <h3>Pedido #${order.id}</h3>
            <p>Total: R$ ${order.total.toFixed(2)}</p>
            <p>Status: <span> ${order.status} </span></p>
        `;
        summaryContainer.appendChild(summaryItem);
    });
}

window.onload = renderDashboardSummary;
