// Criando Variaveis
let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");
let tabela = document.querySelector(".table");
let mensagem = document.querySelector("#mensagem");

//Função para Calcular IMC
function calcularIMC(peso,altura){
    let imc = peso / (altura *altura)
    console.log(imc.toFixed(2))
    return imc.toFixed(2);
}

//Criando Função para o Botão Calcular
document.querySelector("#btn-calcular").addEventListener("click", (event) => { 
    event.preventDefault()
    let imc = calcularIMC(peso.value,altura.value)
    console.log(verificaNivel(imc))
    //inserirTabela(nome.value, peso.value, altura.value, imc,verificaNivel(imc));
    addLocalStorage(nome.value, peso.value, altura.value, imc,verificaNivel(imc));
    carregarLocalStorage()
    limparformulario();

});

function verificaNivel(imc){
    if(imc<18.5)
        return 'Abaixo do Peso'
    else if(imc>=18.5 && imc<25)
        return 'Peso Normal'
    else if(imc>=25 && imc<30)
        return 'Sobrepeso'
    else if(imc>=30 && imc<35)
        return 'Obesidade Grau I'
    else if(imc>=35 && imc<40)
        return 'Obesidade Grau II' 
    else
        return 'Obesdade Graus III e IV'
}

function mudacor(nivel){
    switch(nivel){
        case 'Abaixo do Peso':
            return '#00FA9A'
        break;
        case 'Peso Normal':
            return '#00FF00'
        break;
        case 'Sobrepeso':
            return '#FFA500'
        break;
        case 'Obesidade Grau I':
            return '#FF4500'
        break;
        case 'Obesidade Grau II':
            return '#FF6347'
        break;
        case 'Obesdade Graus III e IV':
            return '#FF0000'
        break;

    }
    
}
function inserirTabela(nome,peso,altura,imc,nivel,indice){
    let colunaNome = document.createElement('td');
    colunaNome.innerHTML = nome;

    let colunaPeso = document.createElement('td');
    colunaPeso.innerHTML = peso;

    let colunaAltura = document.createElement('td');
    colunaAltura.innerHTML = altura;

    let colunaIMC = document.createElement('td');
    colunaIMC.innerHTML = imc;

    let colunaNivel = document.createElement('td');
    colunaNivel.innerHTML = nivel;
    colunaNivel.style.backgroundColor = mudacor(nivel);

    let colunaDeletar = document.createElement('td');
    let btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
    btnDeletar.classList.add('btn');
    btnDeletar.classList.add('btn-danger');  
    btnDeletar.addEventListener("click", (event) => {
        event.preventDefault();
        deletarLinha(indice);
      });
    colunaDeletar.appendChild(btnDeletar);

    let linha = document.createElement('tr');
    linha.appendChild(colunaNome);
     linha.appendChild(colunaPeso);
     linha.appendChild(colunaAltura);
     linha.appendChild(colunaIMC);
     linha.appendChild(colunaNivel);
     linha.appendChild(colunaDeletar);

     tabela.appendChild(linha);

}

function limparformulario(){
    nome.value='';
    peso.value='';
    altura.value='';
    nome.focus();
}

function addLocalStorage(nome, peso, altura, imc, nivel){
    let pessoa = {
      "nome": nome,
      "peso": peso,
      "altura": altura,
      "imc": imc,
      "nivel" : nivel

    }
  
    if (localStorage.getItem("listaIMC")){
      
      let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
      listaIMC.push(pessoa);
      localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
    
    } else {
  
      let listaIMC = [];
      listaIMC.push(pessoa);
      localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
    }
    mostrarMensagem("IMC Cadastrado",'inserido')
}

function limparTabela(){
    let qtdLinhas = tabela.rows.length;
    for (let i = qtdLinhas - 1; i > 0; i--){
      tabela.deleteRow(i);
    }
}

function carregarLocalStorage(){
  
    limparTabela();
  
    if (localStorage.getItem("listaIMC")){
      
      let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
      listaIMC.forEach((pessoa, indice) => {
        inserirTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc,pessoa.nivel,indice);
      });
    }else{
        mostrarMensagem("Não Possui Dados Cadastrados","alerta")
    }
}

function deletarLinha(index){
  
    let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
    pessoas.splice(index, 1);
    localStorage.setItem("listaIMC", JSON.stringify(pessoas));
    carregarLocalStorage();

    mostrarMensagem("Deletado com Sucesso","deletado");
}

function mostrarMensagem(msg, tipo){
  
    mensagem.innerHTML = msg;
    mensagem.classList.add("d-block");
  
    if (tipo == 'inserido'){
      mensagem.classList.add("alert-success");
    } else if (tipo == 'deletado'){
      mensagem.classList.add("alert-danger");
    } else if (tipo == 'alerta'){
      mensagem.classList.add("alert-warning");
    }
  
    setTimeout(() => {
      mensagem.innerHTML = "";
      mensagem.classList.remove("alert-danger");
      mensagem.classList.remove("alert-success");
      mensagem.classList.remove("alert-warning");
      mensagem.classList.remove("d-none");
    }, 2000);
  }
