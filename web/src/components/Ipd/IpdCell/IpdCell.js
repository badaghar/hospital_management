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
      extra
      patient{
        id
        name
        age
        address
        phone_no
        gender
      }
      IpdConsultation{
        id
        consultation_doctor
        consultation_type
        amount
      }
      IpdCharges{
        id
        charge_type
        charge
        quantity
        total

      }
      IpdPayment{
        id
      amount
      payment_mode
      created_at
      }
      IpdLabCharges{
        id
        lab_name
        amount
      }
      IpdOperationPayment{
        id
        operation_name
        amount
        extra
      }
      IpdChat{
        id
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
      IpdPrescription{
        id
        medicine
        dosage
        timing
        frequency
        duration
        note
        quantity
      }
      IpdHomoPrescription{
        id
        medicine
        dosage
        timing
        frequency
        duration
        note
        rate
      }
      File{
        id
        title
        url
      }
      Complaints{
        id
        note
      }


    }

    homoMedicines{
      id
      name
      no
      extra
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
      extra
    }
    floors{
      floor_name
      id
      Bed{
        id
        bed_name
      }
    }
    medicines {
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
        name
        code_name
        ProductToComposition{
          cid{
            name
          }
        }
      }

    }
    dossages{
      dose
    }
    frequencies{
      name
    }
    durations{
      name
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Ipd not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipd, users, doctorFees, chargeses,labChargeses,operations,floors,medicines,homoMedicines,frequencies,durations,dossages }) => {
  return <Ipd ipd={ipd} users={users} doctorFees={doctorFees} chargeses={chargeses} labChargeses={labChargeses} operations={operations} floors={floors} medicines={medicines} homoMedicines={homoMedicines} dossages={dossages} frequencies={frequencies}  durations={durations} />
}
