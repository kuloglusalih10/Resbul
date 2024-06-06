import axios from "axios";
import {toast} from "react-toastify"

const getUserById = async (_data)=> {

    try{

        let data = JSON.stringify({
            "id": _data,
        });



        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/get-user-byId.php`, 
            data: data,
            headers:{
                'Content-Type': 'application/json', 
            },
        };
        
        
        
        const response  = await axios.request(config);

        return (response.data);

        
    }
    catch(error){
        return toast("Profil yüklenemedi", {type: 'error'});
    }
}

export default getUserById;
