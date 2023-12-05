import NewsaleMedicineCell from "../SaleMedicine/NewsaleMedicineCell"

export const QUERY = gql`
  query FindOpdPrescribedQuery($id: Int!) {
    opdPrescribed: ipd(id: $id) {
      id
      consultant_doctor
      patient{
        id
        name
      }
      IpdPrescription{
        quantity
        medicine_detail{
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
            id
            name
          }
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ opdPrescribed }) => {
  return (
    <>
      <NewsaleMedicineCell details={opdPrescribed} />
    </>
  )
}
