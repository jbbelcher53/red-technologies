export interface Order {
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
