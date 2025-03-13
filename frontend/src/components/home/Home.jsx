import React, { useEffect } from 'react'

import { useState } from 'react'
import api from '../../api/axios'
export const Home = () => {
  const [data,setData]=useState(null)
 useEffect(()=>{
    fetchData();
 },[])
 const fetchData=async ()=>{
  try {
    const response=await api.get('/');
    setData(response.data)
    console.log(response)

  } catch (error) {
    console.error(error)
    
  }
 }
  return (
    <div>{data}</div>

  )
}
