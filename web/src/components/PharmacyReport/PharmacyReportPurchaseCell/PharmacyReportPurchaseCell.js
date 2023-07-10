import { useState } from 'react'
import PurchaseMedicines from 'src/components/PurchaseMedicine/PurchaseMedicines'
import DownloadPurchaseReport from '../DownloadPurchaseReport/DownloadPurchaseReport'


export const QUERY = gql`
  query FindPharmacyReportPurchaseQuery($startDate: String!,$endDate: String!) {
    purchaseReport: purchaseReport(startDate: $startDate, endDate: $endDate) {
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
    },

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toLocaleDateString()} and {endDate.toLocaleDateString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ purchaseReport, startDate, endDate }) => {
  const [download, setDownload] = useState(false)


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Purchase Amount  From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{purchaseReport.totalSum}

          </span>

          {!download && <span className='ml-3 cursor-pointer underline' onClick={()=>setDownload(true)}>
            Download Excel
          </span>


          }
          {
            download && <div className='hidden'>
                  <DownloadPurchaseReport purchaseMedicines={purchaseReport.data} startDate={startDate.toLocaleDateString()} endDate={endDate.toLocaleDateString()} setDownload={setDownload} />
            </div>
          }



        </span>

      </div>
      <div className='bg-white text-black'>
        <PurchaseMedicines purchaseMedicines={purchaseReport.data} />
      </div>



    </>
  )
}
