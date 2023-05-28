import { useEffect, useState } from "react"
import { jsonTruncate, timeTag,truncate } from 'src/lib/formatters'
const converter = require('number-to-words');
const SaleMedicineSkeleton = ({ saleMedicine }) => {

  const [pages, setPages] = useState([])
  const [chunks,setChunks] = useState([])
  let count = 0
  const [formatedDate,setFormatedDate] = useState("")
  useEffect(() => {
    const noOfPage = Math.ceil(saleMedicine.medicine.length / 10)
    // setPages(noOfPage)
    let page = []
    for (let i = 0; i < noOfPage; i++) {
      page.push(i)

    }
    setPages(page)
    console.log(saleMedicine.date.split('T00:00:00.000Z')[0])
    const date = new Date("2023-05-31");
    let fD = `${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    // console.log(formattedDate);
    setFormatedDate(fD)

    const array = saleMedicine.medicine;

      const chunkSize = 10;
      // const chunks = [];
      let i = 0;

      while (i < array.length) {
        const chunk = array.slice(i, i + chunkSize);
        chunks.push(chunk);
        i += chunkSize;
      }


  }, [saleMedicine])
  return (
    <>
      {
        pages.map((item) => {
          return (
            <section
              className="border-black border text-black"
              style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
            >
              <section
                className="border-black border"
                style={{ width: '19.6cm', height: '14.85cm' }}
              >
                <section
                  id="firstLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '3.5cm' }}
                >
                  <div style={{padding:'0cm 0.1cm'}}>
                    <img src="/sri.jpg" alt="" srcset="" />
                  </div>
                  <div className="flex font-bold justify-between px-6">
                    <div>
                      Bill No : {saleMedicine.billNo}
                    </div>
                    <div>
                      Date : {saleMedicine.date.split('T00:00:00.000Z')[0]}
                    </div>

                  </div>
                </section>
                <section
                  id="secondLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '0.9cm' ,padding:'0.1cm 0cm' }}
                >

                  <div className="flex f justify-between px-6">
                    <div className="space-x-4">
                      <span className="font-bold">Name</span> <span>{saleMedicine.patient.name} ({saleMedicine.patient.age})</span>
                    </div>
                    <div className="space-x-4">
                    <span className="font-bold">Phone</span> <span>{saleMedicine.patient.phone_no}</span>
                    </div>

                  </div>
                </section>
                <section
                  id="thirdLayer"
                  className="border-b border-black"
                  style={{ width: '19.6cm', height: '7cm' ,padding:'0.1cm 0cm' }}
                >

                  <div className="grid grid-cols-8  font-bold">
                    <span className="col-span-2">Medicine Name</span>
                    <span>Batch No</span>
                    <span>Exp Date</span>
                    <span>MRP</span>
                    <span>Quantity</span>
                    <span>CGST/SGST</span>
                    <span>Amount (₹)</span>
                  </div>
                  <div className="text-sm grid grid-cols-8 ">
                    {
                      chunks[item].map((med)=>{
                        return(
                          <>
                          <span className="col-span-2">{med['medicine Name']}</span>
                          <span>{med['batch No']}</span>
                          <span>{formatedDate}</span>
                          <span>{med['mrp']}</span>
                          <span>{med['quantity']}</span>
                          <span>{med['cgst/sgst']}</span>
                          <span>{med['amount']}</span>
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
                      <div className="col-span-2 p-5">
                          {/* Rs. {converter.toWords(saleMedicine.grand_total)} Only */}
                      </div>
                      <div className=" absolute bottom-1 right-4 ">
                        Authorised Signatory
                      </div>
                    </div>
                    <div className="border-l  border-black text-sm pl-3 grid grid-cols-2">
                    <span className="font-bold">SUB TOTAL</span> <span>{saleMedicine.total}</span>
                    <span className="font-bold"> SGST</span> <span>{saleMedicine.sgst}</span>
                    <span className="font-bold"> CGST</span> <span>{saleMedicine.cgst}</span>
                    <span className="font-bold "> Discount</span> <span>{saleMedicine.discount}</span>
                    <span className="h-1 bg-black col-span-2 "></span>
                    <span className="font-bold">GRAND TOTAL</span> <span>{saleMedicine.grand_total}</span>
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
