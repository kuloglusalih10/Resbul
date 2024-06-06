import axios from "axios";
import {toast} from "react-toastify"

const deleteCompany = async (menu_id, company_id , addres_id)=> {

    try{

       
        let data = JSON.stringify({

            "company_id": company_id,
            "menu_id": menu_id,
            "address_id": addres_id,

        });



        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/delete-company.php`, 
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

export default deleteCompany;