import { axiosAuth } from "./settingAxios";

export const postProduct = async (itemName: string, price: number, link: string, itemImage: string): Promise<boolean> => {
  const reqUrl = '/product';
  const body = {
    product: {
      itemName,
      price,
      link: link || 'empty',
      itemImage
    }
  }
  try {
    const { status } = await axiosAuth.post(reqUrl, body)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const editProduct = async (productId: string, itemName: string, price: number, link: string, itemImage: string): Promise<boolean> => {
  const reqUrl = `/product/${productId}`;
  const body = {
    product: {
      itemName,
      price,
      link,
      itemImage
    }
  }
  try {
    const { status } = await axiosAuth.put(reqUrl, body)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (productId: string): Promise<boolean> => {
  const reqUrl = `/product/${productId}`;
  try {
    const { status } = await axiosAuth.delete(reqUrl)
    return status >= 200 && status < 300;
  } catch (error) {
    throw error
  }
}