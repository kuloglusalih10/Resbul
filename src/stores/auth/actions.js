import store from "..";
import { _setUser, _removeUser, _setIsLogged } from ".";

export const setUser = data => store.dispatch(_setUser(data))
export const removeUser = () => store.dispatch(_removeUser())
export const setLogin = () => store.dispatch(_setIsLogged());



