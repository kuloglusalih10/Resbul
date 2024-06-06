import axios from "axios";
import {toast} from "react-toastify"

const getDistricts = async (_data)=> {

    try{


        let config = {
            method: 'GET',
            url: `${import.meta.env.VITE_CITIES_API}/provinces?name=${_data}`,
        };
        
        
        const response  = await axios.request(config);

        
        return (response.data.data[0].districts);

        
    }
    catch(error){
        return toast("İlçe bilgileri getirilemedi", {type: 'error'});
    }
}

export default getDistricts;