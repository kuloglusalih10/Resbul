import axios from "axios";
import {toast} from "react-toastify"

const getCompaniesByCity = async (_data)=> {

    try{

        let data = JSON.stringify({
            "city": _data,
        });



        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/get-companies-byCity.php`, 
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
        return toast("İşletmeler listelenemedi", {type: 'error'});
    }
}

export default getCompaniesByCity;