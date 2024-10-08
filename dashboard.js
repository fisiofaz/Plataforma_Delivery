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
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -23.550520, lng: -46.633308}, // Localização central (exemplo: São Paulo)
        zoom: 12
    });

    // Exemplo de marcadores (entregadores)
    var marker = new google.maps.Marker({
        position: {lat: -23.550520, lng: -46.633308},
        map: map,
        title: 'Entregador 1'
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

// Função para filtrar pedidos
function applyFilters() {
    var status = document.getElementById('status').value;
    var period = document.getElementById('time-period').value;
    console.log('Filtros aplicados:', status, period);
    // Aqui você pode implementar a lógica para filtrar os pedidos com base no status e período
}

// Função para atualizar status do pedido
function updateStatus(orderId) {
    console.log('Status do pedido ' + orderId + ' atualizado');
    // Aqui você pode adicionar a lógica para mudar o status do pedido
}

// Gráfico de Desempenho dos Pedidos
var ctx = document.getElementById('ordersChart').getContext('2d');
var ordersChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Em Preparo', 'A Caminho', 'Entregue'],
        datasets: [{
            label: 'Pedidos',
            data: [12, 19, 3], // Exemplo de dados
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

window.onload = initMap;