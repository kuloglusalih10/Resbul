<?php

 
    class Admin extends Db{


        

        public function getCompaniesbyUser($id){

            try{

                $sql="SELECT DISTINCT
                c.id,
                c.name,
                c.description,
                c.user_id,
                c.logo,
                c.capacity,
                c.selfService,
                c.wifi,
                c.liveMusic,
                c.alcohol,
                c.balcony,
                a.city,
                a.district,
                a.address_desc
            FROM 
                users u
            LEFT JOIN 
                companies c on c.user_id = u.id
            LEFT JOIN 
                addresses a ON a.id = c.address_id
            LEFT JOIN 
                images i ON i.company_id = c.id
            LEFT JOIN 
                menus m ON c.id = m.company_id
            LEFT JOIN 
                foods f ON f.menu_id = m.id
            LEFT JOIN 
                categories ca ON f.cate_id = ca.id
            WHERE 
                u.id = :id
                AND c.id IS NOT NULL;";

                $stmt=$this->connect()->prepare($sql);
                $stmt->execute(['id' => $id]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            catch(Exception $e){

                echo createResponse(false, "Veritabanı hatası");
                exit;
            }
            
        }


        public function addCompany($name, $description, $user_id, $logo, $capacity, $selfService, $wifi, $liveMusic, $alcohol, $balcony, $city, $district, $adressDesc, $gallery, $menu){

            try{

                $pdo = $this -> connect();
                $pdo -> beginTransaction();   // Transaction yapısı kullanılarak hata durumları yönetildi


                //  addresses tablosuna ekleme
            
                
    
                $sql = "INSERT INTO `addresses` ( `city`,`district`, `address_desc`)  VALUES (:city, :district, :address_desc );";
                $add_menus_stmt = $pdo -> prepare($sql);
                $add_menus_stmt -> execute(['city' => $city,'district' => $district, 'address_desc' => $adressDesc]);

                $address_id = $pdo -> lastInsertId();

               
                
                // companies tablosuna ekleme


                $sql = "INSERT INTO `companies` ( `name`,`description`, `user_id`, `logo`, `capacity`, `selfService`,`wifi`,`liveMusic`,`alcohol`,`balcony`,`address_id`) 
                VALUES (:name,:description, :user_id, :logo, :capacity, :selfService, :wifi, :liveMusic , :alcohol, :balcony, :address_id);";
    
        
                $add_comp_stmt = $pdo -> prepare($sql);
                $add_comp_stmt -> execute([
    
                    'name' => $name,
                    'description' => $description,
                    'user_id' => $user_id,
                    'logo' => $logo,
                    'capacity' => $capacity,
                    'selfService' => $selfService,
                    'wifi' => $wifi,
                    'liveMusic' => $liveMusic,
                    'alcohol' => $alcohol,
                    'balcony' => $balcony,
                    'address_id' => $address_id
    
                ]);

                $company_id = $pdo -> lastInsertId();

                
    
                //  Menus tablosuna ekleme

        
                
    
                $sql = "INSERT INTO `menus` ( `company_id`)  VALUES (:id );";
                $add_menus_stmt = $pdo -> prepare($sql);
                $add_menus_stmt -> execute(['id' => $company_id]);

                $menu_id = $pdo -> lastInsertId();

                

                // foods tablosuna ekleme 

                

                for($i = 0; $i < count($menu); $i++){

                    $sql = "INSERT INTO `foods` ( `menu_id`,`cate_id`,`name`, `price`)  VALUES (:menu_id , :cate_id, :name, :price);";
                    $add_food_stmt = $pdo -> prepare($sql);
                    $add_food_stmt -> execute(['menu_id' => $menu_id,'cate_id' => $menu[$i]['category'],'name' => $menu[$i]['food'],'price' => $menu[$i]['price']]);

                }

  

                


                // images tablosuna ekleme

                $sql = "INSERT INTO `images` ( `company_id`,`image`)  VALUES (:company_id , :image );";
                $add_menus_stmt = $pdo -> prepare($sql);

                for($i = 0; $i < count($gallery); $i++){

                    $add_menus_stmt -> execute(['company_id' => $company_id,'image' => $gallery[$i]]);

                }


                $pdo -> commit();
                

            }
            catch(PDOException $e){

               

                $pdo -> rollBack();
                echo createResponse(false,$e->getMessage());
                exit();


            }



            
        }

        public function deleteCompany($menu_id, $company_id,$address_id){

            try{

                $pdo = $this -> connect();
                $pdo -> beginTransaction(); 
    
                $sql = "DELETE FROM foods WHERE menu_id = :menu_id";
                $delete_foods_stmt = $pdo -> prepare($sql);
                $delete_foods_stmt -> execute(['menu_id' => $menu_id]);

                
    
                $sql = "DELETE FROM menus where id = :id";
                $delete_menu_stmt = $pdo -> prepare($sql);
                $delete_menu_stmt -> execute(['id' => $menu_id]);

               

                $sql = "DELETE FROM images where company_id = :company_id";
                $delete_images_stmt = $pdo -> prepare($sql);
                $delete_images_stmt -> execute(['company_id' => $company_id]);


                $sql = "DELETE FROM comments where company_id = :company_id";
                $delete_comments_stmt = $pdo -> prepare($sql);
                $delete_comments_stmt -> execute(['company_id' => $company_id]);


                $sql = "DELETE FROM companies where id = :company_id";
                $delete_company_stmt = $pdo -> prepare($sql);
                $delete_company_stmt -> execute(['company_id' => $company_id]);

                

                $sql = "DELETE FROM addresses where id = :address_id";
                $delete_address_stmt = $pdo -> prepare($sql);
                $delete_address_stmt -> execute(['address_id' => $address_id]);


                $pdo -> commit();
                echo createResponse(true,"Silme İşlemi başarılı");
                exit;


            }
            catch(PDOException $e){

               

                echo createResponse(false,"Veritabanı hatası");
                $pdo -> rollBack();
                exit();


            }



        }

        public function updateCompany($name, $description, $user_id, $logo, $capacity, $selfService, $wifi, $liveMusic, $alcohol, $balcony, $city, $district, $adressDesc, $gallery,$menu, $isLogoChange, $isGalleryChange,$address_id,$company_id, $menu_id){

            try{

                $pdo = $this -> connect();
                $pdo -> beginTransaction(); 

                // adresses tablosunu güncelleme

                $sql = "UPDATE `addresses` SET `city` = :city, `district` = :district, `address_desc` = :address_desc WHERE `id` = :id";
                $update_stmt = $pdo->prepare($sql);
                $update_stmt->execute([
                    'city' => $city,
                    'district' => $district,
                    'address_desc' => $adressDesc,
                    'id' => $address_id
                ]);


                // companies tablosunu güncelleme

                $sql = "UPDATE `companies` 
                        SET `name` = :name, 
                            `description` = :description, 
                            `user_id` = :user_id, 
                            `capacity` = :capacity, 
                            `selfService` = :selfService, 
                            `wifi` = :wifi, 
                            `liveMusic` = :liveMusic, 
                            `alcohol` = :alcohol, 
                            `balcony` = :balcony, 
                            `address_id` = :address_id 
                        WHERE `id` = :id";

                

                $update_comp_stmt = $pdo->prepare($sql);
                $update_comp_stmt->execute([
                    'name' => $name,
                    'description' => $description,
                    'user_id' => $user_id,
                    'capacity' => $capacity,
                    'selfService' => $selfService,
                    'wifi' => $wifi,
                    'liveMusic' => $liveMusic,
                    'alcohol' => $alcohol,
                    'balcony' => $balcony,
                    'address_id' => $address_id,
                    'id' => $company_id
                ]);

                // logo güncelleme

                if($isLogoChange){

                    $sql = "UPDATE `companies` SET `logo` = :logo WHERE `id` = :id";
                    $update_comp_stmt = $pdo->prepare($sql);
                    $update_comp_stmt->execute([ 'logo' => $logo, 'id' => $company_id ]);
                   
                }

                // foods tablosnu güncelleme

                $sql = "DELETE FROM foods WHERE menu_id = :menu_id";
                $delete_foods_stmt = $pdo -> prepare($sql);
                $delete_foods_stmt->execute(["menu_id" => $menu_id]);

                $sql = "INSERT INTO `foods` ( `menu_id`,`cate_id`,`name`, `price`)  VALUES (:menu_id , :cate_id, :name, :price);";
                $add_food_stmt = $pdo -> prepare($sql);

                for($i = 0; $i < count($menu); $i++){

                    $add_food_stmt -> execute(['menu_id' => $menu_id,'cate_id' => $menu[$i]['category'] ?? $menu[$i]['cate_id'],'name' => $menu[$i]['food'] ?? $menu[$i]['name'],'price' => $menu[$i]['price']]);

                }


                // images tablosunu güncelleme

                if($isGalleryChange){

                    $sql = "DELETE FROM images WHERE company_id = :company_id";
                    $delete_images_stmt = $pdo -> prepare($sql);
                    $delete_images_stmt->execute(["company_id" => $company_id]);

                    $sql = "INSERT INTO `images` ( `company_id`,`image`)  VALUES (:company_id , :image );";
                    $add_menus_stmt = $pdo -> prepare($sql);
                    
                    for($i = 0; $i < count($gallery); $i++){
    
                        $add_menus_stmt -> execute(['company_id' => $company_id,'image' => $gallery[$i]]);
    
                    }

                }


                $pdo ->commit();




            }
            catch(PDOException $e){

                $pdo -> rollBack();
                echo createResponse(false,$e->getMessage());
                exit();

            }

        }

    }