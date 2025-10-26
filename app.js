document.addEventListener('DOMContentLoaded', () => {

    // Encontrar os elementos do HTML com os quais vamos interagir
    const form = document.getElementById('form-agendamento');
    const mensagemStatus = document.getElementById('mensagem-status');

    // Adicionar um "ouvinte" para o evento de 'submit' (clique no botão)
    form.addEventListener('submit', (event) => {

        // Impede que a página seja recarregada ao enviar o formulário
        event.preventDefault();

        console.log("Formulário enviado! (Versão Mock)");

        // Simula que pegamos os dados do cliente
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        console.log("Dados (simulados):", { nome, telefone });

        // Mostra uma mensagem de sucesso na tela
        mensagemStatus.textContent = "Agendamento enviado com sucesso! (Versão de teste)";
        mensagemStatus.style.color = "green";

        // Limpa o formulário após o "sucesso"
        form.reset();

    });

});