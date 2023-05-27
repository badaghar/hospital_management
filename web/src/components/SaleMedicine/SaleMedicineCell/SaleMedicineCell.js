import SaleMedicine from 'src/components/SaleMedicine/SaleMedicine'

export const QUERY = gql`
  query FindSaleMedicineById($id: Int!) {
    saleMedicine: saleMedicine(id: $id) {
      id
      billNo
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>SaleMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ saleMedicine }) => {
  return <SaleMedicine saleMedicine={saleMedicine} />
}
