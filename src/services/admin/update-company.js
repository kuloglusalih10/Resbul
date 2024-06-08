import axios from "axios";
import {toast} from "react-toastify"

const updateCompany = async  (_data, user_id,address_id,company_id,menu_id,token) => {

    try{


        const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('name', _data['name']);
        formData.append('logo', _data['logo']);
        formData.append('capacity', _data['capacity']);
        formData.append('description', _data['description']);
        formData.append('selfService', _data['selfService']? 1 : 0);
        formData.append('wifi', _data['wifi'] ? 1 : 0);
        formData.append('liveMusic', _data['liveMusic']? 1 : 0);
        formData.append('alcohol', _data['alcohol']? 1 : 0);
        formData.append('balcony', _data['balcony']? 1 : 0);
        formData.append('city', _data['city']);
        formData.append('district', _data['district']);
        formData.append('adressDesc', _data['adressDesc']);
        formData.append('menu', JSON.stringify(_data['menu']));
        formData.append('address_id', address_id);
        formData.append('company_id', company_id);
        formData.append('menu_id', menu_id);
        formData.append('token', token);
        

        if(_data['gallery'] == null){

            formData.append('gallery', null);

        }
        else{

            for(let i =0; i < _data['gallery'].length; i++){
    
                formData.append('gallery[]', _data['gallery'][i]);
            }

        }


        let config = {
             method: 'POST',
             url: `${import.meta.env.VITE_API_URL}/update-company.php`, 
             data : formData
         };
        
         const response  = await axios.request(config);

         console.log(response);

         return (response.data);

        
    }
    catch(error){

        return toast(error.messgae, {type: 'error'});
    }

}


export default updateCompany;