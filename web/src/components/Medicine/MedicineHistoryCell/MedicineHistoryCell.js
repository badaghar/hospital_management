import { navigate, routes } from "@redwoodjs/router"
import { concatAST } from "graphql"
import { useLayoutEffect, useState } from "react"
import Medicine from "../Medicine/Medicine"

export const QUERY = gql`
  query FindMedicineHistoryQuery($time: DateTime!,$productId:Int!,$batch:String!) {
    medicineHistory: medicineHistory(time: $time,productId: $productId,batch: $batch) {
      id
      invoiceNo
      distributerId
      did{
        name
      }

      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ time, productId, medicineHistory, orignal }) => {
  const [medicine, setMedicine] = useState([])
  const [meds, setMeds] = useState([])
  let obj={}
  const med = medicineHistory.medicine.filter((e) => {
    console.log(e)
    return (e.product.name == orignal.pid.name && e.batch == orignal.batch)
  })
  const [md,setMd] = useState({ ...med[0] })



  useLayoutEffect(() => {
    console.log('called', orignal)
    console.log(medicineHistory.id)
    // console.log(medicineHistory)
    // console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n',medicineHistory.id)

    //   // routes.PurchaseMedicine({ id: medicineHistory.id })
    //   // navigate(`PurchaseMedicine/${medicineHistory.id}`)
    //   navigate(routes.purchaseMedicine({ id: medicineHistory.id }));
    let free = md.free_qty
    let pack = md.pack
    let paid = md.paid_qty
    let totalQuantity = orignal.quantity
    let qty = totalQuantity
    let i = 0
    let actudalPack = ((md.paid_qty + md.free_qty) * md.pack)
    console.log('====================================mdmdmdmmdmdmdm');
    console.log(md);
    console.log('====================================');

    while (qty % pack !== 0) {
      qty--

    }
    let actual_quantity = qty
    let free_pack = 0
    // console.log('====================================');
    // console.log(qty);
    // console.log('====================================');
    // // let free_pack = actual_quantity / (free * pack)
    // console.log('====================================');
    // console.log('hello00000',free*pack,qty);
    // console.log('====================================');
    while (free != 0 && free * pack > qty) {
      // console.log('====================================');
      // console.log('hello',free*pack,qty);
      // console.log('====================================');
      free--;
      // free_pack=free
    }


    // console.log('====================================');
    // console.log(free);
    // console.log('====================================');


    let remaining_qty = qty - free * pack
    while (paid != 0 && paid * pack > remaining_qty) {
      // console.log('====================================');
      // console.log('hello',paid*pack,remaining_qty);
      // console.log('====================================');
      paid--;
      // free_pack=free
    }

    console.log('====================================');
    console.log(paid);
    console.log('====================================');
    let amount =paid*md.rate
    let dis_amt = amount - (amount*md.dis/100)
    let gst_amount = (dis_amt*md.cgst/100) + (dis_amt*md.sgst/100)
    let net_amount = dis_amt + gst_amount

    console.log('====================================');
    console.log(dis_amt,gst_amount,net_amount);
    console.log('====================================');


    setMd((mid)=>{
      return{
        ...mid,
        totalQuantity:qty,
        free_qty:free,
        paid_qty:paid,
        amount:amount,
        net_amount
      }
    })

    // console.log('====================================');
    // console.log(paid);
    // console.log('====================================');







    let med = medicineHistory.medicine.filter((e) => {
      console.log(e)
      return (e.product.name == orignal.pid.name && e.batch == orignal.batch)
    })
    setMeds(med)
    setMedicine(med)
    // // setMedicine(med)
    // setMedicine()

  }, [])


  const onSave = () => {


  }
  // console.log('====================================');
  // console.log('this');
  // console.log('====================================');
  // console.log(medicine)

  return (
    <>
      <div className="bg-white p-6 shadow-lg rounded-lg grid gap-4 grid-cols-2 text-sm">

        <div className="col-span-2">
          <table className="w-full border border-gray-200 text-center">
            <tbody>
              <tr>
                <th className="p-4">Id</th>
                <th className="p-4">Invoice no</th>
                <th className="p-4">Distributor Name</th>
                <th className="p-4">Date</th>
              </tr>
              <tr>
                <td className="p-4">{medicineHistory.id}</td>
                <td className="p-4">{medicineHistory.invoiceNo}</td>
                <td className="p-4">{medicineHistory.did.name}</td>
                <td className="p-4">{medicineHistory.date.split('T00:00:00.000Z')}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="col-span-2">
          <h3 className=" font-bold mb-4">Product Information</h3>
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-4">Manufacturer</th>

                <th className="p-4">Product</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Paid Quantity</th>
                <th className="p-4">Free Quantity</th>
                <th className="p-4">Pack</th>
                <th className="p-4">Total Quantity</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Rate</th>
                <th className="p-4">Discount</th>
                <th className="p-4">SGST</th>
                <th className="p-4">CGST</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {meds.map((medicineHistory, index) => (
                <tr>
                  <td className="p-4">{medicineHistory.mfr.name}</td>
                  <td className="p-4">{medicineHistory.product.name}</td>
                  <td className="p-4">{medicineHistory.batch}</td>
                  <td className="p-4">{medicineHistory.paid_qty}</td>
                  <td className="p-4">{medicineHistory.free_qty}</td>
                  <td className="p-4">{medicineHistory.pack}</td>
                  <td className="p-4">{(medicineHistory.paid_qty + medicineHistory.free_qty) * medicineHistory.pack}</td>
                  <td className="p-4">{medicineHistory.exp ? medicineHistory.exp.split('-')[1] + '-' + medicineHistory.exp.split('-')[0] : '04-2026'} </td>
                  <td className="p-4">{medicineHistory.mrp.toFixed(2)}</td>
                  <td className="p-4">{medicineHistory.rate.toFixed(2)}</td>
                  <td className="p-4">{medicineHistory.dis.toFixed(2)}</td>
                  <td className="p-4">{medicineHistory.sgst}</td>
                  <td className="p-4">{medicineHistory.cgst}</td>
                  <td className="p-4">{medicineHistory.amount.toFixed(2)}</td>
                  <td className="p-4">{isNaN(parseFloat(medicineHistory.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(medicineHistory.net_amount).toFixed(2)}</td>
                </tr>
              ))}

                <tr>
              <td className="p-4">{md.mfr.name}</td>
              <td className="p-4">{md.product.name}</td>
              <td className="p-4">{md.batch}</td>
              <td className="p-4">{md.paid_qty}</td>
              <td className="p-4">{md.free_qty}</td>
              <td className="p-4">{md.pack}</td>
              <td className="p-4">{md.totalQuantity}</td>
              <td className="p-4">{md.exp ? md.exp.split('-')[1] + '-' + md.exp.split('-')[0] : '04-2026'} </td>
              <td className="p-4">{md.mrp.toFixed(2)}</td>
              <td className="p-4">{md.rate.toFixed(2)}</td>
              <td className="p-4">{md.dis.toFixed(2)}</td>
              <td className="p-4">{md.sgst}</td>
              <td className="p-4">{md.cgst}</td>
              <td className="p-4">{md.amount.toFixed(2)}</td>
              <td className="p-4">{isNaN(parseFloat(md.net_amount).toFixed(2)) ? (0).toFixed(2) : parseFloat(md.net_amount).toFixed(2)}</td>
              </tr>






            </tbody>
          </table>
        </div>


      </div>

      <div className="flex justify-center">
        <button onClick={onSave} className="bg-green-700 text-white hover:bg-green-800 p-3 rounded-lg"  >Add To Return Medicine</button>
      </div>

    </>
  )
}
