listarTreinos();
popularSelectExercicio();
popularSelectCliente();
document.getElementById("idBotaoAdicionar").addEventListener("click", addTreino, false);
document.getElementById("listarTreinos").addEventListener("click", listarTreinos, false);
document.addEventListener("deviceready", listarTreinos, false);

function getIndice2(){
  indiceJson = window.localStorage.getItem("indiceTreino");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChaveTreino(){
  indiceArray = getIndice2();

  if(indiceArray == null) {
   window.localStorage.setItem("indiceTreino", '[0]');
   novo = 0;
 }
 else{
  novo = indiceArray.length;
  indiceArray.push(novo);
  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceTreino", indiceJson);
}

return "t"+novo;
}


function addTreino(){
  var treinoJson = MontarTreino();
  var chave = GerarChaveTreino();

  window.localStorage.setItem(chave, treinoJson);

  var clienteChave = document.getElementById('idNomeCliente').value;
  var exercicioChave = document.getElementById('idNomeExercicio').value;
  atualizarClientePeso(clienteChave,exercicioChave);

  alert("Treino cadastrado com sucesso");

  listarTreinos();

}


function atualizarClientePeso(chaveCliente, chaveExercicio) {
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

  var s = dataHoraInicio.split(':');
  var e = dataHoraFinal.split(':');

  var end = parseInt(e[0])* 60+ parseInt(e[1]);
  var start = parseInt(s[0])*60 + parseInt(s[1]);

  var minutos = end - start;

  var horas = parseInt(minutos/60);

  treinoExercicioJson = window.localStorage.getItem(chaveExercicio);
  
  var objJsonExercicio = JSON.parse(treinoExercicioJson);
  var caloriaExercicio = objJsonExercicio.CaloriasGastas;

  treinoClienteJson = window.localStorage.getItem(chaveCliente);
  treinoClienteObj = JSON.parse(treinoClienteJson);
  var pesoAtualCliente = treinoClienteObj.pesoCliente;

  var caloriasEmPeso = caloriaExercicio * 0.00012959782;

  var caloriasPerdidas = caloriasEmPeso * horas;

  var novoPesoCliente = (pesoAtualCliente - caloriasPerdidas);
  
  var nome = treinoClienteObj.nomeCliente;
  var altura = treinoClienteObj.alturaCliente;
  var id = treinoClienteObj.id;

  var clienteJson = JSON.stringify({
    id : id,
    nomeCliente : nome,
    pesoCliente : novoPesoCliente.toFixed(2),
    alturaCliente : altura  
  });

  window.localStorage.setItem(chaveCliente, clienteJson);
}


function MontarTreino(){
  var nomeCliente = document.getElementById('idNomeCliente');
  var nomeExercicio = document.getElementById('idNomeExercicio');
  var data = document.getElementById('idDataTreino').value;
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

// Formatando a data YYYY-MM-DD para DD-MM-YYYY
var dataFormatada = data.split("-").reverse().join("-");

var treinoJson = JSON.stringify({
  NomeClienteCbo : retornaJson(nomeCliente.value),
  NomeExercicioCbo : retornaJson(nomeExercicio.value),
  DataTreino : dataFormatada,
  HoraInicioTreino : dataHoraInicio,
  HoraFimTreino : dataHoraFinal
});

return treinoJson;

}

function listarTreinos(){

  indiceArray = getIndice2();

  var lista = '<div>';
  var chave2;
  if (indiceArray != null){ 
    for(var i=0;i < indiceArray.length; i++){
      chave = indiceArray[i];

      if (chave != null) {
        chave2 = "t"+indiceArray[i];
        treinoJson = window.localStorage.getItem(chave2);

        treinoArray = JSON.parse(treinoJson);
        
        var objJsonCliente = JSON.parse(treinoArray.NomeClienteCbo);
        var novoNomeCliente = objJsonCliente.nomeCliente;

        var objJsonExercicio = JSON.parse(treinoArray.NomeExercicioCbo);
        var novoNomeExercicio = objJsonExercicio.NomeExercicio;
        

        lista = lista + '<div class="card"> <div class="card-body">';
        lista = lista + '<div class="container"> <div class="row">';
        lista = lista + '<div class="col-10">';
        lista = lista + '<h6><b>' + novoNomeCliente + '</b></h6>';
        lista = lista + '<label>' + novoNomeExercicio + '</label><br>';
        lista = lista + '<label><b>Data: </b>' + treinoArray.DataTreino + '</label><br>';
        lista = lista + '<label><b>Inicio:</b> ' + treinoArray.HoraInicioTreino + ' | <b>Fim:</b> ' + treinoArray.HoraFimTreino + '</label>';
        lista = lista + '</div>';
        lista = lista + '<div class="col-2 text-center">';
        lista = lista + "<img src='img/delete.png' id='" + chave2 + "' class='apagarTreino' data-atributo='" + chave + "'/>";
        lista = lista + '</div>';
        lista = lista + '</div></div>';
        lista = lista + '</div></div><br>';             
        
      }
    }
  }

  lista = lista + "</div>";

  if(document.getElementById("lbTreinos") != null) {

    lbTreinos.innerHTML = lista;
    a = document.getElementsByClassName("apagarTreino");
    for(i = 0; i < a.length; i++){
      a[i].addEventListener("click", function(){
        apagarTreino(this.getAttribute("data-atributo"));
      });
    }
  }
  
}

function apagarTreino(chave){
  window.localStorage.removeItem("t"+chave);

  ApagarChaveTreino(chave);

  alert("Treino apagado com sucesso");

  listarTreinos();

}

function ApagarChaveTreino(chave){
  indiceArray = getIndice2();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indiceTreino", indiceJson);

}

function getIndiceCliente(){
  indiceJson = window.localStorage.getItem("indice");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

function getIndiceExercicio(){
  indiceJson = window.localStorage.getItem("indiceExercicio");
  indiceArray = JSON.parse(indiceJson);
  return indiceArray;
}

function popularSelectCliente() {
  var select = document.getElementById('idNomeCliente');
  if (select != null) {

    select.length = 0;

    var opcaoPadrao = document.createElement('option');
    opcaoPadrao.text = 'Selecione...';

    select.add(opcaoPadrao);
    select.selectedIndex = 0;

    indiceArray = getIndiceCliente();

    var opcao;
    for(var i=0;i < indiceArray.length; i++){
      chave = indiceArray[i];
      if (chave != null) {
        chave = "c"+indiceArray[i];
        contatoJson = window.localStorage.getItem(chave);
        contatoArray = JSON.parse(contatoJson);
        opcao = document.createElement('option');

        opcao.text = contatoArray.nomeCliente;
        opcao.value = chave;

        select.add(opcao);

      }
    }
  }
}

function popularSelectExercicio() {
  var select = document.getElementById('idNomeExercicio');
  if(select != null) {

    select.length = 0;

    var opcaoPadrao = document.createElement('option');
    opcaoPadrao.text = 'Selecione...';

    select.add(opcaoPadrao);
    select.selectedIndex = 0;

    indiceArray = getIndiceExercicio();
    var opcao;
    for(var i=0;i < indiceArray.length; i++){
      chave = indiceArray[i];
      if (chave != null) {
        chave = "e"+indiceArray[i];
        contatoJson = window.localStorage.getItem(chave);
        contatoArray = JSON.parse(contatoJson);
        opcao = document.createElement('option');
        opcao.text = contatoArray.NomeExercicio;
        opcao.value = chave;

        select.add(opcao);

      }
    }
  }
}


function retornaJson(chave) {
  contatoJson = window.localStorage.getItem(chave);
  return contatoJson;
}