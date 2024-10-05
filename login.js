// Alternar entre os formulários de Login e Cadastro
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Exibir formulário de cadastro
showRegister.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.innerText = 'Cadastro Restaurante';
});

// Exibir formulário de login
showLogin.addEventListener('click', function(event) {
    event.preventDefault();
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    formTitle.innerText = 'Login Restaurante';
});

// Validação do formulário de Login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

// Validação simples de Cadastro
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
        alert('Cadastro realizado com sucesso! Faça login.');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.innerText = 'Login Restaurante';
    } else {
        document.getElementById('registerError').style.display = 'block';
    }
});
