<?php

$dados = json_decode($_POST['data'], true);
$nome = $dados['nome'];
$telfone = $dados['telefone'];
$email = $dados['email'];
$endereco = $dados['endereco'];

if ($nome != null){
    include 'conexao.php';
    $Dados = array(
        'contato_nome'     => $nome,
        'contato_telefone' => $telfone,
        'contato_email'    => $email,
        'contato_endereco' => $endereco,
    );
    $Fields = implode(', ', array_Keys($Dados));
    $Places = ':' . implode(', :', array_keys($Dados));
    $Tabela = 'tbl_contatos';
    $Create = "INSERT INTO {$Tabela} ({$Fields}) VALUES ({$Places})";
    $sth = $pdo->prepare($Create);
    if ($sth->execute($Dados)){
        echo 'true';
    }else{
        echo 'false';
    }
}else{
    echo 'null';
}