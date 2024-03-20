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
              style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
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

            <div className="flex  justify-between px-6">
              <div className="space-x-4">
                <span className="font-bold  ">Pt's Name : </span>
                <span className="">
                  {downloadPrescription.patient.name.split('(')[0]}
                </span>
              </div>
              <div className="space-x-4">
                <span className="font-bold ">Age : </span>
                <span className="">{downloadPrescription.patient.age}</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold ">B.P : </span>
                <span className="">{downloadPrescription.extra.thermo.BP} mmhg</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold ">GRBS : </span>
                <span className="">{downloadPrescription.extra.thermo.Grbs} mg/dl</span>
              </div>


            </div>
            <div className="flex  justify-between px-6">
              <div className="space-x-4">
                <span className="font-bold  ">Gender : </span>
                <span className="">
                  {downloadPrescription.patient.gender}
                </span>
              </div>
              <div className="space-x-4">
                <span className="font-bold ">Weight : </span>
                <span className="">{downloadPrescription.extra.thermo.Weight}</span>
              </div>
              {/* <div className="space-x-4">
                <span className="font-bold ">Temp : </span>
                <span className="">{downloadPrescription.extra.thermo.Grbs} </span>
              </div> */}
              <div className="space-x-4">
                <span className="font-bold ">Puls : </span>
                <span className="">{downloadPrescription.extra.thermo.Pulse} /min</span>
              </div>
              <div className="space-x-4">
                <span className="font-bold ">SPO2 : </span>
                <span className="">{downloadPrescription.extra.thermo.Saturation} %</span>
              </div>


            </div>
            <div className='px-6'>
              <span className='font-bold'>Date :- </span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </section>
                {/* <section
                  id="firstLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '2.8cm' }}
                >
                  <div style={{ padding: '0cm 0.1cm' }}>
                    <img src="/srihos.jpg" alt="" srcset="" />
                  </div>
                </section> */}
                {/* <section
                  id="secondLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '0.65cm', padding: '0cm 0cm' }}

                >

                  <div className="flex f justify-between px-6">
                    <div className="space-x-4">
                      <span className="font-bold text-xs ">Name : </span> <span className="text-xs">
                        {downloadPrescription.patient.name.split('(')[0]}
                      </span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Mobile No : </span> <span className="text-xs">{downloadPrescription.patient.phone_no}</span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Date : </span> <span className="text-xs">{new Date().toLocaleDateString()}</span>
                    </div>


                  </div>
                </section> */}
                <section
                  id="thirdLayer"
                  className=" border-black"
                  style={{ width: '15.6cm', padding: '0.1cm 0cm',paddingLeft:'' }}
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




                </section>







              </section>
            </section>


          )


        })
      }

    </>

  )
}
