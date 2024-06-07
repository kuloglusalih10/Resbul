<?php

 
    class Customer extends Db{

        public function getCompaniesByCity($city){

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
                a.city = :city
                AND c.id IS NOT NULL;";

                $stmt=$this->connect()->prepare($sql);
                $stmt->execute(['city' => $city]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            catch(Exception $e){

                echo createResponse(false, "Veritabanı hatası");
                exit;
            }


        }

        public function addComment($name, $surname, $company_id, $content,$profile){

            try{
    
                $sql = "INSERT INTO `comments` (`company_id`, `user_name`,`user_surname`,`user_profile`, `content` )  VALUES (:company_id,:name, :surname,:profile, :content );";
                $stmt = $this -> connect() -> prepare($sql);

                return $stmt -> execute([
                    'company_id' => $company_id,
                    'name' => $name,
                    'surname' => $surname,
                    'profile' => $profile,
                    'content' => $content
                ]);

                 

            }
            catch(PDOException $e){

                echo createResponse(false,$e->getMessage());
                exit();


            }
        }
    }