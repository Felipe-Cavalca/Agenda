<?php

$dados = json_decode($_POST['data'], true);
$nome = $dados['nome'];
$telefone = $dados['telefone'];
$email = $dados['email'];
$endereco = $dados['endereco'];

if ($nome != null){
    include 'conexao.php';

    $sth = $pdo->prepare("INSERT INTO tbl_contatos (contato_nome, contato_telefone, contato_email, contato_endereco) VALUES  (:nome, :telefone, :email, :endereco)");
    $sth->bindValue(':nome', $nome);    
    $sth->bindValue(':telefone', $telefone);
    $sth->bindValue(':email', $email);
    $sth->bindValue(':endereco', $endereco);
    if($sth->execute())
        echo $pdo->lastInsertId();
    else
        echo 'false';
}else{
    echo 'null';
}