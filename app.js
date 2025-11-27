// URL do MockAPI (Mantenha a sua correta aqui!)
const API_URL = 'https://69288c62b35b4ffc50161791.mockapi.io/api/v1/agendamentos/agendamentos';

// --- CONFIGURAÇÃO DO WHATSAPP DO ESTABELECIMENTO ---
const NUMERO_WHATSAPP = '5599999999999'; // Coloque o número real aqui depois (55 + DDD + Numero)
// ---------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agendamento');
    const areaSucesso = document.getElementById('area-sucesso');
    const mensagemErro = document.getElementById('mensagem-erro');
    const btnWhatsApp = document.getElementById('btn-whatsapp-redirect');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Pegar os dados
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const data = document.getElementById('data').value;

        const agendamento = {
            nome: nome,
            telefone: telefone,
            data: data,
            criadoEm: new Date().toISOString()
        };

        // UI: Botão carregando
        const btnSubmit = form.querySelector('button');
        const textoOriginal = btnSubmit.innerText;
        btnSubmit.innerText = 'Enviando...';
        btnSubmit.disabled = true;
        mensagemErro.classList.add('d-none'); // Esconde erro se houver

        try {
            // 2. Enviar para MockAPI
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agendamento)
            });

            if (response.ok) {
                // --- SUCESSO! MÁGICA ACONTECE AQUI ---
                
                // A. Esconde o formulário para dar destaque ao sucesso
                form.classList.add('d-none');
                
                // B. Prepara o link do WhatsApp com mensagem personalizada
                const mensagemZap = `Olá! Me chamo *${nome}*. Acabei de fazer um agendamento para o dia *${formatarData(data)}*. Podem confirmar?`;
                const linkZap = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagemZap)}`;
                
                // C. Coloca o link no botão e mostra a área de sucesso
                btnWhatsApp.href = linkZap;
                areaSucesso.classList.remove('d-none');

            } else {
                throw new Error('Erro na resposta da API');
            }

        } catch (erro) {
            console.error(erro);
            mensagemErro.textContent = 'Ops! Algo deu errado. Tente novamente.';
            mensagemErro.classList.remove('d-none');
        } finally {
            // Restaura botão do formulário (caso tenha dado erro)
            btnSubmit.innerText = textoOriginal;
            btnSubmit.disabled = false;
        }
    });

    // Funçãozinha extra para deixar a data bonita na mensagem do Zap
    function formatarData(dataISO) {
        const dataObj = new Date(dataISO);
        return dataObj.toLocaleString('pt-BR');
    }
});