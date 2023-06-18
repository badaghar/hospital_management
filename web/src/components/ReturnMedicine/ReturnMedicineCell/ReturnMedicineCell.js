import ReturnMedicine from 'src/components/ReturnMedicine/ReturnMedicine'

export const QUERY = gql`
  query FindReturnMedicineById($id: Int!) {
    returnMedicine: returnMedicine(id: $id) {
      id
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
      patient{
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ReturnMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnMedicine }) => {
  return <ReturnMedicine returnMedicine={returnMedicine} />
}
