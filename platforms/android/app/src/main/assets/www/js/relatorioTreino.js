montarRelatorio();
document.getElementById("VoltarRelatorio").addEventListener("click", VoltarIndex, false);

function _GET(name){
  var url = window.location.search.replace("?", "");
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}


function montarRelatorio(){
  var chave = _GET('id');

  if (chave != null) {
    clienteJson = window.localStorage.getItem("c"+chave);
    chave = "c"+chave;
    clienteArray = JSON.parse(clienteJson);
  }

  indiceTreinoJson = window.localStorage.getItem("indiceTreino");
  indiceTreinoArray = JSON.parse(indiceTreinoJson);
  var treinoJson;
  var chaveTreino;
  var lista = '<table class="table table-striped">';

  var objJsonCliente;
  var idCliente;
  var novoNomeCliente;
  var objJsonExercicio;
  var novoNomeExercicio;
  var pesoCliente;
  var alturaCliente;
  var tempoDeTreino;


    novoNomeCliente = clienteArray.nomeCliente;
    pesoCliente = clienteArray.pesoCliente;
    alturaCliente = clienteArray.alturaCliente;
  for(var i=0;i < indiceTreinoArray.length; i++){
    chaveTreino = indiceTreinoArray[i];

    if (chaveTreino != null) {
      chaveTreino = "t"+indiceTreinoArray[i];
      treinoJson = window.localStorage.getItem(chaveTreino);

      treinoObj = JSON.parse(treinoJson);
     
      objJsonCliente = JSON.parse(treinoObj.NomeClienteCbo);
      idCliente = objJsonCliente.id;    


      if(idCliente == chave) {

        objJsonExercicio = JSON.parse(treinoObj.NomeExercicioCbo);
        novoNomeExercicio = objJsonExercicio.NomeExercicio;
        tempoDeTreino = converterEmHoras(treinoObj.HoraInicioTreino, treinoObj.HoraFimTreino);

        lista = lista + '<tr><td style="text-align: left;">' + novoNomeExercicio + '</td><td style="text-align: left;">' + treinoObj.DataTreino + '</td><td style="text-align: left;">' + tempoDeTreino + ' Hr(s)</td></tr>';
      }
     
    }
  }

  lista = lista + "</table>";

  if (pesoCliente != null) {
    document.getElementById("idNomeCliente").innerHTML = novoNomeCliente;
    document.getElementById("idPesoCliente").innerHTML = pesoCliente + "Kg";
    document.getElementById("idAlturaCliente").innerHTML = alturaCliente + "m";
    document.getElementById("idSituacaoIMC").innerHTML = "  " + calcularImc(pesoCliente,alturaCliente);
  }

  idRelatorio.innerHTML = lista;

}

function calcularImc(peso,altura) {
  var imc = peso/(altura*altura);

  document.getElementById("idValorIMC").innerHTML = imc.toFixed(2) + "Kg/m²";

  if(imc < 18.5) {
    return "Abaixo do Peso";
  }
  if(imc >= 18.5 && imc <= 24.9) {
    return "Peso Ideal";
  }
  if(imc >= 25 && imc <= 29.9) {
    return "Sobrepeso";
  }
  if(imc >= 30 && imc <= 34.9) {
    return "Obesidade Grau I";
  }
  if(imc >= 35 && imc <= 39.9) {
    return "Obesidade Grau II";
  }
  if(imc >= 40) {
    return "Obesidade Grau III";
  }
  return "";
}


function converterEmHoras(dataHoraInicio,dataHoraFinal) {

  var s = dataHoraInicio.split(':');
  var e = dataHoraFinal.split(':');

  var end = parseInt(e[0])* 60+ parseInt(e[1]);
  var start = parseInt(s[0])*60 + parseInt(s[1]);

  var minutos = end - start;

  var horas = parseInt(minutos/60);

  return horas;
}
function VoltarIndex(){
  location.href="listaCliente.html";
}