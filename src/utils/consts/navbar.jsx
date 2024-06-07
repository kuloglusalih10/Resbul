import { IoStorefrontOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { FiMap } from "react-icons/fi";



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

export const CUSTOMER_NAVBAR = [
   
    {
        path: '/customer/',
        title: 'Harita',
        icon : <FiMap size={21}/>
    },
]