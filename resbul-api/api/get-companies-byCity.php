<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/customer.php";
    require_once "../database/models/jwt.php";


    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        
        try {

            $data = json_decode(file_get_contents('php://input'), true);

            if(isset($data['city']) && !empty($data['city']) && isset($data['token']) && !empty($data['token'])) {

                $jwt = new JwtManager();

                if(!$jwt -> validateToken($data['token'])){

                    echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                    
                }

                $city = $data['city'];

                $customer = new Customer();
                $companies = $customer -> getCompaniesByCity($city);

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