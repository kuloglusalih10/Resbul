<?php


    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/auth.php";

    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        try {

            $data = json_decode(file_get_contents('php://input'), true);

            if(isset($data['id']) && !empty($data['id'])) {

                $comp_id = $data['id'];

                $auth = new Auth();
                $user = $auth -> getUserById($comp_id);

                if($user) {

                    echo createResponse(true,'Profil yüklendi', $user);

                }
                else{
                    echo createResponse(false,'Kayıtlı kullanıcı bulunamadı');
                }

            }
            else{
                echo createResponse(false, "Hatalı bir istekte bulundunuz");
            }


        } 
        catch (Exception $e) {
            echo createResponse(false,'Server hatası');
        }


    }