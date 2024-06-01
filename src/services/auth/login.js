import axios from "axios";
import {toast} from "react-toastify"

const login = async (_data)=> {

    try{

        //axios.defaults.withCredentials = true;

        let data = JSON.stringify({
            "email": _data['email'],
            "password": _data['password'],
            "isAdmin": _data['isAdmin'],
            "isGoogle" : _data['isGoogle']
        });

        let config = {
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/login.php`,
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

export default login;