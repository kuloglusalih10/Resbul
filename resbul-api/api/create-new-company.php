<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/admin.php";
    require_once "../database/models/customer.php";
    require_once "../database/models/jwt.php";


    if($_SERVER['REQUEST_METHOD'] == 'POST') {


        try{

            $jwt = new JwtManager();

            if(!$jwt -> validateToken($_POST['token'])){

                echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                exit;
                
            }

            // değerler frontta zaten kotrnol ediliyor burda sadece genel bi kontrol sağlandı
            
            if(isset($_POST['name']) && isset($_POST['description']) &&  isset($_POST['user_id']) && isset($_POST['capacity']) && isset($_POST['selfService']) && isset($_POST['wifi']) && isset($_POST['liveMusic']) && isset($_POST['alcohol']) && isset($_POST['balcony']) && isset($_POST['city']) && isset($_POST['district']) && isset($_POST['adressDesc']) && isset($_POST['menu']) && isset($_FILES['gallery']) ){
            
    

                $name = control_input($_POST['name']);
                $description = control_input($_POST['description']);
                $user_id = $_POST['user_id'];
                $logo = $_POST['logo'];
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

                
    
                
                if(!validateInput($name) && !validateInput($adressDesc) &&!validateInput($city) &&!validateInput($district)){
                    echo createResponse(false, "Hatalı formatta veri girildi" );
                    exit;
                }

               
               
                // tekli resim kaydetme
    
                if(isset($_FILES['logo'])){
    
                           
                    $result = save_image($_FILES["logo"]);
                   
                    if($result['isSuccess']){
    
                        $logo = $result["image"];
                        
                    }
                    else{
    
                       echo createResponse(false,"Logo ". $result['message'],[]);
                       exit;
    
                    }
                }


                            
                // gallery kaydetme tekli resim kaydetmeden farklı olarak bir dizi içerisindeki resimler kayıt ediliyor

                $gallery = save_gallery($gallery);
                

                $admin = new Admin();
                $admin->addCompany($name, $description, $user_id,$logo,$capacity,$selfService,$wifi, $liveMusic, $alcohol,$balcony, $city, $district, $adressDesc, $gallery, $menu);
               
            
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