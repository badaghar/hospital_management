import {useState,useEffect} from 'react'
export const QUERY = gql`
  query FindDownloadOtherChargeQuery($id: Int!) {
    downloadOtherCharge: ipd(id: $id) {
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

export const Success = ({ downloadOtherCharge }) => {
  const [pages, setPages] = useState([])
  const [count, setCount] = useState()
  const [chunks, setChunks] = useState([])
  const [sum, setSum] = useState(0)
  const [obj,setObj] = useState({})
  // let count = 0
  const [formatedDate, setFormatedDate] = useState("")
  useEffect(() => {
    // charge_type
    // charge
    // quantity
    // total
    const myArray  = [...downloadOtherCharge.IpdCharges]
    const myArray2 = downloadOtherCharge.IpdOperationPayment.map((val,ind)=>{
      return { 'charge_type':`OPERATION (${val.operation_name})`,'charge':val.amount,'quantity':1,'total':val.amount }
    })
    const myArray3 = downloadOtherCharge.IpdConsultation.map((val,ind)=>{
      return { 'charge_type':val.consultation_type,'charge':val.amount,'quantity':1,'total':val.amount }
    })

    const actualArray = [...myArray,...myArray2,...myArray3]
    const noOfPage = Math.ceil(actualArray.length / 15)
    // setPages(noOfPage)
    let page = []
    for (let i = 0; i < noOfPage; i++) {
      page.push(i)

    }
    setCount(noOfPage - 1)
    setPages(page)

    const array = actualArray;

    const chunkSize = 15;
    let i = 0;
    let sumTemp = array.reduce((prev, lab) => prev + lab.total, 0)
    setSum(sumTemp)

    while (i < array.length) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
      i += chunkSize;
    }

    let dis=0,gst=0;
    downloadOtherCharge.IpdPayment.map((item) => {
      if (item.payment_mode == 'disc') {
        dis += item.amount

      }
      if(item.payment_mode == 'gst')
      {
        gst+=item.amount

      }
    })

    setObj({
      gst,
      dis
    })





  }, [downloadOtherCharge])
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
                    <img src="/srihos.jpg" alt="" srcset="" />
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
                        {downloadOtherCharge.patient.name.split('(')[0]}
                      </span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Mobile No : </span> <span className="text-xs">{downloadOtherCharge.patient.phone_no}</span>
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-xs">Date : </span> <span className="text-xs">{new Date().toLocaleDateString()}</span>
                    </div>


                  </div>
                </section>
                <section
                  id="thirdLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '7.52cm', padding: '0.1cm 0cm' }}
                >

                  <div className="grid grid-cols-8  font-bold border-b  text-xs border-black">
                    <span className="col-span-1">Sl. No</span>
                    <span className="col-span-3">Item Name</span>
                    <span className="col-span-1">Unit Cost</span>
                    <span className="col-span-1">Qty</span>

                    <span className="col-span-2">Amount (₹)</span>
                  </div>
                  <div className="text-xs grid grid-cols-8 ">
                    {
                      chunks[item].map((lab, ind) => {
                        return (
                          <>

                            <span className="col-span-1">{ind + 1}</span>
                            <span className="col-span-3">{lab.charge_type}</span>
                            <span className="col-span-1">{lab.charge}</span>
                            <span className="col-span-1">{lab.quantity}</span>
                            <span className="col-span-2">{lab.total}</span>
                          </>
                        )

                      })
                    }

                  </div>




                </section>


                <section
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
                  <div className="absolute right-5 flex text-xs justify-start flex-col">
                    <span>Discount :- {obj.dis*-1}</span>
                    <span>GST Amount :- {obj.gst}</span>
                    <span>Paid Amount :- {downloadOtherCharge.paid_amount - obj.gst } </span>
                    <span>balanace :- {sum + obj.dis+ obj.gst - (downloadOtherCharge.paid_amount - obj.gst)}</span>
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
