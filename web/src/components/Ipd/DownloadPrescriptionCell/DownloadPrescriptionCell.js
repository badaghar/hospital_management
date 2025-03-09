import { useState, useEffect } from 'react'

export const QUERY = gql`
 query FindDownloadPrescriptionQuery($id: Int!) {
    downloadPrescription: ipd(id: $id) {
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
        potency
        dosage
        timing
        frequency
        duration
        note

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ downloadPrescription }) => {
  const [pages, setPages] = useState([])
  const [count, setCount] = useState()
  const [chunks, setChunks] = useState([])
  const [sum, setSum] = useState(0)
  // let count = 0
  const [formatedDate, setFormatedDate] = useState("")
  useEffect(() => {
    const noOfPage = Math.ceil((downloadPrescription.IpdPrescription.length + downloadPrescription.IpdHomoPrescription.length) / 15)
    // setPages(noOfPage)
    let page = []
    for (let i = 0; i < noOfPage; i++) {
      page.push(i)

    }
    setCount(noOfPage - 1)
    setPages(page)

    const array = [...downloadPrescription.IpdPrescription, ...downloadPrescription.IpdHomoPrescription];
    console.log(array)

    const chunkSize = 15;
    let i = 0;
    // let sumTemp = array.reduce((prev, lab) => prev + lab.amount, 0)
    // setSum(sumTemp)

    while (i < array.length) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
      i += chunkSize;
    }


  }, [downloadPrescription])
  const formate = (da) => {
    console.log(da)
    const date = new Date(da)
    let fD = `${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    return fD

  }

  return (
    <>
      {
        pages.map((item, ind) => {
          return (
            <section
              className=" text-black"
              style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm',
                // backgroundImage: 'url("/abc.png")', backgroundSize: 'cover',
              }}
            >
              <section
                className=""
                style={{ width: '19.6cm', height: '27cm' }}
              >
                <section
                  id="zeroLayer"
                  className=""
                  // style={{ width: '19.6cm', height: '2.8cm' }}
                  style={{ width: '19.6cm', height: '4cm' }}
                >
                  {/* <div style={{ padding: '0cm 0.1cm' }}>
                    <img src="/srihos.jpg" alt="" srcset="" />
                  </div> */}

                </section>
                <section
                  id="secondLayer"
                  className="text-sm"
                  style={{ width: '19.6cm', height: '2cm', padding: '0cm 0cm' }}

                >



                  <div
                    style={{
                      position: "absolute",
                      top: "4.3cm",
                    }}
                  >
                    {/* First Child */}
                    <div
                      style={{
                        position: "absolute",
                        left: "1cm",
                      }}
                    >
                      {downloadPrescription.patient.name.split('(')[0]}


                    </div>

                    {/* Second Child */}
                    <div
                      style={{
                        position: "absolute",
                        left: "11cm",
                      }}
                    >

                      {downloadPrescription.patient.age}
                    </div>

                    {/* Third Child */}
                    <div
                      style={{
                        position: "absolute",
                        left: "14.2cm",
                      }}
                    >

                      {downloadPrescription.patient.gender}
                    </div>

                    {/* Fourth Child */}
                    <div
                      style={{
                        position: "absolute",
                        left: "17cm",
                      }}
                    >
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>



                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    {/* First Child - Fixed Width 10cm */}
                    <div
                      style={{
                        width: "5cm",
                        position: "relative",
                        left: '2cm'
                      }}
                    >
                      <div style={{ position: "absolute", top: "0.8cm" }}>
                        {downloadPrescription.extra.thermo.BP} mmhg
                      </div>
                      <div style={{ position: "absolute", top: "1.8cm" }}>
                        {downloadPrescription.extra.thermo.Grbs} mg/dl
                      </div>
                      <div style={{ position: "absolute", top: "2.9cm" }}>
                        {downloadPrescription.extra.thermo.Saturation} %
                      </div>
                      <div style={{ position: "absolute", top: "4cm" }}>
                        {downloadPrescription.extra.thermo.Weight}
                      </div>
                    </div>

                    {/* Second Child - Takes Remaining Space */}
                    <div
                      style={{
                        flex: 1,
                        // backgroundColor: 'blue'
                        position:'relative',
                        top:'0.8cm'

                      }}
                    >

                      {/* <div className="grid grid-cols-7  font-bold border-b  text-xs border-black">
                        <span className="col-span-1">Sl. No</span>

                        <div className=" col-span-1 ">Medicine </div>
                        <div className=" col-span-1 ">Dosage</div>
                        <div className=" col-span-1 ">Timing</div>
                        <div className=" col-span-1 ">Frequency</div>
                        <div className=" col-span-1 ">Duration</div>
                        <div className=" col-span-1 ">Quantity</div>
                      </div> */}

                      <div className="text-sm grid grid-cols-4 ">
                        {
                          chunks[item].map((item, ind) => {
                            let medName = item.medicine.split('-')
                            medName = medName[medName.length - 1]
                            return (
                              <>

                                <span className="col-span-1">{ind + 1}</span>
                                {<div className=" col-span-1">{medName}</div>}
                                {<div className=" col-span-1">{item.potency}</div>}
                                {/* {item.quantity ? <div className=" col-span-1">{[item.medicine.split('-').length-1]}</div> : <div className=" col-span-1">{item.medicine}</div>} */}
                                <div className=" col-span-1">{item.dosage}</div>
                                {/* <div className=" col-span-1">{item.timing}</div> */}
                                {/* <div className=" col-span-1">{item.frequency}</div> */}
                                {/* <div className=" col-span-1">{item.duration}</div> */}
                                {item.quantity ? <div className=" col-span-1">{item.quantity}</div> : <div className=" col-span-1">-</div>}

                                {<div className="flex col-span-4 justify-center" > {item.note && 'Note :-'} {item.note}</div>}
                              </>
                            )

                          })
                        }

                      </div>

                    </div>
                  </div>





                </section>

                <section
                  id="thirdLayer"
                  className=" border-black"
                  style={{ width: '15.6cm', padding: '0.1cm 0cm', paddingLeft: '' }}
                >

                  {/* <div className="grid grid-cols-7  font-bold border-b  text-xs border-black">
                    <span className="col-span-1">Sl. No</span>

                    <div className=" col-span-1 ">Medicine </div>
                    <div className=" col-span-1 ">Dosage</div>
                    <div className=" col-span-1 ">Timing</div>
                    <div className=" col-span-1 ">Frequency</div>
                    <div className=" col-span-1 ">Duration</div>
                    <div className=" col-span-1 ">Quantity</div>
                  </div> */}





                </section>







              </section>
            </section>


          )


        })
      }

    </>

  )
}
