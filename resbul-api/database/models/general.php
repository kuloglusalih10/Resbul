<?php


    class General extends Db{


        public function getCompanybyId($id){
            try{

                $pdo = $this -> connect();
                $pdo -> beginTransaction();

                $sql="SELECT DISTINCT
                c.id,
                c.name,
                c.user_id,
                u.name as user_name,
                u.surname as user_surname,
                u.email as user_email,
                u.description as user_desc,
                u.profile as user_profile,
                u.background as user_back,
                c.logo,
                c.capacity,
                c.selfService,
                c.wifi,
                c.liveMusic,
                c.alcohol,
                c.balcony,
                c.description,
                a.city,
                a.district,
                a.address_desc,
                a.id as address_id,
                m.id as menu_id
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
                c.id = :id";

                $comp_stmt=$pdo->prepare($sql);
                $comp_stmt->execute(['id' => $id]);
                $company =  $comp_stmt -> fetch();

                if($company){

                    $menu_sql = "SELECT * FROM `menus` m LEFT JOIN foods f on m.id = f.menu_id where m.company_id = :id";
                    $menu_stmt = $pdo -> prepare($menu_sql);
                    $menu_stmt->execute(["id"=> $id]);
                    $menu = $menu_stmt -> fetchAll(PDO::FETCH_ASSOC);

                    if($menu){

                        $gallery_sql = "SELECT * FROM `images` WHERE company_id = :id";
                        $gallery_stmt = $pdo -> prepare($gallery_sql);
                        $gallery_stmt->execute(["id"=> $id]);
                        $gallery = $gallery_stmt -> fetchAll(PDO::FETCH_ASSOC);

                        if($gallery){


                            $comments_sql="SELECT DISTINCT * from comments c where company_id=:company_id AND c.id IS NOT NULL;";

                            $comments_stmt=$this->connect()->prepare($comments_sql);
                            $comments_stmt->execute(['company_id' => $id]);
                            $comments = $comments_stmt->fetchAll(PDO::FETCH_ASSOC);

                            $pdo -> commit();
                            $response = array("company" => $company, "menu" => $menu , "gallery" => $gallery, "comments" => $comments);
                            echo createResponse(true, "İşletme yüklendi", $response);
                            exit;
                            
                        }
                        else{

                            echo createResponse(false, "Resim bilgisi bulunamadı");
                            exit;
                        }

                    }
                    else{

                        echo createResponse(false, "Menü bilgisi bulunamadı");
                        exit;
                    }

                }
                else{

                    echo createResponse(false, "İşletme bilgisi bulunamadı");
                    exit;
                }
            }
            catch(Exception $e){
                
                echo createResponse(false, "Veritabanı hatası");
                exit;
            }
        }

    }