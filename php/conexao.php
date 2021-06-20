<?php
    //variaveis do banco
    $arquivo = '../dados.txt';
    $handle = fopen( $arquivo, 'r' );
    $dados = fread( $handle, filesize($arquivo) );
    $dados = explode(",",$dados);

    $host = explode(" ",$dados[1]);
    $host = $host[1];
    $nomeBD = explode(" ",$dados[2]);
    $nomeBD = $nomeBD[1];
    $usuario = explode(" ",$dados[3]);
    $usuario = $usuario[1];
    $senha = explode(" ",$dados[4]);
    $senha = $senha[1];

    fclose($handle);

    //conexao com banco de dados
    try {
        $pdo = new PDO("mysql:host=".$host.";dbname=".$nomeBD, $usuario, $senha); 
    } catch (Exception $e) {
        $e->getMessage();
        echo "Não foi possivel se conectar" . $e;
        die();
    }
?>