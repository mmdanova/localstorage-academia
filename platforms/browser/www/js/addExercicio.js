document.addEventListener("deviceready", listarExercicios, false);
document.getElementById("AddExercicio").addEventListener("click", addExercicio, false);
document.getElementById("listarExercicios").addEventListener("click", listarExercicios, false);

function getIndiceExercicio(){
  indiceJson = window.localStorage.getItem("indiceExercicio");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChaveExercicio(){
    indiceArray = getIndiceExercicio();

    if(indiceArray == null) {
       window.localStorage.setItem("indiceExercicio", '[0]');
       novo = 0;
    }
    else{
      novo = indiceArray.length;
      indiceArray.push(novo);
      indiceJson = JSON.stringify(indiceArray);
      window.localStorage.setItem("indiceExercicio", indiceJson);
    }

    return "e"+novo;
}

function addExercicio(){
  var chave = GerarChaveExercicio();
  var exercicioJson = MontarExercicio(chave);

  window.localStorage.setItem(chave, exercicioJson);

  alert("Exercício cadastrado com sucesso");

  listarExercicios();
}

function MontarExercicio(chaveExercicio){
  var nomeExercicio = document.getElementById('idNomeExercicio').value;
  var areaExercicio = document.getElementById('idAreaTrabalhada').value;
  var equipamentoExercicio = document.getElementById('idEquipamentoUtilizado').value;
  var calGastadasHora = document.getElementById('idCalGastasHora').value;

  var exercicioJson = JSON.stringify({
    id: chaveExercicio,
    NomeExercicio : nomeExercicio,
    AreaExercicio : areaExercicio,
    EquipamentoExercicio : equipamentoExercicio,
    CaloriasGastas : calGastadasHora
  });

  return exercicioJson;
}

function listarExercicios(){

  indiceArray = getIndiceExercicio();

  var lista = '<div>';
  var chave2;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "e"+indiceArray[i];
      exercicioJson = window.localStorage.getItem(chave2);

      exercicioArray = JSON.parse(exercicioJson);
      console.log(window.localStorage.getItem(chave));

      lista = lista + '<div class="card"> <div class="card-body">';
      lista = lista + '<div class="container"> <div class="row">';
      lista = lista + '<div class="col-10">';
      lista = lista + '<h6><b>' + exercicioArray.NomeExercicio + '</b></h6>';
      lista = lista + '<label>' + exercicioArray.EquipamentoExercicio + '</label><br>';
      lista = lista + '<label>' + exercicioArray.AreaExercicio + ' | ' + exercicioArray.CaloriasGastas + '</label><br>';
      lista = lista + '</div>';
      lista = lista + '<div class="col-2">';
      lista = lista + "<a href='updateExercicio.html?id=" + chave2 + "'><img src='img/update.png' /></a><br><br>";
      lista = lista + "<img src='img/delete.png' id='" + chave2 + "' class='apagarExercicio' data-atributo='" + chave + "' />";
      lista = lista + '</div>';
      lista = lista + '</div></div>';
      lista = lista + '</div></div><br>';                
    }
  }

  lista = lista + "</div>";

  lbExercicios.innerHTML = lista;
  a = document.getElementsByClassName("apagarExercicio");
  for(i = 0; i < a.length; i++){
    a[i].addEventListener("click", function(){
      apagarExercicio(this.getAttribute("data-atributo"));
    });
  }
console.log(exercicioJson);
}

function apagarExercicio(chave){
  window.localStorage.removeItem("e" + chave);

  ApagarChaveExercicio(chave);

  alert("Exercício apagado com sucesso");

  listarExercicios();
}

function ApagarChaveExercicio(chave){
  indiceArray = getIndiceExercicio();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceExercicio", indiceJson);
}