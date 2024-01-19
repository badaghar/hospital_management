import IpdsList from "../Ipd/Ipds/Ipds"

export const QUERY = gql`
  query FindDrWaitingQuery($id: Int!) {
    drWaiting: drWaiting(id: $id) {
      id
      consultant_doctor
      date_of_admission
      discharge_date
      created_at
      updated_at
      paid_amount
      patientId
      patientType
      IpdCharges{
        total
      }
      IpdLabCharges{
        amount
      }
      patient{
        name
        phone_no
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ drWaiting }) => {
  // return <div>{JSON.stringify(drWaiting)}</div>
  return (
    <>
    <div className="bg-white text-black">
    <IpdsList ipds={drWaiting} />
    </div>
    </>
  )


}
