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
            url: 'http://localhost/Agenda/php/cadastroContato.php',
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