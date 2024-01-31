import IpdsList from "../Ipd/Ipds/Ipds"

export const QUERY = gql`
  query FindPharmacyWaitingQuery {
    pharmacyWaiting: pharmacyWaiting{
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

export const Success = ({ pharmacyWaiting }) => {
  // return <div>{JSON.stringify(pharmacyWaiting)}</div>
  return (
    <>
      <div className="bg-white text-black">
        <IpdsList ipds={pharmacyWaiting} pharmaWaiting={true} />
      </div>
    </>
  )
}
