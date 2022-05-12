import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/ApiService";
import "./style.css";

const Product: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
  });

  const handleChange = useCallback(
    async (event) => {
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    },
    [product]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await ApiService.post("/product", product);
      console.log(response);
    },
    [product]
  );

  return (
    <>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to="/dashboard">Voltar</Link>
        </li>
      </ul>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Produto</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
};

export default Product;
