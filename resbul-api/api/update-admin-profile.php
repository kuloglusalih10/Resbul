<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/auth.php";
    require_once "../database/models/jwt.php";




    if($_SERVER['REQUEST_METHOD'] == 'POST') {


        try{


            


            // Bu alanları kullanıcın girmesi zorunlu değil, fronttan default değeri geliyor , sadece gelmeme durumununu kontrol ettim

            if(isset($_POST['id']) &&  isset($_POST['token']) && !empty($_POST['id']) && isset($_POST['name']) && isset($_POST['surname']) && isset($_POST['description']) && !empty($_POST['name']) 
            && !empty($_POST['surname']) && !empty($_POST['description']) && !empty($_POST['token'])  ){

                $jwt = new JwtManager();

                if(!$jwt -> validateToken($_POST['token'])){

                    echo createResponse(false,'Önce giriş yapmalısınız',[],false);

                }

                $name = control_input($_POST['name']) ;
                $surname =  control_input($_POST['surname']) ;
                $description = control_input($_POST['description']) ;
                $id = $_POST['id'];

                $auth = new Auth();

                $images = $auth -> getImagesById($id);
    
                if($images){


                    $profile = $images -> profile;

                    $background = $images -> background;

                    if(isset($_FILES['profile'])){

                       
                         $result = save_image($_FILES["profile"]);
                        
                         if($result['isSuccess']){
                             $profile = $result["image"];
                            
                         }
                         else{
                            echo createResponse(false, $result['message'],[]);
                            exit;
                         }
                    }
                    
                    if(isset($_FILES['background'])){
                        
                        $result = save_image($_FILES["background"]);
                        
                        if($result['isSuccess']){
                            $background = $result["image"];
                        }
                        else{
                            echo createResponse(false, $result['message'],[]);
                            exit;
                        }
                    }
    

                    if($auth ->updateUserProfile($name, $surname, $description,$profile,$background, $id)){

                        $updated_user = $auth -> getUserById($id);
            
                        if($updated_user){

                            

                            $payload = [
                                "user_id" => $updated_user -> id,
                                "username" => $updated_user -> name,
                                "isAdmin" => $updated_user -> isAdmin,
                                "profile" => $updated_user -> profile,
                                "exp" => time() + 3600,             // 1 saat
                            ];

                            
                            $token = $jwt -> createToken($payload);

                            $res = array(
                                "token" => $token,
                                "user" => $updated_user
                            );

                            echo createResponse(true,"Profil Bilgileri Güncellendi", $res);

                        }
                        else{
                            echo createResponse(false, "Varitabanı hatası",[]);
                        }

                    }
                    else{
    
                        echo createResponse(false,"Veritabanı hatası", []);
    
                    }
                    
                }

            }else{

                echo createResponse(false ,"Hatalı bir istekte bulundunuz ", []);
            }


        }
        catch(Exception $e){

            echo createResponse(false,$e->getMessage(), []);
        }



    }




?>