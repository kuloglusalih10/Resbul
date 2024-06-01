import axios from "axios";
import {toast} from "react-toastify"

const resetPassword = async (_data) => {
    try{

        //axios.defaults.withCredentials = true;

        let data = JSON.stringify({
            "email": _data,
        });

        let config = {
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/send-reset-mail.php`,
            headers:{
                'Content-Type': 'application/json', 
               
            },
            data : data
        };
        
        
        const response  = await axios.request(config);


        return (response.data);

        
    }
    catch(error){
        toast(error.message, {type: 'error'});
    }
}

export default resetPassword