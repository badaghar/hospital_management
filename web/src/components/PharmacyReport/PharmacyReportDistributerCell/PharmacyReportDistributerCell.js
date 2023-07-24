import { useEffect,useState } from 'react';
// import { useState } from 'react-js-dialog-box';
import PurchaseMedicines from 'src/components/PurchaseMedicine/PurchaseMedicines'


export const QUERY = gql`
  query FindPharmacyReportDistributerQuery($id: Int!,$startDate: String!,$endDate: String!) {
    distributersReport: distributersReport(id: $id,startDate: $startDate, endDate: $endDate) {
      data {
        id
      invoiceNo
      distributerId
      did{
        id
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
      totalSum
      data2{
        id
        balance
        paid
      }
    },

  }
`
function convertToShortDateString(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toLocaleDateString()} and {endDate.toLocaleDateString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ distributersReport, startDate, endDate }) => {
  const [totalBalanace,setTotalBalanace] = useState(0)
  const [totalPaid,setTotalPaid] = useState(0)
  useEffect(()=>{
    const tb = distributersReport.data2.reduce((prev,item)=> prev + item.balance,0)
    const tp = distributersReport.data2.reduce((prev,item)=> prev + item.paid,0)
    setTotalBalanace(tb)
    setTotalPaid(tp)

  },[distributersReport])


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Purchase Amount From Distributer {distributersReport.data[0]?.did?.name} From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{distributersReport.totalSum} <br />
            Total Amount Paid to the Distributer is ₹{totalBalanace} and Total Balance To Be Paid is ₹{totalPaid}
          </span>
        </span>

      </div>
      <div className='bg-white text-black'>
      <PurchaseMedicines purchaseMedicines={distributersReport.data} />

      </div>



    </>
  )
}
