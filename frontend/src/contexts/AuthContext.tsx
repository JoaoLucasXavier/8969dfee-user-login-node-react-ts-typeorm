import React, { createContext, useCallback, useContext, useState } from "react";
import ApiService from "../services/ApiService";

interface UserData {
    username: string;
    password: string;
}

interface AuthContextState {
    token: TokenState;
    login({ username, password }: UserData): Promise<void>;
    userLogged(): boolean;
}

interface TokenState {
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem("@Permission:token");

        if (token) {
            ApiService.defaults.headers.authorization = `Bearer ${token}`;
            return { token };
        }

        return {} as TokenState;
    });

    const login = useCallback(async ({ username, password }: UserData) => {
        const response = await ApiService.post("/login", {
            username,
            password,
        });

        const { token } = response.data;

        setToken(token);

        localStorage.setItem("@Permission:token", token);
        ApiService.defaults.headers.authorization = `Bearer ${token}`;
    }, []);

    const userLogged = useCallback(() => {
        if (localStorage.getItem("@Permission:token")) {
            return true;
        }
        return false;
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, userLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
