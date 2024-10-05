const addItemBtn = document.getElementById('addItemBtn');
const menuForm = document.getElementById('menuForm');
const itemModal = document.getElementById('itemModal');
const itemIdInput = document.getElementById('itemId');
const menuList = document.getElementById('menuList');
const closeModal = document.querySelector('.close');

let menuItems = []; // Array para armazenar os itens do cardápio

// Função para renderizar a lista de itens do cardápio
function renderMenu() {
    menuList.innerHTML = ''; // Limpar lista existente
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <strong>${item.name}</strong>
            <p>${item.description}</p>
            <p>R$ ${item.price.toFixed(2)}</p>
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image"/>` : ''}
            <button onclick="editItem(${item.id})">Editar</button>
            <button onclick="removeItem(${item.id})">Remover</button>
        `;
        menuList.appendChild(menuItem);
    });
}

// Função para adicionar ou editar um item
menuForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemImage = document.getElementById('itemImage').files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        const itemData = {
            id: itemIdInput.value ? parseInt(itemIdInput.value) : Date.now(),
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: reader.result
        };

        if (itemIdInput.value) {
            // Editar item existente
            const index = menuItems.findIndex(item => item.id === itemData.id);
            menuItems[index] = itemData;
        } else {
            // Adicionar novo item
            menuItems.push(itemData);
        }

        closeModalModal();
        renderMenu();
    };

    if (itemImage) {
        reader.readAsDataURL(itemImage);
    } else {
        const itemData = {
            id: itemIdInput.value ? parseInt(itemIdInput.value) : Date.now(),
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            image: null
        };

        if (itemIdInput.value) {
            // Editar item existente
            const index = menuItems.findIndex(item => item.id === itemData.id);
            menuItems[index] = itemData;
        } else {
            // Adicionar novo item
            menuItems.push(itemData);
        }

        closeModalModal();
        renderMenu();
    }
});

// Função para abrir o modal
addItemBtn.onclick = function() {
    itemIdInput.value = '';
    document.getElementById('formTitle').textContent = 'Adicionar Item';
    itemModal.style.display = 'block';
};

// Função para fechar o modal
closeModal.onclick = closeModalModal;
function closeModalModal() {
    itemModal.style.display = 'none';
    menuForm.reset();
}

// Função para editar um item
function editItem(id) {
    const item = menuItems.find(item => item.id === id);
    itemIdInput.value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('formTitle').textContent = 'Editar Item';
    itemModal.style.display = 'block';
}

// Função para remover um item
function removeItem(id) {
    menuItems = menuItems.filter(item => item.id !== id);
    renderMenu();
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target === itemModal) {
        closeModalModal();
    }
};

// Inicializar a lista ao carregar a página
renderMenu();
