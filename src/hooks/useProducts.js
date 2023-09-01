import { useEffect, useState } from 'react'
import { getProducts } from '../api/firebase'
import axios from 'axios'

export default function useProducts() {
  const [allProducts, setAllProducts]=useState([])

  useEffect(()=>{
    // axios.get('/data/products.json').then((res)=>{
    //   setAllProducts(res.data)
    // })
    getProducts().then((res)=>{
      setAllProducts(res)
    })
  },[])

  return (
    [allProducts]
  )
}