import Ipd from 'src/components/Ipd/Ipd'

export const QUERY = gql`
  query FindIpdById($id: Int!) {
    ipd: ipd(id: $id) {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      patientId
      discharge_date
      patient{
        name
        age
        address
        phone_no
        gender
      }
      IpdConsultation{
        consultation_doctor
        consultation_type
        amount
      }
      IpdCharges{
        charge_type
        charge
        quantity
        total

      }
      IpdPayment{
      amount
      payment_mode
      created_at
    }
    }

    users: users{
      id
      name
      email
      roles
    }
    doctorFees{
      id
      type
      amount
      userId

    }
    chargeses{
      name
      amount
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ipd not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipd,users,doctorFees,chargeses }) => {
  return <Ipd ipd={ipd} users={users} doctorFees={doctorFees} chargeses={chargeses} />
}
