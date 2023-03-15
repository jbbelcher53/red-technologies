/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { HTMLProps } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { PlusIcon, TrashIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '../Button/Button'
import { Select } from '../Select/Select'
import { Searchbar } from '../Searchbar/Searchbar'
import { Dialog } from '../Dialog/Dialog'

type tableHeader = {
  header: string
  key: string
}

interface IOrderTable {
  headers: tableHeader[]
  orderData: Order[]
  filter: string
  setFilter: React.SetStateAction<any>
  setNewOrder: React.SetStateAction<any>
  onCreate: () => void
  deleteOrder: any
  editOrder: any
  saveDraft: any
  newOrder: any
  draftData: any
}

type Order = {
  orderId: string
  orderType:
    | 'Standard'
    | 'SaleOrder'
    | 'PurchaseOrder'
    | 'TransferOrder'
    | 'ReturnOrder'
    | string
  customerName: string
  createdDate: string | null
  createdByUserName: string
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate])

  return (
    <input
      type='checkbox'
      ref={ref}
      className={`${className} cursor-pointer accent-red-500`}
      {...rest}
    />
  )
}

export const OrderTable: React.FC<IOrderTable> = ({
  headers,
  orderData,
  filter,
  setFilter,
  setNewOrder,
  onCreate,
  deleteOrder,
  editOrder,
  saveDraft,
  draftData,
  newOrder,
}): JSX.Element => {
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Order[]>([])
  const [search, setSearch] = React.useState('')
  const [newOrderType, setNewOrderType] = React.useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [editInfo, setEditInfo] = React.useState({
    orderId: '',
    createdDate: '',
    createdByUserName: '',
    orderType: '',
    customerName: '',
  })

  React.useEffect(() => {
    setData(orderData)
  }, [orderData])

  React.useEffect(() => {
    setNewOrder((prevState: Order) => ({
      ...prevState,
      orderType: newOrderType.replace(' ', ''),
    }))
  }, [newOrderType])

  const createDialogClose = (val: any) => {
    setIsCreateDialogOpen(val)
    setNewOrder({
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
    setNewOrderType('')
  }

  const openEditMenu = (info: Order) => {
    setIsEditDialogOpen(() => true)
    setEditInfo(() => ({
      orderId: info.orderId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createdDate: info.createdDate!,
      createdByUserName: info.createdByUserName,
      orderType: info.orderType,
      customerName: info.customerName,
    }))
  }

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...headers.map(item => {
        return {
          header: item.header,
          accessorKey: item.key,
          cell: (info: any) => <div className='w-auto'>{info.getValue()}</div>,
        }
      }),
      {
        id: 'edit',
        cell: ({ row }) => (
          <Dialog
            key={row.id}
            open={isEditDialogOpen}
            setOpen={setIsEditDialogOpen}
            trigger={
              <Button
                disabled={false}
                className='flex pr-4 cursor-pointer md:pr-6'
                onClick={() => openEditMenu(row.original)}
              >
                <Pencil1Icon className='w-5 h-5' />
              </Button>
            }
            title={`Edit order ${row.original.orderId}`}
            description='Edit an existing order. Click submit when you are done.'
            submitButton={
              <button
                type='submit'
                onClick={() => editOrder(editInfo)}
                className='bg-green-400 text-gray-700 hover:bg-green-500 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
              >
                Submit
              </button>
            }
          >
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className=' w-[90px] text-right text-[15px]'
                htmlFor='edit-orderType'
              >
                Order Type
              </label>
              <Select
                noDefault
                filter={editInfo.orderType
                  .replace('SaleOrder', 'Sale Order')
                  .replace('PurchaseOrder', 'Purchase Order')
                  .replace('TransferOrder', 'Transfer Order')
                  .replace('ReturnOrder', 'Return Order')}
                setFilter={(e: any) =>
                  setEditInfo(prevState => ({
                    ...prevState,
                    orderType: e.replace(' ', ''),
                  }))
                }
                options={[
                  'Standard',
                  'Sale Order',
                  'Purchase Order',
                  'Transfer Order',
                  'Return Order',
                ]}
                placeholder='Order Type'
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className=' w-[90px] text-right text-[15px]'
                htmlFor='customerName'
              >
                Customer Name
              </label>
              <input
                className='shadow-gray-700 placeholder:text-gray-800 focus:shadow-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                id='customerName'
                name='customerName'
                placeholder={editInfo.customerName}
                onChange={e =>
                  setEditInfo(prevState => ({
                    ...prevState,
                    customerName: e.target.value,
                  }))
                }
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className='w-[90px] text-right text-[15px]'
                htmlFor='createdByUserName'
              >
                Created By
              </label>
              <input
                className='shadow-gray-700 placeholder:text-gray-800 focus:shadow-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                id='createdByUserName'
                name='createdByUserName'
                placeholder={editInfo.createdByUserName}
                onChange={e =>
                  setEditInfo(prevState => ({
                    ...prevState,
                    createdByUserName: e.target.value,
                  }))
                }
              />
            </fieldset>
          </Dialog>
        ),
      },
    ],
    [editInfo.orderType, isEditDialogOpen]
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enable row selection for all rows
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })

  return (
    <div className='w-screen p-2'>
      <div className='flex flex-col w-auto py-4 space-y-4 md:space-x-4 md:space-y-0 md:items-center md:justify-start md:flex-row'>
        <div className='flex space-x-4'>
          <Searchbar placeholder='Order ID Search' onChange={setSearch} />
          <Dialog
            key='create-dialog'
            open={isCreateDialogOpen}
            setOpen={createDialogClose}
            trigger={
              <Button
                className='flex items-center px-3 h-[32px] text-white bg-blue-600 rounded-sm cursor-pointer whitespace-nowrap py-1 hover:bg-blue-700'
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <PlusIcon className='w-5 h-5 mr-1' />
                Create Order
              </Button>
            }
            title='Create new order'
            description='Create a new order for your customers. Click submit when you are done.'
            submitButton={
              <button
                type='submit'
                onClick={() => {
                  onCreate()
                  setNewOrderType('')
                }}
                className='bg-green-400 text-gray-700 hover:bg-green-500 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
              >
                Submit
              </button>
            }
          >
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className=' w-[90px] text-right text-[15px]'
                htmlFor='orderType'
              >
                Order Type
              </label>
              <Select
                noDefault={false}
                filter={newOrderType}
                setFilter={setNewOrderType}
                options={[
                  'Standard',
                  'Sale Order',
                  'Purchase Order',
                  'Transfer Order',
                  'Return Order',
                ]}
                placeholder='Order Type'
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className=' w-[90px] text-right text-[15px]'
                htmlFor='customerName'
              >
                Customer Name
              </label>
              <input
                className='shadow-gray-700 focus:shadow-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                id='customerName'
                name='customerName'
                placeholder='John Smith'
                value={newOrder.customerName}
                onChange={e =>
                  setNewOrder((prevState: Order) => ({
                    ...prevState,
                    customerName: e.target.value,
                  }))
                }
              />
            </fieldset>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <label
                className='w-[90px] text-right text-[15px]'
                htmlFor='createdByUserName'
              >
                Created By
              </label>
              <input
                className='shadow-gray-700 focus:shadow-gray-800 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
                id='createdByUserName'
                name='createdByUserName'
                placeholder='Created By'
                value={newOrder.createdByUserName}
                onChange={e =>
                  setNewOrder((prevState: Order) => ({
                    ...prevState,
                    createdByUserName: e.target.value,
                  }))
                }
              />
            </fieldset>
            <div>
              {!Object.values(draftData).every(item => item === '') ? (
                <div className='flex space-x-2'>
                  <button
                    type='button'
                    onClick={() => {
                      setNewOrderType(
                        draftData.orderType
                          .replace('SaleOrder', 'Sale Order')
                          .replace('PurchaseOrder', 'Purchase Order')
                          .replace('TransferOrder', 'Transfer Order')
                          .replace('ReturnOrder', 'Return Order')
                      )
                      setNewOrder(draftData)
                    }}
                    className={`border ${
                      !Object.values(draftData).every(item => item === '')
                        ? 'block'
                        : 'hidden'
                    } border-gray-500 text-gray-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none`}
                  >
                    Use draft
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      saveDraft({
                        createdByUserName: '',
                        orderType: '',
                        customerName: '',
                      })
                      setNewOrder({
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
                      setNewOrderType('')
                    }}
                    className={`border ${
                      !Object.values(draftData).every(item => item === '')
                        ? 'block'
                        : 'hidden'
                    } border-gray-500 text-gray-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none`}
                  >
                    Clear draft
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => {
                    saveDraft(newOrder)
                  }}
                  className='border border-gray-500 text-gray-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
                >
                  Save draft
                </button>
              )}
            </div>
          </Dialog>
        </div>
        <div className='flex space-x-4'>
          <Button
            className='flex items-center px-3 h-[32px] text-white bg-blue-600 rounded-sm cursor-pointer whitespace-nowrap py-1 hover:bg-blue-700'
            onClick={() =>
              deleteOrder(
                table
                  .getSelectedRowModel()
                  .flatRows.map(item => item.original.orderId)
              )
            }
          >
            <TrashIcon className='w-5 h-5 mr-1' />
            Delete Selected
          </Button>
          <Select
            noDefault={false}
            filter={filter}
            setFilter={setFilter}
            options={[
              'Standard',
              'Sale Order',
              'Purchase Order',
              'Transfer Order',
              'Return Order',
            ]}
            placeholder='Order Type'
          />
        </div>
      </div>
      <div className='overflow-x-scroll'>
        <table className='border-gray-200 border-y-[1px] w-full'>
          <thead className='border-b-[1px] border-gray-200 border-x-[1px]'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th
                      className='py-1 pl-4 text-sm font-normal min-w-fit md:pl-6'
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div className='flex justify-start align-middle whitespace-nowrap'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className='divide-y-[1px] divide-gray-200 border-x-[1px] border-x-gray-200'>
            {table
              .getRowModel()
              .rows.filter(item =>
                item.original.orderId.toLowerCase().includes(search)
              )
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          className='py-2 pl-4 text-sm font-medium md:pl-6'
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      <div>
        {Object.keys(rowSelection).length} of{' '}
        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
      </div>
    </div>
  )
}
