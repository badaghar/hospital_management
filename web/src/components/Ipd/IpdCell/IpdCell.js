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
      patientType
      patient{
        id
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
      IpdLabCharges{
        lab_name
        amount
      }
      IpdOperationPayment{
        operation_name
        amount
      }
      IpdChat{
        date
        drug
        dose
        route
      }
      IpdSummary{
        id
        ipdId
        summary
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

    labChargeses{
      name
      amount
    }
    operations{
      name
    }
    floors{
      floor_name
      id
      Bed{
        id
        bed_name
      }
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ipd not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipd, users, doctorFees, chargeses,labChargeses,operations,floors }) => {
  return <Ipd ipd={ipd} users={users} doctorFees={doctorFees} chargeses={chargeses} labChargeses={labChargeses} operations={operations} floors={floors}/>
}
