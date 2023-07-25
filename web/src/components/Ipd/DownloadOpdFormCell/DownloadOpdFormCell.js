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
  return (
    <>
           <section
              className="border-black border text-black"
              style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
            >
              <section
                className="border-black border"
                style={{ width: '19.6cm', height: '13.45cm' }}
              >
                <section
                  id="firstLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '2.8cm' }}
                >
                  <div style={{ padding: '0cm 0.1cm' }}>
                    <img src="/sri.jpg" alt="" srcset="" />
                  </div>
                  {/* <div className="flex font-bold text-xs justify-between px-6">
                  <div>
                    Bill No :
                  </div>
                  <div>
                    Date :
                  </div>

                </div> */}
                </section>
                <section
                  id="secondLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '0.65cm', padding: '0cm 0cm' }}

                >

                  <div className="flex f justify-between px-6">
                    <div className="space-x-4">
                      <span className="font-bold text-xs ">Name : </span> <span className="text-xs">
                        {downloadOpdForm.patient.name.split('(')[0]}
                      </span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Mobile No : </span> <span className="text-xs">{downloadOpdForm.patient.phone_no}</span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Date : </span> <span className="text-xs">{new Date().toLocaleDateString()}</span>
                    </div>


                  </div>
                </section>
                {/* <section
                  id="thirdLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '7.52cm', padding: '0.1cm 0cm' }}
                >






                </section> */}


                {/* <section
                  id="fourtLayer"
                  className="relative"
                  style={{ width: '19.6cm' }}
                >

                  <div className="grid grid-cols-8  font-bold border-b   border-black">
                    <span className="col-span-1"></span>
                    <span className="col-span-5">Total</span>

                    <span className="col-span-2">(₹) {sum}</span>
                  </div>

                  <div className="absolute top-16 left-5">
                    <span>Signature</span>
                  </div>
                </section> */}




              </section>
            </section>

    </>
  )
}
