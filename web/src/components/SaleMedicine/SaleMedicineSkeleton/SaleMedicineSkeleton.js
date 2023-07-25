import { useEffect, useState } from "react"
import { jsonTruncate, timeTag,truncate } from 'src/lib/formatters'
const converter = require('number-to-words');
const SaleMedicineSkeleton = ({ saleMedicine }) => {

  const [pages, setPages] = useState([])
  const [count,setCount] = useState()
  const [chunks,setChunks] = useState([])
  // let count = 0
  const [formatedDate,setFormatedDate] = useState("")
  useEffect(() => {
    const noOfPage = Math.ceil(saleMedicine.medicine.length / 15)
    // setPages(noOfPage)
    let page = []
    for (let i = 0; i < noOfPage; i++) {
      page.push(i)

    }
    setCount(noOfPage-1)
    setPages(page)

    const array = saleMedicine.medicine;

      const chunkSize = 15;
      let i = 0;

      while (i < array.length) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
        i += chunkSize;
      }


  }, [saleMedicine])
  const formate = (da) =>{
    console.log(da)
    const date = new Date(da)
    let fD = `${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    return fD

  }
  return (
    <>
      {
        pages.map((item,ind) => {
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
                  style={{ width: '19.6cm', height: '3.1cm' }}
                >
                  <div style={{padding:'0cm 0.1cm'}}>
                    <img src="/sri.jpg" alt="" srcset="" />
                  </div>
                  <div className="flex font-bold text-xs justify-between px-6">
                    <div>
                      Bill No : {saleMedicine.billNo}
                    </div>
                    <div>
                      Date : {saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[2]}-{saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[1]}-{saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[0]}
                    </div>

                  </div>
                </section>
                <section
                  id="secondLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '0.65cm' ,padding:'0cm 0cm' }}
                >

                  <div className="flex f justify-between px-6">
                    <div className="space-x-4">
                      <span className="font-bold text-xs ">Name</span> <span className="text-xs">{saleMedicine.patient.name.split('(')[0]} ({saleMedicine.patient.age})</span>
                    </div>
                    <div className="space-x-4">
                    <span className="font-bold text-xs">Phone</span> <span className="text-xs">{saleMedicine.patient.phone_no}</span>
                    </div>
                    <div className="space-x-4">
                    <span className="font-bold text-xs">Doctor Name </span> <span className="text-xs">{saleMedicine.doctor_name}</span>
                    </div>

                  </div>
                </section>
                <section
                  id="thirdLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '7.52cm' ,padding:'0.1cm 0cm' }}
                >

                  <div className="grid grid-cols-8  font-bold border-b  text-xs border-black">
                    <span className="col-span-2">Medicine Name</span>
                    <span>Batch No</span>
                    <span>Exp Date</span>
                    <span>MRP</span>
                    <span>Quantity</span>
                    <span>CGST/SGST</span>
                    <span>Amount (₹)</span>
                  </div>
                  <div className="text-xs grid grid-cols-8 ">
                    {
                      chunks[item].map((med)=>{
                        return(
                          <>
                          <span className="col-span-2">{med['medicine Name']}</span>
                          <span>{med['batch No']}</span>
                          <span>{formate(med['Expiry Date'])}</span>
                          <span>{med['mrp']}{  Number.isInteger(med['mrp']) && <>.00</>}</span>
                          <span>{med['quantity']}</span>
                          <span>{med['cgst/sgst']}</span>
                          <span>{med['amount']}{  Number.isInteger(med['amount']) && <>.00</>}</span>
                          </>
                        )

                      })
                    }

                  </div>




                </section>


                <section
                  id="fourtLayer"
                  className=""
                  style={{ width: '19.6cm' }}
                >

                  <div className="grid grid-cols-4  justify-between  ">
                    <div className=" col-span-3 grid grid-cols-3 relative">
                      <div className="col-span-2">
                        <div className="font-bold underline text-sm">Terms & Conditions</div>
                        <div className="text-xs">
                          Goods once sold will not be taken back or exchanged.
                          Bills not paid due date will attract 24% interest.
                          All disputes subject to Jurisdiction only.
                          Prescribed Sales Tax declaration will be given
                        </div>

                      </div>
                      <div className=" absolute bottom-1 right-4 text-sm">
                        Authorised Signatory
                      </div>
                    </div>
                    <div className="border-l  border-black grid grid-cols-2 text-xs ">
                    <span className="font-bold pl-1">SUB TOTAL</span> <span className="border-l  border-black  pl-1">  { count!=ind ?  '---'  : saleMedicine.total}{count!=ind ?  ''  :  (Number.isInteger(saleMedicine.total) && <>.00</>)}</span>
                    <span className="font-bold pl-1"> SGST</span> <span className="border-l  border-black  pl-1">{ count!=ind ?  '---'  : saleMedicine.sgst}</span>
                    <span className="font-bold pl-1"> CGST</span> <span className="border-l  border-black  pl-1">{ count!=ind ?  '---'  : saleMedicine.cgst}</span>
                    <span className="font-bold pl-1"> Discount</span> <span className="border-l  border-black  pl-1">  {count!=ind ?  '---'  :  saleMedicine.discount}{count!=ind ?  ''  : ( Number.isInteger(saleMedicine.discount) && <>.00</>)}</span>
                    <span className="font-bold pl-1 border-t border-black">GRAND TOTAL</span> <span  className="font-bold border-t border-black border-l  pl-1">{ count!=ind ?  '---'  : saleMedicine.grand_total}{ count!=ind ?  ''  : ( Number.isInteger(saleMedicine.grand_total) && <>.00</>)}</span>
                    </div>

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

export default SaleMedicineSkeleton
