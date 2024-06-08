<?php
    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once "../database/db.php";
    require_once "../libs/functions.php";
    require_once "../database/models/customer.php";
    require_once "../database/models/jwt.php";


    if($_SERVER['REQUEST_METHOD'] == 'POST') {


        try{

            $jwt = new JwtManager();

            if(!$jwt -> validateToken($_POST['token'])){

                echo createResponse(false,'Önce giriş yapmalısınız',[],false);
                exit;
                
            }

            
            if(isset($_POST['company_id'])&& isset($_POST['profile']) && isset($_POST['name']) && isset($_POST['surname'])  && isset($_POST['content']) ){
            
    

                $name = control_input($_POST['name']);
                $surname = control_input($_POST['surname']);
                $company_id = control_input($_POST['company_id']);
                $content = control_input($_POST['content']);
                $profile = control_input($_POST['profile']);

                
                if(!validateInput($name) && !validateInput($surname) &&!validateInput($content) ){

                    echo createResponse(false, "Hatalı formatta veri girildi" );
                    exit;

                }


                $customer = new Customer();

                $customer->addComment($name,$surname,$company_id,$content,$profile);
                echo createResponse(true, "Yorum eklendi" );

            }
            else{
    
                echo createResponse(false, "Lütfen tüm alanları doldurunuz." );
    
            }

        }
        catch(Exception $e){

       
            echo createResponse(false, $e->getMessage(),[]);

        }




    }