<?php

    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/admin.php";
    require_once "../database/models/jwt.php";


    if($_SERVER['REQUEST_METHOD'] == 'POST') {


        try{

            
            if(isset($_POST['name']) && isset($_POST['company_id']) &&  isset($_POST['address_id']) && isset($_POST['description']) &&  isset($_POST['user_id']) && isset($_POST['capacity']) && isset($_POST['selfService']) && isset($_POST['wifi']) && isset($_POST['liveMusic']) && isset($_POST['alcohol']) && isset($_POST['balcony']) && isset($_POST['city']) && isset($_POST['district']) && isset($_POST['adressDesc']) && isset($_POST['menu']) && isset($_POST['token'])  ){
            
    

                $name = control_input($_POST['name']);
                $description = control_input($_POST['description']);
                $user_id = $_POST['user_id'];
                $logo = $_FILES['logo'];
                $capacity = $_POST['capacity'];
                $selfService = $_POST['selfService'];
                $wifi = $_POST['wifi'];
                $liveMusic = $_POST['liveMusic'];
                $alcohol = $_POST['alcohol'];
                $balcony = $_POST['balcony'];
                $city = control_input($_POST['city']);
                $district = control_input($_POST['district']);
                $adressDesc = control_input($_POST['adressDesc']);
                $gallery = $_FILES['gallery'];
                $menu = json_decode($_POST['menu'],true);
                $address_id = $_POST['address_id'];
                $company_id = $_POST['company_id'];
                $menu_id = $_POST['menu_id'];
                $token = $_POST['token'];


                $jwt = new JwtManager();

                if(!$jwt -> validateToken($token)){

                    echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                    
                }
                
                if(!validateInput($name) && !validateInput($adressDesc) &&!validateInput($city) &&!validateInput($district)){
                    echo createResponse(false, "Hatalı formatta veri girildi" );
                    exit;
                }

               
                $isGalleryChange = false;

                if($gallery){

                    $gallery = save_gallery($gallery);
                    $isGalleryChange = true;
                    
                }

                $isLogoChange = false;

                if(isset($_FILES['logo']) && $logo){
    
                    
                    $result = save_image($_FILES["logo"]);
                   
                    if($result['isSuccess']){
    
                        $logo = $result["image"];
                        $isLogoChange = true;
                        
                    }
                    else{
    
                       echo createResponse(false,"Logo ". $result['message'],[]);
                       exit;
    
                    }
                }

                


                            
                

                $admin = new Admin();
                $admin->updateCompany($name, $description, $user_id,$logo,$capacity,$selfService,$wifi, $liveMusic, $alcohol,$balcony, $city, $district, $adressDesc, $gallery, $menu,$isLogoChange,$isGalleryChange,$address_id,$company_id,$menu_id);
               
            
                echo createResponse(true, "işlem başarılı" );

            }
            else{
    
                echo createResponse(false, "Lütfen tüm alanları doldurunuz." );
    
            }

        }
        catch(Exception $e){

       
            echo createResponse(false, $e->getMessage(),[]);

        }




    }