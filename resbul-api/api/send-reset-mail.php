<?php

    require_once "../database/db.php";
    require_once "../libs/settings.php";
    require_once "../libs/functions.php";
    require_once "../database/models/auth.php";
    

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        try{

            $data = json_decode(file_get_contents('php://input'), true);

            if(!isset($data['email']) && !empty(trim($data['email']))) {
    
                echo createResponse(false, "Lütfen bir email adresi girin.", []);
                exit;
            }
            else{

                
    
                $email = $data["email"];
                $token = bin2hex(random_bytes(16));
                $token_hash = hash("sha256", $token);
                $expires = date("Y-m-d H:i:s", time() + 60 * 30);
    
                $auth = new Auth();
                $user = $auth -> getUserByGoogle($email);
    
                if($user){
    
                    
                    
                    if($auth -> createResetToken($token_hash, $expires, $email)){
    
                        $mail = require "../libs/mailer.php";
                        
    
                        //$mail->setFrom("noreply@example.com");
                        $mail->setFrom('resbuloffical@gmail.com');
                        $mail->AddEmbeddedImage('../img/logo.png', 'logo');
                        $mail->addAddress($email);
                        $mail->Subject = "Reset Password";
                        $template = file_get_contents("../reset-mail-template.html");
                        //$htmlContent = str_replace('{{reset_token}}', $token, $template);
                        $htmlContent = str_replace(
                            ['{{reset_token}}', '{{backend_root_directory}}'], 
                            [$token, $_ENV['BACKEND_ROOT_FOLDER']], 
                            $template
                        );
                        $mail->Body = $htmlContent;
    
                        
                       
                        if($mail->send()){
                            echo createResponse(true,"Şifre sıfırlama maili gönderildi", []);
                        }
                        else{
    
                            echo createResponse(false,"Sıfırlama Maili Gönderilemedi ..", []);
                        }
    
                        
                    }
                    else{
                        echo createResponse(false,"Token oluşturulamadı", []);
                    }
    
                    
                }else{
                    echo createResponse(false, "Google ile giriş şifreleri sıfırlanamaz", []);
                }
    
    
                
    
            }

        }
        catch(Exception $e){

            echo createResponse(false,$e->getMessage(), []);
        }


    }
    



?>