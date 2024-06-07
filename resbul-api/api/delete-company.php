<?php


header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once "../database/db.php";
require_once "../libs/functions.php";
require_once "../database/models/admin.php";


if($_SERVER['REQUEST_METHOD'] == 'POST') {

    
    try {

        $data = json_decode(file_get_contents('php://input'), true);

        if(isset($data['company_id']) && !empty($data['company_id']) && isset($data['menu_id']) && !empty($data['menu_id']) && isset($data['address_id']) && !empty($data['address_id'])) {

            $company_id = $data['company_id'];
            $menu_id = $data['menu_id'];
            $address_id = $data['address_id'];


            $admin = new Admin();
            $admin -> deleteCompany($menu_id, $company_id, $address_id);
            
        }
        else{
            echo createResponse(false, "Hatalı bir istekte bulundunuz");
        }


    } 
    catch (Exception $e) {
        echo createResponse(false,'Server hatası');
    }

}