<?php

$dados = json_decode($_POST['data'], true);
$id = $dados['id'];
$nome = $dados['nome'];
$telefone = $dados['telefone'];
$email = $dados['email'];
$endereco = $dados['endereco'];

if ($id != null && $nome != null){
    include 'conexao.php';
    $sth = $pdo->prepare("UPDATE tbl_contatos SET contato_nome = :nome, contato_telefone = :telefone, contato_email = :email, contato_endereco = :endereco WHERE contato_id = :id");
    $sth->bindValue(':nome', $nome);    
    $sth->bindValue(':telefone', $telefone);
    $sth->bindValue(':email', $email);
    $sth->bindValue(':endereco', $endereco);
    $sth->bindValue(':id', $id);
    if($sth->execute())
        echo 'true';
    else
        echo 'false';

}else{
    echo 'null';
}