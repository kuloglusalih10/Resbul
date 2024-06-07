import axios from "axios";
import {toast} from "react-toastify"

const getCompanies = async (_data,token)=> {

    try{

        let data = JSON.stringify({
            "user_id": _data,
            "token" : token
        });



        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/get-companies-byUser.php`, 
            data: data,
            headers:{
                'Content-Type': 'application/json', 
            },
        };
        
        
        
        const response  = await axios.request(config);
        
        console.log(response);
        return (response.data);

        
    }
    catch(error){
        return toast(error.message, {type: 'error'});
    }
}

export default getCompanies;