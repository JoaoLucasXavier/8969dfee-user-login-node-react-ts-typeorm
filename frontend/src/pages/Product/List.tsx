import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PermissionComponents from "../../components/PermissionComponents";
import ApiService from "../../services/ApiService";

interface ProductData {
  id: string;
  name: string;
  description: string;
}

const List: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([] as ProductData[]);

  const history = useHistory();

  useEffect(() => {
    ApiService.get("/product").then((response) => setProducts(response.data));
  }, []);
  return (
    <div>
      <h3>Listagem de produtos</h3>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <span>ID: {product.id}</span>
            <br />
            <span>Nome: {product.name}</span>
            <br />
            <hr />
          </div>
        ))}
        <PermissionComponents role="ROLE_ADMIN">
          <button onClick={() => history.push("/product")}>
            Cadastrar Produto
          </button>
        </PermissionComponents>
      </div>
    </div>
  );
};

export default List;
