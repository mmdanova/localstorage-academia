montarFormularioExercicio();
document.addEventListener("deviceready", montarFormularioExercicio, false);
document.getElementById("atualizarExercicios").addEventListener("click", atualizarExercicios, false);
document.getElementById("VoltarIndex").addEventListener("click", VoltarIndex, false);

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


function montarFormularioExercicio(){
  var chave = _GET('id');

  if (chave != null)
    exercicioJson = window.localStorage.getItem(chave);

  exercicioArray = JSON.parse(exercicioJson);

  document.getElementById('idNomeExercicio').value = exercicioArray.NomeExercicio;
  document.getElementById('idAreaTrabalhada').value = exercicioArray.AreaExercicio;
  document.getElementById('idEquipamentoUtilizado').value = exercicioArray.EquipamentoExercicio;
  document.getElementById('idCalGastasHora').value = exercicioArray.CaloriasGastas;
}

function atualizarExercicios(){

  var chave = _GET('id');
  var exercicioJson = MontarJson();

  window.localStorage.setItem(chave, exercicioJson);

  alert("Exercício Atualizado com sucesso");

  VoltarIndex();
}

function MontarJson(){
  var nomeExercicio = document.getElementById('idNomeExercicio').value;
  var areaExercicio = document.getElementById('idAreaTrabalhada').value;
  var equipamentoExercicio = document.getElementById('idEquipamentoUtilizado').value;
  var calGastasHora = document.getElementById('idCalGastasHora').value;

  var exercicioJson = JSON.stringify({
    NomeExercicio : nomeExercicio,
    AreaExercicio : areaExercicio,
    EquipamentoExercicio : equipamentoExercicio,
    CaloriasGastas : calGastasHora
  });

  return exercicioJson;
}

function VoltarIndex(){
  location.href="listaExercicio.html";
}