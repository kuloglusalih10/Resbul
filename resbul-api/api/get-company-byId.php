<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/general.php";
    require_once "../database/models/jwt.php";



    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        
        try {

            $data = json_decode(file_get_contents('php://input'), true);

            if(isset($data['id']) && !empty($data['id']) && isset($data['token']) && !empty($data['token'])) {

                $comp_id = $data['id'];

                $jwt = new JwtManager();

                if(!$jwt -> validateToken($data['token'])){

                    echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                    
                }

                $general = new General;
                $general -> getCompanybyId($comp_id);
                
            }
            else{
                echo createResponse(false, "Hatalı bir istekte bulundunuz");
            }


        } 
        catch (Exception $e) {
            echo createResponse(false,'Server hatası');
        }

    }