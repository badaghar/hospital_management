import PurchaseMedicine from 'src/components/PurchaseMedicine/PurchaseMedicine'

export const QUERY = gql`
  query FindPurchaseMedicineById($id: Int!) {
    purchaseMedicine: purchaseMedicine(id: $id) {
      id
      invoiceNo
      distributerId
      did{
        name
      }
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PurchaseMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ purchaseMedicine }) => {
  return <PurchaseMedicine purchaseMedicine={purchaseMedicine} />
}
