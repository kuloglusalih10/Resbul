<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/admin.php";
    require_once "../database/models/jwt.php";

    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        
        try {

            $data = json_decode(file_get_contents('php://input'), true);

            if(isset($data['user_id']) && !empty($data['user_id']) && isset($data['token']) && !empty($data['token'])) {

                $jwt = new JwtManager();

                if(!$jwt -> validateToken($data['token'])){

                    echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                    
                }


                $user_id = $data['user_id'];

                $admin = new Admin();
                $companies = $admin -> getCompaniesbyUser($user_id);

                echo createResponse(true,'İşletmeleriniz yüklendi', $companies);

            }
            else{
                echo createResponse(false, "Hatalı bir istekte bulundunuz");
            }


        } 
        catch (Exception $e) {
            echo createResponse(false,'Server hatası');
        }

    }