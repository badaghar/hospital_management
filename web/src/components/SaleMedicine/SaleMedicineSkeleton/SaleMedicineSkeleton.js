import { useEffect, useState } from 'react'

import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const converter = require('number-to-words')
const SaleMedicineSkeleton = ({ saleMedicine }) => {
  let slno = 0

  const [pages, setPages] = useState([])
  const [count, setCount] = useState()
  const [chunks, setChunks] = useState([])
  // let count = 0
  const [formatedDate, setFormatedDate] = useState('')
  useEffect(() => {
    const noOfPage = Math.ceil(saleMedicine.medicine.length / 15)
    // setPages(noOfPage)
    let page = []
    for (let i = 0; i < noOfPage; i++) {
      page.push(i)
    }
    setCount(noOfPage - 1)
    setPages(page)

    const array = saleMedicine.medicine

    const chunkSize = 15
    let i = 0

    while (i < array.length) {
      const chunk = array.slice(i, i + chunkSize)
      chunks.push(chunk)
      i += chunkSize
    }
  }, [saleMedicine])
  const formate = (da) => {
    console.log(da)
    const date = new Date(da)
    let fD = `${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
    return fD
  }
  return (
    <>
      {pages.map((item, ind) => {
        return (
          <section
            className="border border-black text-black"
            style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
          >
            <section
              className="border border-black"
              style={{ width: '19.6cm', height: '13.45cm' }}
            >
              <section
                id="firstLayer"
                className="border-b border-black"
                style={{ width: '19.6cm', height: '3.1cm' }}
              >
                <div style={{ padding: '0cm 0.1cm' }}>
                  <img src="/sri.jpg" alt="" srcSet="" />
                </div>
                <div className="flex justify-between px-6 text-xs font-bold">
                  <div>Bill No : {saleMedicine.billNo}</div>
                  <div>
                    Date :{' '}
                    {saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[2]}
                    -
                    {saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[1]}
                    -
                    {saleMedicine.date.split('T00:00:00.000Z')[0].split('-')[0]}
                  </div>
                </div>
              </section>
              <section
                id="secondLayer"
                className="border-b border-black"
                style={{
                  width: '19.6cm',
                  height: '0.65cm',
                  padding: '0cm 0cm',
                }}
              >
                <div className="f flex justify-between px-6">
                  <div className="space-x-4">
                    <span className="text-xs font-bold ">Name</span>{' '}
                    <span className="text-xs">
                      {saleMedicine.patient.name.split('(')[0]} (
                      {saleMedicine.patient.age})
                    </span>
                  </div>
                  <div className="space-x-4">
                    <span className="text-xs font-bold">Phone</span>{' '}
                    <span className="text-xs">
                      {saleMedicine.patient.phone_no}
                    </span>
                  </div>
                  <div className="space-x-4">
                    <span className="text-xs font-bold">Doctor Name </span>{' '}
                    <span className="text-xs">{saleMedicine.doctor_name}</span>
                  </div>
                </div>
              </section>
              <section
                id="thirdLayer"
                className="border-b border-black"
                style={{
                  width: '19.6cm',
                  height: '7.52cm',
                  padding: '0.1cm 0cm',
                }}
              >
                <div className="grid grid-cols-10  border-b border-black  text-xs font-bold">
                  <span className="">Sl No.</span>
                  <span className="col-span-3">Medicine Name</span>
                  <span>Batch No</span>
                  <span>Exp Date</span>
                  <span>MRP</span>
                  <span>Quantity</span>
                  <span>CGST/SGST</span>
                  <span>Amount (₹)</span>
                </div>
                <div className="grid grid-cols-10 text-xs ">
                  {chunks[item].map((med) => {
                    slno += 1
                    return (
                      <>
                        <span>{slno}</span>
                        <span className="col-span-3">
                          {med['medicine Name']}
                        </span>
                        <span>{med['batch No'].split('-')[0]}</span>
                        <span>{formate(med['Expiry Date'])}</span>
                        <span>
                          {med['mrp']}
                          {Number.isInteger(med['mrp']) && <>.00</>}
                        </span>
                        <span>{med['quantity']}</span>
                        <span>{med['cgst/sgst']}</span>
                        <span>
                          {med['amount']}
                          {Number.isInteger(med['amount']) && <>.00</>}
                        </span>
                      </>
                    )
                  })}
                </div>
              </section>

              <section id="fourtLayer" className="" style={{ width: '19.6cm' }}>
                <div className="grid grid-cols-4  justify-between  ">
                  <div className=" relative col-span-3 grid grid-cols-3">
                    <div className="col-span-2">
                      <div className="text-sm font-bold underline">
                        Terms & Conditions
                      </div>
                      <div className="text-xs">
                        Goods once sold will not be taken back or exchanged.
                        Bills not paid due date will attract 24% interest. All
                        disputes subject to Jurisdiction only. Prescribed Sales
                        Tax declaration will be given
                      </div>
                    </div>
                    <div className=" absolute bottom-1 right-4 text-sm">
                      Authorised Signatory
                    </div>
                  </div>
                  <div className="grid  grid-cols-2 border-l border-black text-xs ">
                    <span className="pl-1 font-bold">SUB TOTAL</span>{' '}
                    <span className="border-l  border-black  pl-1">
                      {' '}
                      {count != ind ? '---' : saleMedicine.total}
                      {count != ind
                        ? ''
                        : Number.isInteger(saleMedicine.total) && <>.00</>}
                    </span>
                    <span className="pl-1 font-bold"> SGST</span>{' '}
                    <span className="border-l  border-black  pl-1">
                      {count != ind ? '---' : saleMedicine.sgst}
                    </span>
                    <span className="pl-1 font-bold"> CGST</span>{' '}
                    <span className="border-l  border-black  pl-1">
                      {count != ind ? '---' : saleMedicine.cgst}
                    </span>
                    <span className="pl-1 font-bold"> Discount</span>{' '}
                    <span className="border-l  border-black  pl-1">
                      {' '}
                      {count != ind ? '---' : saleMedicine.discount}
                      {count != ind
                        ? ''
                        : Number.isInteger(saleMedicine.discount) && <>.00</>}
                    </span>
                    <span className="border-t border-black pl-1 font-bold">
                      GRAND TOTAL
                    </span>{' '}
                    <span className="border-l border-t border-black pl-1  font-bold">
                      {count != ind ? '---' : saleMedicine.grand_total}
                      {count != ind
                        ? ''
                        : Number.isInteger(saleMedicine.grand_total) && (
                            <>.00</>
                          )}
                    </span>
                  </div>
                </div>
              </section>
            </section>
          </section>
        )
      })}
    </>
  )
}

export default SaleMedicineSkeleton
