import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ApiService from "../services/ApiService";

interface RoutesPropsData extends RouteProps {
  role?: string;
}

const PrivateRoutes: React.FC<RoutesPropsData> = ({ role, ...rest }) => {
  const [permissions, setPermissions] = useState([] as string[]);

  useEffect(() => {
    async function loadRoles() {
      const response = ApiService.get("/users/roles");

      // Método pode receber apenas 1 role
      // const findRole = (await response).data.find((r: string) => r === role);

      // Trabalha com multi roles
      const findRole = (await response).data.some((r: string) =>
        role?.split(",").includes(r)
      );

      setPermissions(findRole);
    }

    loadRoles();
  }, [role]);

  const { userLogged } = useAuth();

  // Usuário não está logado
  if (!userLogged()) {
    return <Redirect to="/" />;
  }

  // Usuário está logado e a rota solicitada não precisa de 'role'
  if (!role && userLogged()) {
    return <Route {...rest} />;
  }

  // Usuário está logado porém a rota solicitada precisa de 'role'
  return permissions ? <Route {...rest} /> : <Redirect to="/" />;
};

export default PrivateRoutes;
