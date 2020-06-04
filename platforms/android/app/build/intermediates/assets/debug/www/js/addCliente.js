document.addEventListener("deviceready", listarRegistros, false);
document.getElementById("AddValue").addEventListener("click", AddValue, false);
document.getElementById("listarRegistros").addEventListener("click", listarRegistros, false);

function getIndiceCliente(){
  indiceJson = window.localStorage.getItem("indice");
  indiceArray = JSON.parse(indiceJson);

  return indiceArray;
}

function GerarChaveCliente(){
    indiceArray = getIndiceCliente();

    if(indiceArray == null) {
       window.localStorage.setItem("indice", '[0]');
       novo = 0;
    }
    else{
      novo = indiceArray.length;
      indiceArray.push(novo);
      indiceJson = JSON.stringify(indiceArray);
      window.localStorage.setItem("indice", indiceJson);
    }

    return "c"+novo;
}

function AddValue(){
  var chave = GerarChaveCliente();
  var contatoJson = MontarCliente(chave);

  window.localStorage.setItem(chave, contatoJson);

  alert("Cliente cadastrado com sucesso");

  listarRegistros();
}

function MontarCliente(chaveCliente){
  var nome = document.getElementById('idNomeCliente').value;
  //var sexualidade = document.getElementById('idSexualidade').value;
  //var dataNascimento = document.getElementById('idDtNascimentoCliente').value;
  var peso = document.getElementById('idPesoCliente').value;
  var altura = document.getElementById('idAlturaCliente').value;

  // Formatando a data YYYY-MM-DD para DD-MM-YYYY
  //var dataFormatada = dataNascimento.split("-").reverse().join("-");

  var contatoJson = JSON.stringify({
    id : chaveCliente,
    nomeCliente : nome,
    //sexualidadeCliente: sexualidade,
    //dtNascimento : dataFormatada,
    pesoCliente : peso,
    alturaCliente : altura
  });

  return contatoJson;
}


function listarRegistros(){

  indiceArray = getIndiceCliente();

  var lista = '<div>';
  var chave2;
  for(var i=0;i < indiceArray.length; i++){
    chave = indiceArray[i];

    if (chave != null) {
      chave2 = "c"+indiceArray[i];      
      contatoJson = window.localStorage.getItem(chave2);

      cadastroArray = JSON.parse(contatoJson);

      lista = lista + '<div class="card"> <div class="card-body">';
      lista = lista + '<div class="container"> <div class="row">';
      lista = lista + '<div class="col-10">';
      lista = lista + '<h6><b>' + cadastroArray.nomeCliente + '</b></h6>';
      lista = lista + '<label>' + cadastroArray.alturaCliente + 'm  |  ' + cadastroArray.pesoCliente + 'Kg</label><br>'; 
      lista = lista + "<a href='perfilCliente.html?id=" + chave + "'>Ver Perfil</a>";
      lista = lista + '</div>';
      lista = lista + '<div class="col-2" style="position: relative;">';
      lista = lista + "<a href='updateCliente.html?id=" + chave2 + "'><img src='img/update.png' /></a><br><br>";
      lista = lista + "<img src='img/delete.png' id='" + chave2 + "' class='apagarCliente' data-atributo='" + chave + "' />";
      lista = lista + '</div>';
      lista = lista + '</div></div>';
      lista = lista + '</div></div><br>';
    }
  }

  lista = lista + "</div>";

  lbClientes.innerHTML = lista;
  a = document.getElementsByClassName("apagarCliente");
  for(i = 0; i < a.length; i++){
    a[i].addEventListener("click", function(){
      apagarCliente(this.getAttribute("data-atributo"));
    });
  }
}

function apagarCliente(chave){
  window.localStorage.removeItem("c" + chave);

  ApagarChaveCliente(chave);

  alert("Cliente apagado com sucesso");

  listarRegistros();
}

function ApagarChaveCliente(chave){
  indiceArray = getIndiceCliente();

  indiceArray[chave] = null;

  indiceJson = JSON.stringify(indiceArray);
  window.localStorage.setItem("indice", indiceJson);
}