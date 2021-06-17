<?php

include 'conexao.php';

$sth = $pdo->prepare("SELECT * FROM tbl_contatos");
$sth->execute();
$json_str = '[';
foreach ($sth as $res) {
    extract($res);
    $json_str .= '{"id":'.$contato_id.' , "nome":"'.$contato_nome.'", "telefone":"'.$contato_telefone.'", "email":"'.$contato_email.'", "endereco":"'.$contato_endereco.'" },';
}
$json_str = rtrim($json_str, ',');
$json_str .= ']';

echo $json_str;