import { Context, createContext } from "react";
import { User } from '@firebase/auth-types'

export const AuthContext: Context<User | null> = createContext<User | null>(null);
