document.addEventListener('DOMContentLoaded', function() {
    const updateButtons = document.querySelectorAll('.update-status');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pedidoID = this.closest('tr').querySelector('td:first-child').innerText;
            alert(`Atualizando status do pedido ${pedidoID}`);
        });
    });

    const editButtons = document.querySelectorAll('.edit-item');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Abrir modal de edição para este item do cardápio!');
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Deseja realmente remover este item?')) {
                alert('Item removido do cardápio!');
            }
        });
    });

    // Gráfico de Vendas Aprimorado
    const ctx = document.getElementById('salesChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Altere o tipo de gráfico para 'line' para visualização mais moderna
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [{
                label: 'Vendas (R$)',
                data: [500, 400, 300, 700, 600],
                backgroundColor: 'rgba(110, 142, 251, 0.2)',
                borderColor: '#6e8efb',
                borderWidth: 2,
                tension: 0.3 // Linhas suaves
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
});
