import { IoStorefrontOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";



export const ADMİN_NAVBAR = [
    {
        path: '/admin/add',
        title: 'Ekle',
        icon : <IoStorefrontOutline size={21}/>
    },
    {
        path: '/admin/',
        title: 'Liste',
        icon : <GoListUnordered size={21}/>
    },
]