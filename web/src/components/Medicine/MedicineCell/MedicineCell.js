import Medicine from 'src/components/Medicine/Medicine'

export const QUERY = gql`
  query FindMedicineById($id: Int!) {
    medicine: medicine(id: $id) {
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
      pid{
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Medicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ medicine }) => {
  return <Medicine medicine={medicine} />
}
