$(document).ready(function(){
    $("#enviarContato").on('click', function(){

        if(sessionStorage.getItem('contatoSelecionado') != 'null')
                editarContato(sessionStorage.getItem('contatoSelecionado'));
        else
            cadastrarContato();
    });
}); 

function cadastrarContato(){
    var dados = {
        'nome' : document.getElementById("nome").value,
        'telefone' : document.getElementById("telefone").value,
        'email' : document.getElementById("email").value,
        'endereco' : document.getElementById("endereco").value,
    }
    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/cadastrarContato.php',
        async: false,
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            alert(resposta);
        },
        complete: function () {
            
        }
    });
}

function editarContato(id){
    var dados = {
        'id' : id,
        'nome' : document.getElementById("nome").value,
        'telefone' : document.getElementById("telefone").value,
        'email' : document.getElementById("email").value,
        'endereco' : document.getElementById("endereco").value,
    }
    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/editarContato.php',
        async: false,
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            alert(resposta);
        },
        complete: function () {
            
        }
    });
}

function pegarContatos(elemento){
    var dados = {}
    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/listarContato.php',
        data: {data:dados},
        async: false,
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            localStorage.setItem('contatos', resposta);
        },
        complete: function () {
            
        }
    });
    document.getElementById(elemento).innerHTML = exibir(localStorage.getItem('contatos'));
}

function pegarDados(id){
    dados = JSON.parse(localStorage.getItem('contatos'));
    for(var i=0; i<dados.length; i++){
        if(dados[i].id == id){
            document.getElementById('nome').value     = dados[i].nome;
            document.getElementById('telefone').value = dados[i].telefone;
            document.getElementById('email').value    = dados[i].email;
            document.getElementById('endereco').value = dados[i].endereco;
        }
    }
}

function excluirContato(id, elemento){
    if (elemento != undefined)
        var dados = {"id":id, "listar": true}
    else
        var dados = {"id":id, "listar":false}

    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/excluirContato.php',
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            if (elemento != undefined){
                document.getElementById(elemento).innerHTML = exibir(resposta);
            }
        },
        complete: function () {
            
        }
    });
}

function exibir(dados){
    val = JSON.parse(dados);
    var escrever = "";

    for(var i=0; i<val.length; i++){
        val[i].id;
        val[i].nome;
        val[i].telefone;
        val[i].email;
        val[i].endereco;

        escrever += '<li class="list-group-item contato" data-bs-toggle="collapse" href="#id' +val[i].id+ '">' +
                        '<div class="ms-2 me-auto">' +
                            '<div class="fw-bold">' +val[i].nome+ '</div>' +
                            '<div class="collapse row" id="id' +val[i].id+ '">' +
                                '<hr>' +
                                '<div class="col-md-8">' +
                                    '<p>Telefone: ' +val[i].telefone+ '</p>' +
                                    '<p>Email: ' +val[i].email+ '</p>' +
                                    '<p>Endereço: ' +val[i].endereco+ '</p>' +
                                '</div>' +
                                '<div class="col-md-4 mt-2">' +
                                    '<p><button onclick="editar(' +val[i].id+ ')"  type="button" class="btn btn-primary full">Editar</button></p>' +
                                    '<p><button onclick="avisoExcluir(' +val[i].id+ ', ';
                                    escrever += "'"+val[i].nome+"'";
                                    escrever += ')" class="btn btn-danger full">Excluir</button></p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }

    return escrever;
}