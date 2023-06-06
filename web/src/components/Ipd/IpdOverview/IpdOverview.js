import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { timeTag } from 'src/lib/formatters'


const DISCHARGE_PATIENT = gql`
  mutation DischargePatient($input: Int!) {
    dischargePatient(id: $input) {
      id
    }
  }
`

const IpdOverview = ({ipd}) => {
  const [dischargePatients, { loading, error }] = useMutation(
    DISCHARGE_PATIENT,
    {
      onCompleted: () => {
        toast.success('Discharged Done Successfully')
        navigate(routes.ipds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const dischargePatient = () =>{
    if (confirm('Are you sure you want to discharge this patient')) {
      dischargePatients({ variables: { input:ipd.id } })
      console.log('here')
    }
    console.log('here2')

  }






  return (
    <div className="m-3 p-4">
      <div className="shadow-lg p-3 rounded-md">
          <div className="flex items-center space-x-3">
            <span>
              Patient Name :-
            </span>
            <span>
               {ipd.patient.name}
            </span>
            {
              !ipd.discharge_date ?
              <span className="bg-green-800 p-1 px-3 text-white rounded-3xl hover:bg-white hover:text-green-800 cursor-pointer " onClick={dischargePatient}>
              Discharge Patient
            </span> :
              <span className="bg-green-800 p-1 px-3 text-white rounded-3xl hover:bg-white hover:text-green-800 cursor-pointer ">
               Patient is Discharged At {timeTag(ipd.discharge_date)}
            </span>

          }
          </div>

          <div className="flex items-center space-x-3">
            <span>
              Age :-
            </span>
            <span>
              {ipd.patient.age}
            </span>
            <span>
              Phone No :-
            </span>
            <span>
            {ipd.patient.phone_no}
            </span>
            <span>
              Gender :-
            </span>
            <span>
            {ipd.patient.gender || 'Not Entered'}

            </span>

          </div>

          <div className="flex items-center space-x-3">
            <span>Address :- </span>
            <span>{ipd.patient.address || 'Not Entered'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Total Charges Till Now</span>
            <span>5000</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Total Charges Paid Till Now</span>
            <span>{ipd.paid_amount}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Date Of Admitted :- </span>
            <span>{timeTag(ipd.date_of_admission)}</span>

          </div>



      </div>
    </div>
  )
}

export default IpdOverview
