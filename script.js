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
