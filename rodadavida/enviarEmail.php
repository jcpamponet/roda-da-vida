<?php

    $servername = "mysql.hostinger.com.br";
    $username = "u655240424_vcrzy";
    $password = "1233212";
    $dbname = "u655240424_admin";
    // Definimos o cabeçalho do email
    $para = $_POST['email'];
    $assunto = 'Resultado do teste roda da vida';
    // Agora definimos a mensagem que vai ser enviado no e-mail 
    $mensagem = "<h2 style='margin-left:40px;'><strong>Resultado </strong></h2>".$_POST['mensagem']; 

    // Abrindo conexão
    $conn = mysql_connect($servername, $username, $password);
    $db = mysql_select_db($dbname,$conn);

    $sql = "INSERT INTO rodadavida (email) VALUES('" . $_POST['email'] . "')";
    echo $sql;

    // Inserindo os dados no banco
    if (!mysql_query($sql)) {
         echo "Error: " . $sql . "<br>";
    }else{
        $gestaoAssunto = "Novo email registrado pelo roda da vida.";
        $gestaoMensagem = "<h2 style='margin-left:15px;'><strong>Novo email cadastrado: </strong></h2>".$_POST['email'];
        $headersG = "Content-Type:text/html; charset=UTF-8\n"; 
        $headersG .= "From: gestaopessoal@gestaopessoal.net<gestaopessoal@gestaopessoal.net>\n"; 
        $headersG .= "X-Sender: <gestaopessoal@gestaopessoal.net>\n"; //email do servidor //que enviou 
        $headersG .= "X-Mailer: PHP v".phpversion()."\n"; 
        $headersG .= "X-IP: ".$_SERVER['REMOTE_ADDR']."\n"; 
        $headersG .= "Return-Path: <gestaopessoal@gestaopessoal.net>\n"; //caso a msg //seja respondida vai para este email. 
        $headersG .= "MIME-Version: 1.0\n"; 
        $enviadoG = mail('julianocunha@gestaopessoal.net,julianoclinica@gmail.com', $gestaoAssunto, $gestaoMensagem, $headersG); //função que faz o envio do email. 
    }

    // Agora inserimos as codificações corretas e tudo mais. 
    $headers = "Content-Type:text/html; charset=UTF-8\n"; 
    $headers .= "From: gestaopessoal@gestaopessoal.net<gestaopessoal@gestaopessoal.net>\n"; 
    $headers .= "X-Sender: <gestaopessoal@gestaopessoal.net>\n"; //email do servidor //que enviou 
    $headers .= "X-Mailer: PHP v".phpversion()."\n"; 
    $headers .= "X-IP: ".$_SERVER['REMOTE_ADDR']."\n"; 
    $headers .= "Return-Path: <gestaopessoal@gestaopessoal.net>\n"; //caso a msg //seja respondida vai para este email. 
    $headers .= "MIME-Version: 1.0\n"; 
    $enviado = mail($para, $assunto, $mensagem, $headers); //função que faz o envio do email. 

?>



