import React from "react";
import { useLocation, useLoaderData, Link } from "react-router-dom";

const getData = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export function loader({ params }) {
  return getData(params.id);
}

const Apid = () => {
  const location = useLocation();
  const product = useLoaderData();
  console.log(product);
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      <div className="van-detail">
        <img src={product.image} alt={`product${product.id}`} />
        <h2>{product.title}</h2>
        <p>{`$ ${product.price}`}</p>
        <p>{product.description}</p>
        <button className="link-button">rent this van</button>
      </div>
    </div>
  );
};

export default Apid;
