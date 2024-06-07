<?php 

    try{

        require_once "./database/db.php";
        require_once "./libs/functions.php";
        require_once "./database/models/auth.php";

        if($_SERVER['REQUEST_METHOD'] == 'GET') {

            $token = $_GET["token"];

            session_start();

            $_SESSION['token'] = $token;

            if(isset($_GET["token"]) && !empty(trim($_GET['token']))) {

                


                $token_hash = hash("sha256", $token);
               
                $auth  = new Auth();

                $user = $auth -> getUserByResetToken($token_hash);
                
                
            
                if($user) {
                    
                    if (strtotime($user -> reset_token_expires_at) <= time()) {

                        die("Token süresi dolmuş");
                    }

                }else{

                    die("Kullanıcı kaydı bulunamadı");
                }
            }

            else{
                die("Token bulunamadı");
            }
        }


        else if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
                $password = $rePassword = "";
                $password_err = $rePassword_err = "";
                
                if(isset($_POST['password']) && !empty(trim($_POST['password'])) && isset($_SESSION['token']) && !empty(trim($_SESSION['token'])) && isset($_POST['rePassword']) && !empty(trim($_POST['rePassword']))) {
                    
                    if (strlen($_POST["password"]) < 6) {
                        $password_err = "Şifre en az 6 karakter olmalı";
                        $rePassword_err = "";
                        
                    }else{

                        if ($_POST["password"] !== $_POST["rePassword"]) {
                            
                            $password_err = "";
                            $rePassword_err = "Şifreler Eşleşmiyor";
                            
                        }

                        else{

                            $token_hash = hash("sha256", $_SESSION['token']);
                            $password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                            
                            $auth = new Auth();
                            
        
                            if($auth ->resetPassword($token_hash, $password_hash)) {
        
                                die("Sunuc hatası !");
        
                            }
                            else{

                                header('Location: success-reset-mail.html');
                            }

                        }

                    }
        
                }else{
        
                    $password_err = "Şifre alanı zorunludur";
                    $rePassword_err = "Şifre tekrar alanı zorunludur";
                }
                
        }
    }

    catch(Exception $e){
        echo $e->getMessage();
    }



?>


<!DOCTYPE html>
<html style="width: 100%; height: 100%;" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f8fafc;">

    <div style="width: 40%; height: 60%; display: flex; align-items: center; border: 1px; border-style: solid; border-color: #959292; border-radius: 8px; justify-content: center; flex-direction: column; background-color: #fff;">
        
        <div style="height: 50%; display: flex; align-items: center; justify-content: center;  width: 100%;">
            <div style="height: 30%; width: 30%">
                <img src="./img/logo.png" style="object-fit: contain;" width="100%"  height="100%" alt="Resbul Logo">
            </div>
        </div>

        <form method="post" action="reset-password-form.php" style="height: 50%; display: flex; align-items: center; justify-content: start; flex-direction: column;  width: 100%;">

            <div style="width: 70%; height: max-content;">
                <input type="password" name="password" placeholder="Yeni Şifre" style=" width: 100%; border: 1px solid rgba(211, 211, 211, 0.5); background-color: white;  border-radius: 0.375rem;  outline: none; padding-top: 0.625rem;  padding-bottom: 0.625rem;  padding-left: 0.5rem;  padding-right: 0.5rem; margin-top: 1rem;  display: flex; align-items: center; justify-content: center;"/>
                <span style="margin-top: 5px; font-size: 12px; color: red;"><?php echo $password_err?></span>
            </div>
            <div style="width: 70%; height: max-content;">
                <input type="password" name="rePassword" placeholder="Yeni Şifre Tekrar" style=" width: 100%; border: 1px solid rgba(211, 211, 211, 0.5); background-color: white;  border-radius: 0.375rem;  outline: none; padding-top: 0.625rem;  padding-bottom: 0.625rem;  padding-left: 0.5rem;  padding-right: 0.5rem; margin-top: 1rem;  display: flex; align-items: center; justify-content: center;"/>
                <span style="margin-top: 5px; font-size: 12px; color: red;"><?php echo $rePassword_err?></span>
            </div>
            
            <button type="submit" style="border: none;  margin-top: 45px; outline: none; align-items: center; justify-content: center; flex-direction: column; display:flex ; text-align: center; color: #fff; border-radius:  8px; padding-top: 20px;  padding-bottom: 20px; padding-left: 27px; padding-right: 27px; background-color: #32ACFF; text-decoration: none;  width: 40%; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; height: 30px; " href="">Kaydet</button>

        </form>

    </div>

</body>
</html>