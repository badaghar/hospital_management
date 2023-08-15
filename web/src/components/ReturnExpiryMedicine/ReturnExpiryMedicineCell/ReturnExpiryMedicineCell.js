import ReturnExpiryMedicine from 'src/components/ReturnExpiryMedicine/ReturnExpiryMedicine'

export const QUERY = gql`
  query FindReturnExpiryMedicineById($id: Int!) {
    returnExpiryMedicine: returnExpiryMedicine(id: $id) {
      data{
        id
        distributerId
        medicine
        return_med
        created_at
        updated_at
      }
      data2{
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ReturnExpiryMedicine not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnExpiryMedicine }) => {

  console.log(returnExpiryMedicine)
  return <ReturnExpiryMedicine returnExpiryMedicine={returnExpiryMedicine.data} dname={returnExpiryMedicine.data2} />
}
