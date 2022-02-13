import { createContext } from "react";
//defining context
export const UserContext = createContext({user:null, username:null, isAdmin:false})