import store from "..";
import { _setUser, _removeUser, _setIsLogged, _login ,_register, _reset_password} from ".";

export const setUser = data => store.dispatch(_setUser(data))
export const removeUser = () => store.dispatch(_removeUser())
export const setLogin = () => store.dispatch(_setIsLogged());
export const login = data => store.dispatch(_login(data));
export const register = data => store.dispatch(_register(data)); 
export const resetPassword = data => store.dispatch(_reset_password(data)); 


