import store from "..";
import { _setUser, _removeUser, _setIsLogged, _logout } from ".";

export const setUser = data => store.dispatch(_setUser(data))
export const removeUser = () => store.dispatch(_removeUser())
export const setLogin = data => store.dispatch(_setIsLogged(data));
export const setLogout = () => store.dispatch(_logout());



