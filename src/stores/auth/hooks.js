import { useSelector } from "react-redux";

export const useAuth = () => useSelector(state => state.auth.user);
export const isLogin = () => useSelector(state => state.auth.isLogged);

