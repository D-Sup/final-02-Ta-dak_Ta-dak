

import React from 'react';
import { getPostDetail } from './api/postAPI'

const Test = () => {

  const handleData = async () => {
    const result = await getPostDetail('6585377bb2cb205663fdb005')
    console.log(result);
  }
  return (
    <button onClick={handleData}>click</button>
  )
}

export default Test