<?php
use Firebase\JWT\JWT;

    require_once ('../libs/functions.php');
    require_once ("../libs/settings.php");
    require_once ("../database/db.php");
    require_once ("../database/models/auth.php");
    require_once ("../database/models/jwt.php");






    if($_SERVER['REQUEST_METHOD'] == 'POST') 
    {
        try{

            header('Content-Type: application/json');
    
            $data = json_decode(file_get_contents('php://input'), true);

    
            if(isset($data['isGoogle']) && isset($data['email']) && isset($data['isAdmin'])  && isset($data['password']) && !empty($data['email']) && !empty($data['password']) ) 
            {

                $email = control_input($data['email'] );
                $password = control_input($data['password']);
                $isAdmin = control_input($data['isAdmin']);
                $isGoogle = control_input($data['isGoogle']);

    
    
                if(!validateInput($email) && !validateInput($password)){
                    echo createResponse(false, 'Hatalı Formatta Değer girildi !', []);
                    exit;
                }
                
                $auth = new Auth();
                $user = $auth->login($email, $isAdmin, $isGoogle);


    
                if($user){
                    
                    if (password_verify($password, $user -> password) || $user -> isGoogle == 1){  // google ile girişlerde kullanıcıdan password bilgisi alınamıyor 

                        if($user -> account_activation_hash == null){  // hesap onaylımı ?

                            // JWT haslemesi brada yapılacak

                            
                            $jwt = new JwtManager();

                            $payload = [
                                "user_id" => $user -> id,
                                "username" => $user -> name,
                                "surname" => $user -> surname,
                                "isAdmin" => $user -> isAdmin,
                                "profile" => $user -> profile,
                                "exp" => time() + 3600,             // 1 saat
                            ];

                            $token = $jwt -> createToken($payload);
                            $response = array("token" => $token, "user" => $user );

                            echo createResponse(true, "Giriş başarılı", $response);

                        }else{

                            echo createResponse(false,"Önce Hesabınızı onaylamalısınız", []);
                        }

                    }
                    else{
                        echo createResponse(false,"Hatalı Şifre Girdiniz !", []);
                    }
                }
                else{
    
                    echo createResponse(false,"Kullanıcı kaydı Bulunamadı !", []);
    
                }
    
            }
    
            else{
                echo createResponse(false, 'Email ve Şifre zorunludur', []);
                exit;
            }
            
        }
        catch(Exception $e){

            echo createResponse(false, $e->getMessage(), []);

        }


    }


?>