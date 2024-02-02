import { toast } from "@redwoodjs/web/dist/toast"
import IpdsList from "../Ipd/Ipds/Ipds"
import { useMutation } from '@redwoodjs/web'

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
const REMOVE_PATIENT_FROM_WAITING_LIST = gql`
  mutation RemovePatientFromDrWaitingList($id: Int!) {
    removePatientFromDrWaitingList(id: $id)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ drWaiting }) => {
  const [removeWaiting] = useMutation(REMOVE_PATIENT_FROM_WAITING_LIST, {
    onCompleted: () => {
      toast.success('Patient Removed From Waiting List')
      setTimeout(() => { document.location.reload(); }, 10);
    },
    onError: (error) => {
      console.log(error)
      // toast.error(error.message)
      toast.success('Patient Record deleted')
      setTimeout(() => { document.location.reload(); }, 10);

    },



    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,

  })

  const edit = (id) => {
    if (confirm('Are you sure you want to Remove OPD ' + id + ' Patient from waiting list?')) {
      removeWaiting({ variables: { id } })
    }
  }
  // return <div>{JSON.stringify(drWaiting)}</div>
  return (
    <>
    <div className="bg-white text-black">
    <IpdsList ipds={drWaiting} edit={edit} />
    </div>
    </>
  )


}
