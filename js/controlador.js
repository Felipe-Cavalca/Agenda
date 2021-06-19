$(document).ready(function(){
    $("#enviarContato").on('click', function(){

        if(sessionStorage.getItem('contatoSelecionado') != undefined && sessionStorage.getItem('contatoSelecionado') != 'undefined')
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
            if (resposta % 1 === 0){
                sessionStorage.setItem('mensagem', 'cadastro');
                window.history.back();
            }else  
                alert('houve um erro');
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
            if (resposta == 'true'){
                sessionStorage.setItem('mensagem', 'edicao');
                window.history.back();
            }else  
                alert('houve um erro');
        },
        complete: function () {
            
        }
    });
}

function filtrar(texto,elemento){ 
    dados = JSON.parse(localStorage.getItem('contatos'));
    var dadosFiltrados = [];

    for(var i=0; i<dados.length; i++){
        texto = texto.toUpperCase();
        var nome = dados[i].nome.substr(0,texto.length).toUpperCase();
        var telefone = dados[i].telefone.substr(0,texto.length).toUpperCase();
        var email = dados[i].email.substr(0,texto.length).toUpperCase();
        var endereco = dados[i].endereco.substr(0,texto.length).toUpperCase();
        if( (nome == texto) || (telefone == texto) || (email == texto) || (endereco == texto)){
            var usuario = {
                "id":dados[i].id,
                "nome":dados[i].nome,
                "telefone":dados[i].telefone,
                "email":dados[i].email,
                "endereco":dados[i].endereco
            }
            dadosFiltrados.push(usuario);
        }
    }
    dados = JSON.stringify(dadosFiltrados);
    document.getElementById(elemento).innerHTML = exibir(dados);
}

function pegarContatos(elemento){
    var dados = {}
    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/listarContato.php',
        async: false,
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            localStorage.setItem('contatos', resposta);
            document.getElementById(elemento).innerHTML = exibir(localStorage.getItem('contatos'));
        },
        complete: function () {
            
        }
    });
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
        async: false,
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            localStorage.setItem('contatos', resposta);
            if (elemento != undefined){
                document.getElementById(elemento).innerHTML = exibir(resposta);
            }
        },
        complete: function () {
            
        }
    });
    return true;
}

function exibir(dados){
    val = JSON.parse(dados);
    //console.log(dados);
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