import DownloadSaleMedicine from 'src/components/SaleMedicine/DownloadSaleMedicine/DownloadSaleMedicine'
import SaleMedicines from 'src/components/SaleMedicine/SaleMedicines'
import DownloadSaleReport from '../DownloadSaleReport/DownloadSaleReport'
import { useState } from 'react'



export const QUERY = gql`
  query FindPharmacyReportSaleQuery($startDate: String!,$endDate: String!){
    saleReport: saleReport(startDate: $startDate, endDate: $endDate){
      data {

      id
      billNo
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
      created_at
      updated_at
      patientId
      patient{
        name
      }

      }
      totalSum
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ startDate, endDate }) => <div>

  No Report Found B/w {startDate.toLocaleDateString()} and {endDate.toLocaleDateString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ saleReport, startDate, endDate }) => {
  const [download, setDownload] = useState(false)

  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Sale Amount  From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{saleReport?.totalSum.toFixed(2)}
          </span>

          {!download && <span className='ml-3 cursor-pointer underline' onClick={()=>setDownload(true)}>
            Download Excel
          </span>


          }
          {
            download && <div className='hidden'>
                  <DownloadSaleReport saleMedicines={saleReport.data} startDate={startDate.toLocaleDateString()} endDate={endDate.toLocaleDateString()} setDownload={setDownload} />
            </div>
          }
        </span>

      </div>
      <div className='bg-white text-black'>
      <SaleMedicines saleMedicines={saleReport.data} />
      </div>



    </>
  )
}
