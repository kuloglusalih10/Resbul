import { useSelector } from "react-redux";

export const useAuth = () => useSelector(state => state.auth.user);
export const isLogin = () => useSelector(state => state.auth.isLogged);
export const status = () => useSelector(state => state.auth.status);
export const message = ()=> useSelector(state => state.auth.message);
export const isRegister = () => useSelector(state => state.auth.isRegister);
export const isMailSend = ()=> useSelector(state => state.auth.isMailSend);
export const mailStatus = () => useSelector(state => state.auth.mailStatus);