let orderStatus = ['Recebido', 'Em Preparação', 'A Caminho', 'Entregue'];
    let currentStatusIndex = 0;

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
                orderItem.innerHTML = `<p>${order.item} - R$ ${order.price.toFixed(2)} - <strong>Status: ${orderStatus[currentStatusIndex]}</strong></p>`;
                orderList.appendChild(orderItem);
            });
        }
    }

    function changeOrderStatus() {
        currentStatusIndex = (currentStatusIndex + 1) % orderStatus.length;
        notifyCustomer(orderStatus[currentStatusIndex]);
        loadOrders();
    }

    function sendEmailOrSms(status) {
        console.log(`Enviando notificação: Seu pedido agora está: ${status}`);
        // Aqui, no futuro, seria implementada uma chamada para APIs de e-mail ou SMS
        // Como Twilio (para SMS) ou SendGrid (para e-mails).
    }

    function notifyCustomer(status) {
        let notificationArea = document.getElementById('notification-area');
        let notificationMessage = document.getElementById('notification-message');
        let notificationSound = document.getElementById('notification-sound');
        
        notificationMessage.innerText = `Seu pedido agora está: ${status}`;
        notificationArea.style.display = 'block';
        notificationSound.play(); // Toca o som de notificação

        setTimeout(() => {
            notificationArea.style.display = 'none';
        }, 3000); // Exibe a notificação por 3 segundos

         sendEmailOrSms(status);
    }

    window.onload = loadOrders;
   