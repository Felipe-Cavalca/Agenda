<?php
    //conexao com banco de dados
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=bd_agenda", 'root', ''); 
    } catch (Exception $e) {
        $e->getMessage();
        echo "Não foi possivel se conectar" . $e;
        die();
    }
?>