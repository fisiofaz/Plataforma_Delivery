document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const formWrapper = document.querySelector('.form-wrapper');
    
    // Alterna entre os formulários de login e registro com animação
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        formWrapper.style.transform = 'translateX(-50%)';
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        formWrapper.style.transform = 'translateX(0)';
    });
    
    // Simula o login e registro
    document.getElementById('login').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulação de login
        if (email === "teste@teste.com" && password === "123456") {
            alert("Login bem-sucedido!");
            // Redireciona para o dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Credenciais inválidas");
        }
    });
    
    document.getElementById('register').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        // Simulação de registro
        alert(`Usuário ${name} registrado com sucesso!`);
        formWrapper.style.transform = 'translateX(0)'; // Volta para o login
    });
});
