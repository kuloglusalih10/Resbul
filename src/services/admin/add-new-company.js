import axios from "axios";
import {toast} from "react-toastify"

const addCompany = async  (_data, user_id) => {

    try{

        // let data = JSON.stringify({
        //     "name" : _data['name'],
        //     "logo" : _data['logo'],
        //     "capacity": _data['capacity'],
        //     "selfService": _data['selfService'] ? 1 : 0,
        //     "wifi": _data['selfService'] ? 1 : 0,
        //     "liveMusic": _data['liveMusic'] ? 1 : 0,
        //     "alcohol": _data['alcohol'] ? 1 : 0,
        //     "balcony": _data['balcony'] ? 1 : 0,
        //     "city": _data['city'],
        //     "district": _data['district'],
        //     "adressDesc": _data['adressDesc'],
        //     "menu": _data['menu'],
        //     "gallery": _data['gallery'],
        //     "user_id" : user_id

        // });

        const formData = new FormData();


        console.log(_data['gallery']);

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

        for(let i =0; i < _data['gallery'].length; i++){

            formData.append('gallery[]', _data['gallery'][i]);
        }

        let config = {
             method: 'POST',
             url: `${import.meta.env.VITE_API_URL}/create-new-company.php`, 
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


export default addCompany;