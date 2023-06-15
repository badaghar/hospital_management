import ManufacturerPurchaseMedicine from 'src/components/ManufacturerPurchaseMedicine/ManufacturerPurchaseMedicine'

export const QUERY = gql`
  query FindManufacturerPurchaseMedicineById($id: Int!) {
    manufacturerPurchaseMedicine: manufacturerPurchaseMedicine(id: $id) {
      id
      productId
      batch
      paid_qty
      free_qty
      pack
      exp
      mrp
      rate
      dis
      sgst
      cgst
      amount
      net_amount
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ManufacturerPurchaseMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturerPurchaseMedicine }) => {
  return (
    <ManufacturerPurchaseMedicine
      manufacturerPurchaseMedicine={manufacturerPurchaseMedicine}
    />
  )
}
