import React ,{ useState , useEffect }from "react"
import "./instrument.css"
import { Link } from "react-router-dom";
import axios from "axios";

const InstruCard = ({ addToCart }) => {
const [product , setproduct] = useState([]);
  const fetchAxios = async () =>{
    const res = await axios.get("http://localhost:8000/api/v1/products")
    //console.log(res.data)
    setproduct(res.data)
  }
  console.log("product",product)
  useEffect(()=>{
      fetchAxios();
  },[])
  return (
    <>
      {product?.map((val) => (
        <div className='items shadow'>
          <Link to={`/instrument/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
          <div className='img'>
            <img src={val.image} alt='' />
          </div>
          <div className='details'>
            <h2>{val.title}</h2>
            
            
          </div>
          </Link>
          <div className='product-details'>
            <div className='rate'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
            </div>
            <div className='price'>
              <h4>${val.price}.00 </h4>
              {/* Étape : 3
                si nous avons cliqué sur le bouton, alors
               */}
              <button2 onClick={() => addToCart(val)}>
                <i className='fa fa-plus'></i>
              </button2>
            </div>
          </div>

        </div>
      ))}
    </>
  )
}

export default InstruCard