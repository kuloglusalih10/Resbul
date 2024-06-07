<?php


    function createResponse($res, $message, $data = [], $isLogged = true) 
    {
        $response = 
        [
            'res' => $res,
            'message' => $message,
            'data' => $data,
            'isLogged' => $isLogged
        ];

        return json_encode($response);
    }

    function isLoggedin(){
        if(isset($_SESSION["isLogged"]) && $_SESSION["isLogged"] == true){
            return true;
        }else{
            return false;
        }
    }
    function isAdmin(){
        if(isLoggedin() && isset($_SESSION["user_type"]) && $_SESSION["user_type"] == 1){
            return true;
        }else{
            return false;
        }
    }
    

    function control_input($data){

        $data = htmlspecialchars($data);
        $data = stripslashes($data);
    
        return $data;
    }


    function save_image($file){

        
        $message = "";
        $uploadOK = true;
        $fileTempPath = $file["tmp_name"];
        $fileName = $file["name"];
        $fileSize = $file["size"];
        $maxfileSize = ((1024 * 1024) * 5); // 1MB
        $dosyaUzantilari = array("jpg","jpeg","png","JPG", "JPEG", "PNG");
        $uploadFolder = "../img/uploads/";

       
    
        // Dosya boyutunu kontrol et
        if($fileSize > $maxfileSize){
            $message = "Dosya boyutu fazla";
            $uploadOK = false;
            return array(
                "isSuccess" => false,
                "message" => $message
            );
        }
    
        $dosyaAdi_Arr = pathinfo($fileName);
        $dosyaAdi_uzantisiz = $dosyaAdi_Arr['filename'];
        $dosya_uzantisi = isset($dosyaAdi_Arr['extension']) ? $dosyaAdi_Arr['extension'] : '';

    
        // Dosya uzantısını kontrol et
        if(!in_array($dosya_uzantisi, $dosyaUzantilari)){
            $message = "Geçersiz resim uzantısı";
            $uploadOK = false;
            return array(
                "isSuccess" => false,
                "message" => $message
            );
        }
    
        // Yeni dosya adı oluştur
        $yeni_DosyaAdi = md5(time() . $dosyaAdi_uzantisiz) . '.' . $dosya_uzantisi;
        $dest_path = $uploadFolder . $yeni_DosyaAdi;
    
        // Dosyanın geçici dizine yüklenip yüklenmediğini kontrol et
        if(!is_uploaded_file($fileTempPath)){
            $message = "Geçici dosya bulunamadı.";
            return array(
                "isSuccess" => false,
                "message" => $message
            );
        }

       
    
        // Dosyayı hedef dizine taşı
        if($uploadOK){
            if(move_uploaded_file($fileTempPath, $dest_path)){
                
                return array(
                    "isSuccess" => true,
                    "message" => "Dosya yüklendi",
                    "image" => $yeni_DosyaAdi
                );
            } else {
               
                return array(
                    "isSuccess" => false,
                    "message" => "Dosya yükleme başarısız",
                );
            }
        } else {
            $message = "Dosya yüklenemedi";
            return array(
                "isSuccess" => false,
                "message" => $message
            );
        }
    }

    function save_gallery ($gallery){

        $image_names = [];

        for($i = 0; $i < count($gallery['name']); $i++){

            $message = "";
            $uploadOK = true;
            $fileTempPath = $gallery["tmp_name"][$i];
            $fileName = $gallery["name"][$i];
            $fileSize = $gallery["size"][$i];
            $maxfileSize = ((1024 * 1024) * 5); // 1MB
            $dosyaUzantilari = array("jpg","jpeg","png","JPG", "JPEG", "PNG");
            $uploadFolder = "../img/uploads/";

       
    
            // Dosya boyutunu kontrol et
            if($fileSize > $maxfileSize){
                $uploadOK = false;
                echo createResponse(false, "Galeri resmi boyutu fazla");
                exit;
            }
    
            $dosyaAdi_Arr = pathinfo($fileName);
            $dosyaAdi_uzantisiz = $dosyaAdi_Arr['filename'];
            $dosya_uzantisi = isset($dosyaAdi_Arr['extension']) ? $dosyaAdi_Arr['extension'] : '';

    
            // Dosya uzantısını kontrol et
            if(!in_array($dosya_uzantisi, $dosyaUzantilari)){
                
                $uploadOK = false;
                echo createResponse(false, "Geçersiz galeri dosyası uzantısı");
                exit;
            }
    
            // Yeni dosya adı oluştur
            $yeni_DosyaAdi = md5(time() . $dosyaAdi_uzantisiz) . '.' . $dosya_uzantisi;
            $dest_path = $uploadFolder . $yeni_DosyaAdi;
        
            // Dosyanın geçici dizine yüklenip yüklenmediğini kontrol et
            if(!is_uploaded_file($fileTempPath)){
                echo createResponse(false, "Sunucu hatası");
                exit;
            }

       
    
            // Dosyayı hedef dizine taşı
            if($uploadOK){
                if(move_uploaded_file($fileTempPath, $dest_path)){
                    
                    array_push($image_names, $yeni_DosyaAdi);

                } else {
                
                    echo createResponse(false, "Dosya yüklemede hata");
                    exit;
                }
            } else {

                echo createResponse(false, "Dosya yüklemede hata");
                exit;
            }
        }

        return $image_names;
    }
    

    function validateInput($input) 
    {
        //SQL Injection protection
        if(preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $input)) 
        {
            return false;
        }

        // XSS protection
        if(preg_match('/<[^>]*>/', $input)) 
        {
            return false;
        }

        return true;
    }

?>