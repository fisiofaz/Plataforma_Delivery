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

function initMap() {
    const entregadorPos = { lat: -23.550520, lng: -46.633308 }; // Exemplo de coordenadas
    const map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 12,
        center: entregadorPos,
    });
    const marker = new google.maps.Marker({
        position: entregadorPos,
        map: map,
        title: "Entregador",
    });
}

window.onload = loadDashboard; // Carrega o resumo ao abrir a página

