let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function calcular_imc(peso,altura){return peso /(altura*altura);}

document.querySelector("#btn-calcular").addEventListener("click",(event)=>{
  event.preventDefault();
  console.log("Nome: "+nome.value);
  console.log("Peso: "+ peso.value);
  console.log("Altura: "+altura.value);

  let imc = calcular_imc(peso.value,altura.value);
  console.log("\nIMC: "+imc.toFixed(2));
});

