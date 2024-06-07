import axios from "axios";
import {toast} from "react-toastify"

const getCompanyById = async (_data, token)=> {

    try{

        let data = JSON.stringify({
            "id": _data,
            "token" : token
        });


        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/get-company-byId.php`, 
            data: data,
            headers:{
                'Content-Type': 'application/json', 
            },
        };
        
        
        const response  = await axios.request(config);
        
        console.log(response.data);
        return (response.data);

        
    }
    catch(error){
        return toast("İşletme Yüklenemedi", {type: 'error'});
    }
}

export default getCompanyById;