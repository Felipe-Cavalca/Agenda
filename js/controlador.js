$(document).ready(function(){
    $("#cadastrarContato").on('click', function(){

        var dados = {
            'nome' : document.getElementById("nome").value,
            'telefone' : document.getElementById("telefone").value,
            'email' : document.getElementById("email").value,
            'endereco' : document.getElementById("endereco").value,
        }
        dados = JSON.stringify(dados);

        $.ajax({
            url: 'http://192.168.0.19/Agenda/php/cadastroContato.php',
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
        return false;
    });
}); 

function pegarContatos(elemento){
    var dados = {}
    dados = JSON.stringify(dados);

    $.ajax({
        url: 'http://192.168.0.19/Agenda/php/listarContato.php',
        data: {data:dados},
        type: 'POST',
        beforeSent: function () {
            
        },
        success: function (resposta) {
            document.getElementById(elemento).innerHTML = exibir(resposta);
        },
        complete: function () {
            
        }
    });
}

function exibir(dados){
    val = JSON.parse(dados);
    var escrever = "";

    for(var i=0; i<val.length; i++){
        val[i].id = 'id'+val[i].id;
        val[i].nome;
        val[i].telefone;
        val[i].email;
        val[i].endereco;

        escrever += '<li class="list-group-item d-flex contato" data-bs-toggle="collapse" href="#' +val[i].id+ '">' +
                        '<div class="ms-2 me-auto">' +
                            '<div class="fw-bold">Nome: '+val[i].nome+ '</div>' +
                            '<div class="collapse" id="' +val[i].id+ '">' +
                                '<p  class="mt-3">Telefone: ' +val[i].telefone+ '</p>' +
                                '<p>Email: ' +val[i].email+ '</p>' +
                                '<p>Endereço: ' +val[i].endereco+ '</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }

    return escrever;
}