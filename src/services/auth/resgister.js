import axios from "axios";
import {toast} from "react-toastify"

const register = async  (_data) => {

    try{
        //axios.defaults.withCredentials = true;

        let data = JSON.stringify({
            "name" : _data['name'],
            "surname" : _data['surname'],
            "email": _data['email'],
            "password": _data['password'],
            "isAdmin": _data['isAdmin'],
            "isGoogle" : _data['isGoogle']
        });


        let config = {
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/register.php`,
            headers:{
                'Content-Type': 'application/json', 
            },
            data : data
        };
        
        
        const response  = await axios.request(config);

        return (response.data);

        
    }
    catch(error){

        return toast(error.message, {type: 'error'});
    }

}


export default register;