import React, { useEffect } from "react";
import { useState } from "react";
import ApiService from "../../services/ApiService";

interface PermissionComponentsProps {
  role: string;
}

const PermissionComponents: React.FC<PermissionComponentsProps> = ({
  role,
  children,
}) => {
  const [permissions, setPermissions] = useState([] as string[]);

  useEffect(() => {
    async function loadRoles() {
      const response = ApiService.get("/users/roles");
      const findRole = (await response).data.some((r: string) =>
        role?.split(",").includes(r)
      );

      setPermissions(findRole);
    }

    loadRoles();
  }, [role]);

  return <>{permissions && children}</>;
};

export default PermissionComponents;
