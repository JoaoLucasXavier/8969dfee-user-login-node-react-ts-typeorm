import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await login({ username, password });
      history.push("/dashboard");
    },
    [login, username, password, history]
  );

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Usuário</label>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="">Senha</label>
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="form-group">
        <button type="submit">Entrar</button>
      </div>
    </form>
  );
};

export default Login;
