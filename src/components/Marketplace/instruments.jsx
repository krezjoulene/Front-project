import React from "react"
import Back from "../common/back/Back"
import "../Marketplace/instrument.css"
import "../about/about.css"
import Home2 from "./MainPage/Home"
import InstruCard from "./instrumentsCard"


const Instruments = ({ addToCart, CartItem }) => {
  return (
    <>
      <Back title='Instruments' />
      <Home2 CartItem={CartItem} addToCart={addToCart} />
      <section className='instru padding'>
        <div className='container grid'>
          <InstruCard addToCart={addToCart} />
        </div>
      </section>
    </>
  )
}

export default Instruments