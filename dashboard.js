function loadDashboard() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let total = 0;
    let orderSummary = document.getElementById('order-summary');
    
    if (orders.length === 0) {
        orderSummary.innerHTML = '<p>Nenhuma venda registrada ainda.</p>';
    } else {
        orders.forEach(order => {
            total += order.price;
        });
        orderSummary.innerHTML = `<p>Total de vendas: R$ ${total.toFixed(2)}</p>`;
    }
}

window.onload = loadDashboard; // Carrega o resumo ao abrir a página

