export const QUERY = gql`
  query FindDownloadOpdFormQuery($id: Int!) {
    downloadOpdForm:ipd(id: $id) {
      id
      consultant_doctor
      date_of_admission
      created_at
      updated_at
      paid_amount
      patientId
      discharge_date
      patientType
      consultant_doctor
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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ downloadOpdForm }) => {
  console.log(downloadOpdForm)
  return (
    <>
      <section
        className=" text-black"
        style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
      >
        <section
          className="
          "
          style={{ width: '19.6cm', height: '27.7cm' }}
        >
          <section
            id="firstLayer"
            className=""
            // style={{ width: '19.6cm', height: '2.8cm' }}
            style={{ width: '19.6cm', height: '6cm' }}
          >
            {/* <div style={{ padding: '0cm 0.1cm' }}>
                    <img src="/srihos.jpg" alt="" srcset="" />
                  </div> */}

          </section>
          <section
            id="secondLayer"
            className=""
            style={{ width: '19.6cm', height: '0.65cm', padding: '0cm 0cm' }}

          >

            <div className="flex  justify-between px-6">
              <div className="space-x-4">
                <span className="font-bold text-xs ">Pt's Name : </span>
                <span className="text-xs">
                  {downloadOpdForm.patient.name.split('(')[0]}
                </span>
              </div>
              <div className="space-x-4">
                <span className="font-bold text-xs">Age : </span>
                <span className="text-xs">{downloadOpdForm.patient.age}</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold text-xs">B.P : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.BP} mmhg</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold text-xs">GRBS : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.Grbs} mg/dl</span>
              </div>


            </div>
            <div className="flex  justify-between px-6">
              <div className="space-x-4">
                <span className="font-bold text-xs ">Gender : </span>
                <span className="text-xs">
                  {downloadOpdForm.patient.gender}
                </span>
              </div>
              <div className="space-x-4">
                <span className="font-bold text-xs">Weight : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.Weight}</span>
              </div>
              {/* <div className="space-x-4">
                <span className="font-bold text-xs">Temp : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.Grbs} </span>
              </div> */}
              <div className="space-x-4">
                <span className="font-bold text-xs">Puls : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.Pulse} /min</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold text-xs">SPO2 : </span>
                <span className="text-xs">{downloadOpdForm.extra.thermo.Saturation} %</span>
              </div>


            </div>
          </section>









        </section>
      </section>

    </>
  )
}
