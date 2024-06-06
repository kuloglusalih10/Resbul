import store from "..";
import {_logout,_setToken } from ".";

export const setToken = data => store.dispatch(_setToken(data));
export const setLogout = () => store.dispatch(_logout());



