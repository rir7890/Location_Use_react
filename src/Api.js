import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Api = () => {
  const [product, setProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectBtn, setSelectBtn] = useState("");
  // console.log(searchParams);
  // setSelectBtn(searchParams.get("type"));

  useEffect(() => {
    const ProductFetch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProduct(data);
        console.table(data);
      } catch (err) {
        console.error("Their is error to fetch the data");
      }
    };
    ProductFetch();
  }, []);

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      setSelectBtn(value);
      return prevParams;
    });
  }
  const typeFilter = [...new Set(product.map((element) => element.category))];
  console.log(typeFilter);

  const ButtonStructure = typeFilter.map((e) => (
    <button
      onClick={() => handleFilterChange("type", e)}
      className={`van-type ${e} ${selectBtn === e ? "selection" : ""}`}
    >
      {e}
    </button>
  ));

  const displayFilter = selectBtn
    ? product.filter((e) => e.category === selectBtn)
    : product;

  const productList = displayFilter.map((pro) => (
    <div key={pro.id} className="product-tile">
      <Link
        to={`${pro.id}`}
        state={{ search: `?${searchParams.toString()}`, type: selectBtn }}
      >
        <img src={pro.image} alt={`iamge${pro.id}`} />
        <div className="pro-info">
          <h3>{pro.title}</h3>
          {/* <h3>{pro.description}</h3> */}
        </div>
        <div className="pro-categry">{pro.category}</div>
      </Link>
    </div>
  ));

  return (
    <div>
      <nav>
        {ButtonStructure}
        {selectBtn && (
          <button onClick={() => handleFilterChange("type", null)}>
            Clear
          </button>
        )}
      </nav>
      <div>Products</div>
      <br />
      <div className="product-design">{productList}</div>
    </div>
  );
};

export default Api;
