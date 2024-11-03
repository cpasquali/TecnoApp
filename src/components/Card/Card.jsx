import "./Card.css";
import { ProductsCartContext } from "../../context/CartProducts";
import { useContext } from "react";

export const Card = ({ product }) => {
  const { cartProducts, addProductToCart } = useContext(ProductsCartContext);

  const imagen = product.thumbnail
    .replace("-I.jpg", "-X.jpg")
    .replace("http://", "https://");

  const isInCart = cartProducts.some((p) => p.title === product.title);

  return (
    <article className="product">
      <img className="image" src={imagen} alt={`Imagen de ${product.title}`} />
      <h4 className="title">{product.title}</h4>
      <div className="product-price">
        <p>${parseFloat(product.price).toLocaleString()}</p>
        <button
          className={`btn ${isInCart ? "btn-in-cart" : "btn-out-cart"}`}
          onClick={() => addProductToCart(product)}
          aria-label={
            isInCart ? "Producto en el carrito" : "Agregar al carrito"
          }
        >
          <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>
    </article>
  );
};
