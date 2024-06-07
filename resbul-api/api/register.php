<?php 

    
    require_once ("../libs/settings.php");
    require_once ('../libs/functions.php');
    require_once ("../database/db.php");
    require_once ("../database/models/auth.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST') 
    {

        try{

            $data = json_decode(file_get_contents('php://input'), true);

            
            // Frontta zaten input kontroller sağlandığı için burada bu şekilde kontrol edildi

            if(isset($data['isGoogle']) && isset($data['email']) && isset($data['password']) && isset($data['isAdmin']) && isset($data['name']) && isset($data['surname']) && !empty($data['email']) && !empty($data['password']) && !empty($data['name']) && !empty($data['surname'])){
                
                
                $name = control_input($data['name']) ;
                $surname =  control_input($data['surname']) ;
                $email = control_input($data['email']) ;
                $password =  control_input($data['password']) ;
                $isAdmin = control_input($data['isAdmin']);
                $isGoogle = control_input($data['isGoogle']);
                $default_profile = 'profile.jpeg';
                $default_description = '...';
                $default_background = 'background.jpeg';

                if(!validateInput($email) && !validateInput($password) && !validateInput($name) && !validateInput($surname)){
                    echo createResponse(false, 'Hatalı Formatta Değer girildi !', []);
                    exit;
                }

                $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);

                // Hesap onaylaması için gerekli aktivasyon tokeni

                $activation_token = bin2hex(random_bytes(16));
                $activation_token_hash = hash("sha256", $activation_token);

                
    
                $auth = new Auth();
                $user = $auth->getUserByEmail($email);
    
                if($user){

                    echo createResponse(false,"Kullanıcı zaten kayıtlı ", []);
                    exit;
                   
                }
                else{
    
                    
                    
                    if($auth->register($name,$surname,$email,$password_hash,$default_profile,$default_background,$activation_token_hash,$isAdmin,$default_description,$isGoogle)){

                        
                        $mail = require "../libs/mailer.php";
                        

                        $mail->setFrom('resbuloffical@gmail.com');
                        $mail->AddEmbeddedImage('../img/logo.png', 'logo');
                        $mail->addAddress($email);
                        $mail->Subject = "Account Activation";
                        $template = file_get_contents("../mail-template.html");
                        $htmlContent = str_replace('{{activation_token}}', $activation_token, $template);
                        $mail->Body = $htmlContent;


                        if($mail->send()){
                            echo createResponse(true,"Kayıt İşlemi Başarılı ", []);
                        }
                        else{

                            echo createResponse(false,"Doğrulama Maili Gönderilemedi ", []);
                        }
                        
                    }
                    else{
                        echo createResponse(false,"Veri Tabanı hatası", []);
                    }
                }


            }
            else{
                echo createResponse(false, "Bütün alanları doldurmalısnız", []);
            }

        }
        catch(Exception $e){

            
            echo createResponse(false,$e->getMessage(),[]);

        }

    }


?>