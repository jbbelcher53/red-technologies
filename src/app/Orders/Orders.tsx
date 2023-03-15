import React from 'react'
import { GearIcon } from '@radix-ui/react-icons'
import {
  createNewOrder,
  deleteOrders,
  getOrders,
  getOrdersByType,
  updateOrder,
} from '../api/Orders'
import { OrderTable } from '../components/OrderTable/OrderTable'
import { Order } from '../types'
import { ProfileButton } from '../components/ProfileButton/ProfileButton'
import { useDraft } from '../hooks/useDraft'

const headers = [
  {
    header: 'Order ID',
    key: 'orderId',
  },
  {
    header: 'Creation Date',
    key: 'createdDate',
  },
  {
    header: 'Created By',
    key: 'createdByUserName',
  },
  {
    header: 'OrderType',
    key: 'orderType',
  },
  {
    header: 'Customer',
    key: 'customerName',
  },
]

export const Orders: React.FC = (): JSX.Element => {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [filter, setFilter] = React.useState<Order['orderType']>('')
  const [newOrder, setNewOrder] = React.useState({
    createdDate: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    createdByUserName: '',
    orderType: '',
    customerName: '',
  })
  const { draft, setDraft } = useDraft() as any

  const saveDraft = (val: any) => {
    setDraft(val)
  }

  const editOrder = (order: Order) => {
    updateOrder(order).then(data => {
      if (data) {
        setOrders(() =>
          orders.map(item => (item.orderId === order.orderId ? order : item))
        )
      }
    })
  }

  const deleteOrder = (items: string[]) => {
    deleteOrders(items).then(res => {
      if (res === 'Success') {
        setOrders(() =>
          orders.filter(item => !items.some(i => i === item.orderId))
        )
      }
    })
  }

  const createOrder = () => {
    createNewOrder(newOrder as Order).then(data => {
      if (data) {
        setOrders([...orders, { ...newOrder, orderId: data.orderId }])
      }
    })
  }

  React.useEffect(() => {
    getOrders().then(data => {
      if (data) {
        setOrders(data)
      }
    })
  }, [])

  React.useEffect(() => {
    if (filter !== '') {
      getOrdersByType(filter.replace(' ', '') as Order['orderType']).then(
        data => {
          if (data) {
            setOrders(data)
          }
        }
      )
    }
    if (filter === '') {
      getOrders().then(data => {
        if (data) {
          setOrders(data)
        }
      })
    }
  }, [filter])

  return (
    <main>
      <header className='flex flex-row items-center justify-between w-auto p-4 border-b-2 border-gray-300'>
        <div className='flex items-center space-x-4'>
          <svg
            width='36'
            height='30'
            viewBox='0 0 42 36'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            aria-labelledby='svg-logo--red-tech--title svg-logo--red-tech--description'
            focusable='false'
            role='img'
          >
            <title>Red Technologies Logo</title>
            <desc>The Red Technologies Logo in SVG form</desc>
            <path
              fill='#db3534'
              d='M41.7819 35.8687h-6.5536L20.1878 20.8402h6.5536L41.782 35.8687zM36.177 2.8243A9.1497 9.1497 0 0029.52 0H4.9505A2.3174 2.3174 0 003.3056 3.948l7.6336 7.6415 6.5317-.012-6.9295-6.9453H29.518a4.6024 4.6024 0 014.6184 4.6302 4.5746 4.5746 0 01-1.3406 3.2679 4.6303 4.6303 0 01-3.2758 1.3565l-24.8818-.004a4.6303 4.6303 0 00-3.2778 7.908l14.0798 14.0778h6.5417L4.6382 18.5131l24.8818.012a9.2486 9.2486 0 006.5418-2.7089 9.2511 9.2511 0 002.7091-6.5417 9.129 9.129 0 00-2.5939-6.4502zm-14.8415 24.132h-3.2758l-6.116-6.116h3.2638l6.128 6.116zm8.8965 8.9124h-3.2718l-6.116-6.116h3.2659l6.122 6.116z'
            />
          </svg>
          <h1 className='text-xl font-medium'>Home</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <GearIcon className='w-8 h-8' />
          <ProfileButton name='Braden Belcher' />
        </div>
      </header>
      <div>
        {orders && (
          <OrderTable
            filter={filter}
            setFilter={setFilter}
            headers={headers}
            orderData={orders || []}
            onCreate={createOrder}
            setNewOrder={setNewOrder}
            deleteOrder={deleteOrder}
            editOrder={editOrder}
            saveDraft={saveDraft}
            newOrder={newOrder}
            draftData={draft}
          />
        )}
      </div>
    </main>
  )
}
