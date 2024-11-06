import { useContext } from "react";
import { AuthContext } from '@/src/context'

//Accede al contexto
export const useAuth = () => useContext(AuthContext)