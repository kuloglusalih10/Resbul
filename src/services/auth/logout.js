import axios from "axios";
import {toast} from "react-toastify"

const logout = async  (_data) => {

    try{


        let config = {
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}/logout.php`,
            headers:{
                'Content-Type': 'application/json', 
            },
        };
        
        
        const response  = await axios.request(config);

        return (response.data);

        
    }
    catch(error){

        return toast(error.message, {type: 'error'});
    }

}


export default logout;