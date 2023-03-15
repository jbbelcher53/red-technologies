/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Order } from '../types'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiKey: string = process.env.REACT_APP_API_KEY!

export const getOrders = async (): Promise<Order[] | undefined> => {
  const response = await fetch(
    `https://red-candidate-web.azurewebsites.net/api/Orders`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: apiKey,
      },
    }
  )
  if (!response.ok) {
    const error = await response.text()
    console.error(new Error(error))
    return Promise.reject(error)
  }
  const data: Order[] = await response.json()

  return data
}

export const getOrdersByType = async (
  orderType: Order['orderType']
): Promise<Order[] | undefined> => {
  const response = await fetch(
    `https://red-candidate-web.azurewebsites.net/api/Orders/ByType?orderType=${orderType.replace(
      ' ',
      ''
    )}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: apiKey,
      },
    }
  )
  if (!response.ok) {
    const error = await response.text()
    console.error(new Error(error))
    return Promise.reject(error)
  }
  const data: Order[] = await response.json()

  return data
}

export const createNewOrder = async (order: Order): Promise<any> => {
  const response = await fetch(
    `https://red-candidate-web.azurewebsites.net/api/Orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: apiKey as string,
      },
      body: JSON.stringify(order),
    }
  )
  if (!response.ok) {
    const error = await response.text()
    console.error(new Error(error))
    return Promise.reject(error)
  }
  const data: any = await response.json()
  console.log(data)
  return data
}

export const updateOrder = async (order: Order): Promise<any> => {
  const response = await fetch(
    `https://red-candidate-web.azurewebsites.net/api/Orders`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: apiKey,
      },
      body: JSON.stringify(order),
    }
  )
  if (!response.ok) {
    const error = await response.text()
    console.error(new Error(error))
    return Promise.reject(error)
  }
  const data: any = await response.json()
  console.log(data)
  return data
}

export const deleteOrders = async (orders: string[]): Promise<any> => {
  const response = await fetch(
    `https://red-candidate-web.azurewebsites.net/api/Orders/Delete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: apiKey,
      },
      body: JSON.stringify(orders),
    }
  )
  if (!response.ok) {
    const error = await response.text()
    console.error(new Error(error))
    return Promise.reject(error)
  }

  return 'Success'
}
