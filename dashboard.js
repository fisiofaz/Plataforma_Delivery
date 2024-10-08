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

function fetchOrders() {
    fetch('/api/pedidos')
        .then(response => response.json())
        .then(data => {
            // Atualizar o dashboard com novos pedidos e status
            document.getElementById('order-list').innerHTML = '';
            data.forEach(order => {
                const orderHtml = `<div class="order-card">
                    <h4>Pedido #${order.id}</h4>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <button class="track-btn" onclick="trackDelivery(${order.id})">Rastrear Entrega</button>
                    <div id="map-container-${order.id}"></div>
                </div>`;
                document.getElementById('order-list').innerHTML += orderHtml;
            });
        });
}

// Chamando a função repetidamente para atualização em tempo real
setInterval(fetchOrders, 5000);

function trackDelivery(orderId) {
    fetch(`/api/rastreamento/${orderId}`)
        .then(response => response.json())
        .then(data => {
            const mapContainer = document.getElementById(`map-container-${orderId}`);
            const map = new google.maps.Map(mapContainer, {
                zoom: 12,
                center: { lat: data.latitude, lng: data.longitude },
            });
            const marker = new google.maps.Marker({
                position: { lat: data.latitude, lng: data.longitude },
                map: map,
                title: 'Entregador',
            });
        });
}

window.onload = loadDashboard; // Carrega o resumo ao abrir a página

