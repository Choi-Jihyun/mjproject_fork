import React, { useEffect, useState } from 'react'
import styles from './styles/speakers.module.css'
import { Link, useNavigate } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function Speakerslist() {
  const [allProducts]= useProducts();
  const categories=[
    {index:0, text:'ALL'},
    {index:1, text:'HOME'},
    {index:2, text:'PORTABLE'},
    {index:3, text:'LIMITED EDITION'},
  ]
  const [selectCategory,setSelectCategory]=useState('ALL')//선택한 카테고리 이름을 저장.
  const [categoryItems,setCategoryItems] =useState([]);
  
  useEffect(()=>{
    if(selectCategory==='ALL'){
      setCategoryItems(allProducts)
    }else{
      const categoryItems=allProducts.filter((item)=>(item.category===selectCategory))
      setCategoryItems(categoryItems)
    }
  },[selectCategory, allProducts])
  
  const navigate=useNavigate()
  // 아래 변수에 일관성 보완: isAllCategory, isHomeCategory 추가 삽입
  const isAllCategory = selectCategory === 'ALL';
  const isHomeCategory = selectCategory === 'HOME';
  const isPortableCategory = selectCategory === 'PORTABLE';
  const isLimitedCategory = selectCategory === 'LIMITED EDITION';

  if (!allProducts) {
    return <div>Loading...</div>;
  }


  return (
    <>
    <section className={styles.speakers_title}>
      <p>Enjoy Marshall sound at home and on the road</p>
    </section>
    <section className={styles.speakers_product}>
      <ul className={styles.speakers_product_all_list}>
      {
        categories.map((item)=>(
          <li
            key={item.index}
            onClick={() => setSelectCategory(item.text)}
            className={`${styles.categoryItem} ${selectCategory === item.text ? styles.selectedCategory : ''}`}
          >
            <Link>{item.text}</Link>
          </li>
        ))
      }
      </ul>

      <div className={styles.speakers_product_box}>
        <p>{selectCategory}</p>
      </div>
    


    {/* 변경 시작 */}

      <ul className={styles.speakers_product_list}>
      {
        categoryItems.map((item) => (
          <li key={item.id} onClick={() => {
            navigate(`/speakers/${item.id}`)
          }}>
            <Link>
              <img src={item.image} alt={item.name}/>
              <ul className={styles.product_color}>
              {
                item.colors.map((color, index) => (
                  <li key={index}>
                    <button 
                      className={
                        color === 'black' ? styles.blackButton 
                        : color === 'white' ? styles.whiteButton 
                        : color === 'brown' ? styles.brownButton 
                        : color === 'cream' ? styles.creamButton 
                        : color === 'black and brass' ? styles.portableButton
                        : styles.defaultButton
                      }>
                        {color}
                    </button>
                  </li>
                ))
              }
              </ul>
              <div className={styles.product_text_box}>
                <span>{item.name}</span>
                <p>$ {item.price}</p>
              </div>
            </Link>
          </li>
        ))
      }
      </ul>

      {/* 변경 끝 */}

{/* 
      <ul className={styles.speakers_product_home_list}>
      {
        categoryItems.filter((item) => item.category === 'HOME').map((item) => (
          <li key={item.id} onClick={() => {
            navigate(`/speakers/${item.id}`)
          }}>
            <Link>
              <img src={item.image} alt={item.name}/>
              <ul className={styles.product_color}>
              {
                item.colors.map((color, index) => (
                  <li key={index}>
                    <button className={color === 'black' ? styles.blackButton : color === 'white' ? styles.whiteButton : color === 'brown' ? styles.brownButton : color === 'cream' ? styles.creamButton : styles.defaultButton}>{color}</button>
                  </li>
                ))
              }
              </ul>
              <div className={styles.product_text_box}>
                <span>{item.name}</span>
                <p>$ {item.price}</p>
              </div>
            </Link>
          </li>
        ))
      }
      </ul>


      <div className={styles.speakers_product_box}>
        <ul className={styles.speakers_product_portable_list}>
        {
          categoryItems.filter((item) => item.category === 'PORTABLE').map((item) => (
            <li key={item.id} onClick={() => navigate(`/speakers/${item.id}`)}>
              <Link to={`/speakers/${item.id}`}>
                <img src={item.image} alt={item.name} />
                <ul className={styles.product_color}>
                {
                  item.colors.map((color, index) => (
                    <li key={index}>
                      <button className={color === 'black' ? styles.blackButton : color === 'cream' ? styles.creamButton : color === 'forest' ? styles.greenButton : styles.portableButton}>{color}</button>
                    </li>
                  ))
                }
                </ul>
                <div className={styles.product_text_box}>
                  <span>{item.name}</span>
                  <p>$ {item.price}</p>
                </div>
              </Link>
            </li>
          ))
        }
        </ul>
      </div> 
*/}

    </section>      
{/* 변경 시작 */}

    {
      isPortableCategory && 
      (
        <div className={styles.speakers_promo}>
          <p>Legendary sound, built for the road</p>
          <span>The latest member of our portable line-up has arrived</span>
        </div>
      )
    }

    {
      (isAllCategory || isLimitedCategory) && 
      (
        // 하나의 section만 만드는 거면 map으로 안 돌려도 될 것 같다.
        // categoryItems.filter((item) => item.category === 'LIMITED EDITION').map((item) => (
          <Link to={`/speakers/${categoryItems.id}`}>
            <section className={styles.limited_edition}>
              <div className={styles.limited_edition_box}>
                <div className={styles.limited_edition_img}>
                  <span>LIMITED<i>EDITION</i></span>
                  <img src='/images/plp-diamond-jubilee-emberton-v2.png' alt='' />
                </div>
                <div className={styles.limited_edition_text}>
                  <span>EMBERTON<br/>DIAMOND JUBILEE</span>
                  <p>$179.99</p>
                </div>
              </div>
            </section>
          </Link>
        // ))
      )
    } 

{/* 변경 끝 */}


    {/* {
      isPortableCategory && 
      (
        <div className={styles.speakers_promo}>
          <p>Legendary sound, built for the road</p>
          <span>The latest member of our portable line-up has arrived</span>
        </div>
      )
    }

    {
      (selectCategory === 'ALL' || isLimitedCategory) && categoryItems.filter((item) => item.category === 'LIMITED EDITION').map((item) => (
        <Link to={`/speakers/${item.id}`} key={item.id}>
          <section className={styles.limited_edition}>
            <div className={styles.limited_edition_box}>
              <div className={styles.limited_edition_img}>
                <span>LIMITED<i>EDITION</i></span>
                <img src='/images/plp-diamond-jubilee-emberton-v2.png' alt='' />
              </div>
              <div className={styles.limited_edition_text}>
                <span>EMBERTON<br/>DIAMOND JUBILEE</span>
                <p>$179.99</p>
              </div>
            </div>
          </section>
        </Link>
      ))
    }  */}

    </>
  )
}
