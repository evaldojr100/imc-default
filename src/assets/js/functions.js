let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

//Criar Função para Calcular o IMC
function calcular_imc(peso,altura){return peso /(altura*altura);}

//Criar Variavel Tabela
let tabela = document.querySelector(".table");

//Criar Variavel Para Mensagem
let mensagem = document.querySelector('#mensagem')

//Criar Função para Acicionar Linhas na Tablea
function AddTabela(nome, peso, altura, imc, indice){
  
  //Criar coluna NOme
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  //Criar Coluna Peso
  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  //Criar Coluna Altura
  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  //Criar Coluna IMC
  let colunaImc = document.createElement('td');
  colunaImc.innerHTML = imc;

  //Criar Coluna Deletar
  let colunaDelete = document.createElement('td');

  //Criar Botão Para adicionar na coluna Deletar
  let btnDeletar = document.createElement('button');

  //Aqui estamos adicionando um codigo HTML ao botão, e alterando o css pelo javascript
  //podemos fazer o CSS inline tbm no proprio innerHTML
  btnDeletar.innerHTML = "<img src='assets/images/delete.svg'>";
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');

  btnDeletar.addEventListener("click",(event)=>{
    event.preventDefault();
    deletarLinha(indice);
  });
  
  //Adicionar Botao a Coluna Deletar
  colunaDelete.appendChild(btnDeletar);

  //Criar Variavel Linha
  let linha  = document.createElement('tr');

  //Adicionando as colunas a linha
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaImc);
  linha.appendChild(colunaDelete);

  //Adicionando linha a Tabela
  tabela.appendChild(linha);

}

function limparCampos(){

  nome.value =""
  peso.value =""
  altura.value = ""
  nome.focus();
}

function limpartabela(){
  let qtdLinhas = tabela.rows.length;
  for (let i = qtdLinhas - 1; i > 0; i--){
    tabela.deleteRow(i);
  }
}
function carregarLocalStorage(){

  limpartabela();

  if(localStorage.getItem('listaIMC')){
    let listaIMC = JSON.parse(localStorage.getItem('listaIMC'));
    listaIMC.forEach((pessoa,indice) =>{
      AddTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc,indice)
    });
  }
}
function addLocalStorage(nome,peso,altura,imc){

  let pessoa = {
    'nome': nome,
    'peso': peso,
    'altura' : altura,
    'imc' : imc
  }

  if(localStorage.getItem('listaIMC')){
    let listaIMC = JSON.parse(localStorage.getItem('listaIMC'));
    listaIMC.push(pessoa)
    localStorage.setItem('listaIMC',JSON.stringify(listaIMC));

  }else{
    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem('listaIMC',JSON.stringify(listaIMC));
  }

  mostrarMensagem('Cadastrado com Sucesso','add');

  
}
function deletarLinha(indice){
  let pessoas = JSON.parse(localStorage.getItem('listaIMC'));
  pessoas.splice(indice,1);
  localStorage.setItem('listaIMC', JSON.stringify(pessoas));
  carregarLocalStorage();
  mostrarMensagem('Deletado com Sucesso','delete');
}
function mostrarMensagem(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.remove('d-none');

  if (tipo == 'add'){
    mensagem.classList.add('alert-success');
  }else if (tipo == 'delete'){
    mensagem.classList.add('alert-danger');
  }

  setTimeout(() =>{
    mensagem.innerHTML = "";
    mensagem.classList.remove('alert-success');
    mensagem.classList.remove('alert-danger');
    mensagem.classList.add('d-none');
  }, 2000);
}
document.querySelector("#btn-calcular").addEventListener("click",(event)=>{
  event.preventDefault();
  console.log("Nome: "+nome.value);
  console.log("Peso: "+ peso.value);
  console.log("Altura: "+altura.value);

  let imc = calcular_imc(peso.value,altura.value);
  console.log("\nIMC: "+imc.toFixed(2));

  //AddTabela(nome.value, peso.value, altura.value, imc.toFixed(2));
  addLocalStorage(nome.value, peso.value, altura.value, imc.toFixed(2));
  carregarLocalStorage();

  limparCampos();
});

