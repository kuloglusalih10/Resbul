<?php

require_once "./database/db.php";
require_once "./database/models/auth.php";


if(isset($_GET['token']) && !empty(trim($_GET['token']))){
    
    try{

        $token = $_GET["token"];
        $token_hash = hash("sha256", $token);


        $auth = new Auth();

    
        if($auth -> getUserByActivateToken($token_hash)){

            

            if($auth ->activateAccount($token_hash)){

                die("Hesabınızı Onaylayamadık :/");

            }
           
            
        }
        else{
            die("Bu hesap zaten onaylı");
        }

    }
    catch(Exception $e){

        die("Hesabınızı Onaylayamadık :/". $e -> getMessage());

    }

}
else{
    die("Token Bulunamadı");
}

?>

<!DOCTYPE html>
    <html style="width: 100%; height: 100%; " lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resbul | Activate</title>
        </head>
        <body style="width: 100%; height: 100%; ">

            <div style="width: 100%; height: 100%;  background-color: #f8fafc; align-items: center; justify-content: center; flex-direction: column; display:flex">
                <div style="height: 20%; width: 20%">
                    <img src="./img/confetti.png" style="object-fit: contain;" width="100%"  height="100%" alt="Resbul Logo">
                </div>
                <h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 18px;  margin-top: 40px; color: #1c1e23">Hesabınız Onaylandı, Hemen kullanmaya başlayabilirsiniz</h2>
        
            </div>
            
        </body>
</html>