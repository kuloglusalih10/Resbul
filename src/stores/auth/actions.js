import store from "..";
import { _setUser, _removeUser, _setIsLogged, _login } from ".";

export const setUser = data => store.dispatch(_setUser(data))
export const removeUser = () => store.dispatch(_removeUser())
export const setLogin = () => store.dispatch(_setIsLogged());
export const login = data => store.dispatch(login(data)); 