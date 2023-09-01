import { useLocation, useParams } from 'react-router-dom';
import styles from '../component/styles/productdetail.module.css'
import { RiHeartAddLine } from 'react-icons/ri'
import { useEffect, useState } from 'react';
// import useProducts from '../hooks/useProducts'
import { getProductDetail } from '../api/firebase'
// import axios from 'axios'

export default function Productdetail() {
    const {productId}=useParams();
    // const [allProducts]=useProducts();
    const [productItem, setProductItem]=useState([]);
    // useEffect(()=>{
    //     const productItem=allProducts.filter((item)=>item.id===productId)
    //     setProductItem(productItem)
    // },[productId,allProducts])
    const {pathname}= useLocation();
    useEffect(()=>{
      window.scrollTo(0,0);
    }, [pathname])

    useEffect(() => {
      getProductDetail(productId).then((res)=>{
        // setProductItem(res)
        if (Array.isArray(res)) {
          setProductItem(res);
        } else if (res) {
          setProductItem([res]);
        } else {
          console.log('Product not found');
        }
      })
    }, [productId])

  return (
    <>
        {/* <div>
            <input type="text" onChange={changeId}/><button onClick={submitId}><Link to=''>상세보기</Link></button>
        </div> */}
      {
      productItem.map((item)=>(
        <section className={styles.productdetail} key={item.id}>
          <div className={styles.productdetail_box}>
            <div className={styles.productdetail_img}>
                <img src={item.image} alt={item.name}/>
            </div>
            <div className={styles.productdetail_text_box}>
              <p className={styles.productdetail_name}>{item.name}</p>
              <ul className={styles.selectcolor}>
              {
                item.colors.map((color, index) => (
                  <li key={index}>
                    <button>{color}</button>
                  </li>
                ))
              }
              </ul>
              <p className={styles.productdetail_text}>
              {item.text} 
              </p>
              <p className={styles.productdetail_price}>$ {item.price}</p>
              <ul className={styles.productdetail_button}>
                <li><button><RiHeartAddLine/></button></li>
                <li><button>BUY</button></li>
                <li><button>ADD TO CART</button></li>
              </ul>
            </div>
          </div>
        </section>
        ))
       }
    </>
  )
}
