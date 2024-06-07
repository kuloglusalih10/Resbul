import axios from "axios";
import {toast} from "react-toastify"

const updateAdminProfile = async  (_data) => {

    try{

        const formData = new FormData();

        formData.append('id', _data['id']);
        formData.append('name', _data['name']);
        formData.append('surname', _data['surname']);
        formData.append('profile', _data['profile']);
        formData.append('description', _data['description']);
        formData.append('background', _data['background']);



        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/update-admin-profile.php`,
            data : formData
        };
        
        
        const response  = await axios.request(config);
        console.log(response.data);

        return (response.data);

        
    }
    catch(error){

        return toast(error.message, {type: 'error'});
    }

}


export default updateAdminProfile;