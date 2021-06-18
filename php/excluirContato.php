<?php

$dados = json_decode($_POST['data'], true);
$id = $dados['id'];
$listar = $dados['listar'];

if ($id != null){
    include 'conexao.php';
    $sth = $pdo->prepare("DELETE FROM tbl_contatos WHERE contato_id = :id");
    $sth->bindValue(':id', $id);
    if($sth->execute()){
        if($listar == true)
            include 'listarContato.php';
    }
}