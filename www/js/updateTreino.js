document.getElementById("AtualizarTreino").addEventListener("click", AtualizarTreino, false);
document.getElementById("VoltarTreino").addEventListener("click", VoltarTreino, false);

function _GET(name)
{
  var url   = window.location.search.replace("?", "");
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

document.addEventListener("deviceready", montarFormulario, false);

function montarFormulario(){
  var chave = _GET('id');

  if (chave != null)
    treinoJson = window.localStorage.getItem(chave);

    treinoArray = JSON.parse(treinoJson);

    var dataFormatada = treinoArray.DataTreino.split("-").reverse().join("-");

    var clienteNomeJson = JSON.parse(treinoArray.NomeClienteCbo);
    var exercicioNomeJson = JSON.parse(treinoArray.NomeExercicioCbo);

    var clienteNome = clienteNomeJson.nomeCliente;
    var exercicioNome = exercicioNomeJson.NomeExercicio;


    var nomeCliente = document.getElementById('idNomeCliente');
    nomeCliente.value = clienteNome;
    var nomeExercicio = document.getElementById('idNomeExercicio');
    nomeExercicio.value = exercicioNome;
    var data = document.getElementById('idDataTreino').value = dataFormatada;
    var dataHoraInicio = document.getElementById('idHoraInicialTreino').value = treinoArray.HoraInicioTreino;
    var dataHoraFinal = document.getElementById('idHoraFinalTreino').value = treinoArray.HoraFimTreino;

    // está dando undefined, tem que verificar o motivo
    nomeCliente.title =clienteNomeJson.id;
    nomeExercicio.title=clienteNomeJson.id;
    

}

function AtualizarTreino(){

  var chave = _GET('id');
  var treinoJson = MontarJson();

  window.localStorage.setItem(chave, treinoJson);

  alert("Treino Atualizado com sucesso");

  VoltarTreino();
}

function MontarJson(){
  var nomeCliente = document.getElementById('idNomeCliente');
  var nomeExercicio = document.getElementById('idNomeExercicio');
  var data = document.getElementById('idDataTreino').value;
  var dataHoraInicio = document.getElementById('idHoraInicialTreino').value;
  var dataHoraFinal = document.getElementById('idHoraFinalTreino').value;

  var dataFormatada = data.split("-").reverse().join("-");

  var jsonTreino = JSON.stringify({
  NomeClienteCbo : retornaJson(nomeCliente.title),
  NomeExercicioCbo : retornaJson(nomeExercicio.title),
  DataTreino : dataFormatada,
  HoraInicioTreino : dataHoraInicio,
  HoraFimTreino : dataHoraFinal,
  });

  return jsonTreino;
}

function VoltarTreino(){
  location.href="treinos.html";
}


function retornaJson(chave) {
  var json = window.localStorage.getItem(chave);
  return json;
}