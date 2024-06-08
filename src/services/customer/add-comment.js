import axios from "axios";
import {toast} from "react-toastify"

const addComment = async  (name, surname, company_id, profile, content,token) => {

    try{

        const formData = new FormData();

        formData.append('name', name);
        formData.append('surname',surname);
        formData.append('profile',profile);
        formData.append('company_id', company_id);
        formData.append('content', content);
        formData.append('token', token);

        

        let config = {
            method: 'POST',
            url: `${import.meta.env.VITE_API_URL}/add-comment.php`,
            data : formData
        };
        
        
        const response  = await axios.request(config);

        return (response.data);

        
    }
    catch(error){

        return toast(error.message, {type: 'error'});
    }

}


export default addComment;