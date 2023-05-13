import React from "react"
import Back from "../../common/back/Back"
import "./style.css"

const Cart = ({ CartItem, addToCart, decreaseQty, removeCartItem }) => {
  // Étape 7 : Calcul du total des articles
  const totalPrice = CartItem.reduce((prix, item) => prix + item.qty * item.price, 0)

  // Total de la quantité de produit
  return (
    <>
      <Back title="Panier" />
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* Si aucun élément n'est ajouté au panier, afficher "No Items are add in Cart" */}

          <div className='cart-details'>
        {CartItem.length === 0 && <h1 className='no-items product'>Aucun article n'est ajouté au panier</h1>}

        {/* Affichage des éléments du panier */}
        {CartItem.map((item) => {
          const productQty = item.price * item.qty

          return (
            <div className='cart-list product d_flex' key={item.id}>
              <div className='img'>
                <img src={item.image} alt='' />
              </div>
              <div className='cart-details'>
                <h3>{item.name}</h3>
                <h4>
                  ${item.price}.00 * {item.qty}
                  <span>${productQty}.00</span>
                </h4>
              </div>
              <div className='cart-items-function'>
                <div className='remove-cart-btn'>
                  <button3 onClick={() => removeCartItem(item)}>
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </button3>
                </div>
                
                <div className='cartControl d_flex'>
                  <button3 className='inc-cart-btn' onClick={() => addToCart(item)}>
                  <i className='fa fa-plus'></i>
                  </button3>
                  <button3 className='des-cart-btn' onClick={() => decreaseQty(item)}>
                  <i className='fa fa-minus'></i>
                  </button3>
                </div>
              </div>
              <div className='cart-item-price'></div>
            </div>
          )
        })}
      </div>

      <div className='cart-total product'>
        <h2>Résumé du panier</h2>
        <div className=' d_flex'>
          <h4>Prix total :</h4>
          <h3>${totalPrice}.00</h3>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default Cart
