import axios from "axios";
import {toast} from "react-toastify"

const getCities = async (_data)=> {

    try{


        let config = {
            method: 'GET',
            url: `${import.meta.env.VITE_CITIES_API}${_data}`,
        };
        
        
        const response  = await axios.request(config);
        
        return (response.data.data);

        
    }
    catch(error){
        return toast("Şehir bilgileri getirilemedi", {type: 'error'});
    }
}

export default getCities;