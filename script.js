// objeto do usuário
const usuario = { nome: "Gustavo", matricula: "658", pendencia: false, acessibilidade: true };
// lista de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 2, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 3, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 4, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 5, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 6, formato: "duplo", status: true, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 7, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 8, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
];

const eventos = [
  {
      id: 1,
      title: 'Semana do Software 2025',
      date: '12/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'tech',
      description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 2,
      title: 'Workshop de IoT',
      date: '12/01',
      time: '08:00',
      location: 'Laboratório CS&I',
      type: 'tech',
      description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 3,
      title: 'Festa dos Alunos 2025',
      date: '18/05',
      time: '19:00',
      location: 'Área Esportiva do Inatel',
      type: 'cultural',
      description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 4,
      title: 'Feira de Oportunidades',
      date: '04/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'academic',
      description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
  }
];

// função para reserva do armário, incluindo as novas melhorias.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no HTML.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // filtrar armários disponíveis e acessíveis para o usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // sorteando um armário disponível.
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // localizando o armário na lista e atualizando seu status.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  
  // calculando a data e hora da reserva.
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toISOString();
  
  // calculando a data e hora para entrega das chaves (24 horas após a reserva).
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000); // 24 horas em milissegundos
  armarioEmprestado.dataEntrega = dataEntrega.toISOString();
  
  // mudando a pendência do usuário.
  usuario.pendencia = true;
  
  // exibindo mensagem de sucesso e data de entrega.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! 
  Data de reserva: ${dataReserva.toLocaleString()} 
  A chave deverá ser entregue até: ${dataEntrega.toLocaleString()}`;
  
  console.log(usuario);
  console.log(armarios);
}

const modal = document.getElementById("theme-modal");
const openModalBtn = document.getElementById("open-theme-modal");
const closeModalBtn = document.getElementById("close-theme-modal");
const themeButtons = document.querySelectorAll(".theme-option");

// Abrir o modal
document.getElementById("menu-icon").addEventListener("click", () => {
  document.getElementById("theme-modal").style.display = "flex";
});

// Fechar o modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Trocar o tema ao clicar em um botão
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", selectedTheme);
    modal.style.display = "none"; // Fecha o modal após a escolha
  });
});

// Fechar modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Função para exibir eventos
function exibirEventos() {
  const eventosContainer = document.getElementById("eventos-container");

  eventos.forEach((evento) => {
    const eventoCard = `
      <div class="evento-card">
        <img src="${evento.image}" alt="${evento.title}" class="evento-image">
        <div class="evento-info">
          <h2 class="evento-title">${evento.title}</h2>
          <p class="evento-date">${evento.date} - ${evento.time}</p>
          <p class="evento-location">${evento.location}</p>
          <p class="evento-description">${evento.description}</p>
        </div>
      </div>
    `;

    eventosContainer.innerHTML += eventoCard;
  });
}
exibirEventos();


