
<?php


    class Auth extends Db{


        public function login($email, $isAdmin, $isGoogle){

            $sql = "SELECT * FROM USERS WHERE email = :email AND isAdmin = :isAdmin AND isGoogle = :isGoogle";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['email' => $email, 'isAdmin' => $isAdmin,'isGoogle'=> $isGoogle]);

            return $stmt -> fetch();
            
        }

        public function register($name, $surname, $email, $password_hash, $default_profile, $default_background, $activation_token_hash, $isAdmin, $default_description, $isGoogle){

            $sql = "INSERT INTO `USERS` (`id`, `name`, `surname`, `email`, `password`, `profile`,`background`,`account_activation_hash`,`isAdmin`,`description`, `isGoogle`) 
            VALUES (:id, :name, :surname, :email, :password, :profile, :background, :activation_token_hash , :isAdmin, :description, :isGoogle);";

    
            $stmt = $this -> connect() -> prepare($sql);

            return $stmt -> execute([
                'id' => null,
                'name' => $name,
                'surname' => $surname,
                'email' => $email,
                'password' => $password_hash,
                'profile' => $default_profile,
                'background' => $default_background,
                'activation_token_hash' => $activation_token_hash,
                'isAdmin' => $isAdmin,
                'description' => $default_description,
                'isGoogle'=> $isGoogle]);

            
        }

        public function getUserByEmail($email){

            $sql = "SELECT * FROM USERS WHERE email = :email";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['email' => $email]);

            return $stmt -> fetch();
            
        }

        public function getUserById($id){

            $sql = "SELECT * FROM USERS WHERE id = :id";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['id' => $id]);

            return $stmt -> fetch();
            
        }

        public function getImagesById($id){

            $sql = "SELECT profile, background FROM USERS WHERE id = :id ";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['id' => $id]);

            return $stmt -> fetch();
            
        }

        public function updateUserProfile($name, $surname, $description, $profile, $background, $id){

            $sql = "UPDATE USERS SET name = :name,  surname = :surname, description = :description , profile = :profile, background = :background WHERE id = :id";

    
            $stmt = $this ->connect() -> prepare($sql);
            return $stmt -> execute([

                'name' => $name,
                'surname' => $surname,
                'description' => $description,
                'profile' => $profile,
                'background' => $background,
                'id' => $id,
            ]);

            
            
        }
        public function getUserByGoogle($email){

            $sql = "SELECT * FROM USERS WHERE email = :email AND isGoogle = 0";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['email' => $email]);

            return $stmt -> fetch();
            
        }

        public function createResetToken($token, $expires, $email){

            $sql = "UPDATE USERS SET reset_token_hash = :token_hash , reset_token_expires_at = :expires WHERE email = :email";
    
            $stmt = $this ->connect() -> prepare($sql);
            return $stmt -> execute(['token_hash' => $token, 'expires' => $expires,'email' => $email]);

        }

        public function activateAccount($token){

            $sql = "UPDATE USERS SET account_activation_hash = NULL WHERE account_activation_hash = :token_hash";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['token_hash' => $token]);

            return $stmt -> fetch();
            
        }

        public function getUserByActivateToken($token){

            $sql = "SELECT * FROM USERS WHERE account_activation_hash = :token_hash";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['token_hash' => $token]);

            return $stmt -> fetch();
            
        }

        public function getUserByResetToken($token){

            $sql = "SELECT * FROM USERS WHERE reset_token_hash  = :token_hash";
    
            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['token_hash' => $token]);

            return $stmt -> fetch();
            
        }

        public function resetPassword ($token, $password_hash){

            $sql = "UPDATE USERS SET password = :password_hash , reset_token_hash = NULL, reset_token_expires_at = NULL WHERE reset_token_hash = :token_hash";

            $stmt = $this ->connect() -> prepare($sql);
            $stmt -> execute(['token_hash' => $token , 'password_hash' => $password_hash ]);

            return $stmt -> fetch();

        }




    }




?>
