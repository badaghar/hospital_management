import SaleMedicines from 'src/components/SaleMedicine/SaleMedicines'


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


  return (
    <>
      <div className='text-white p-10 text-center'>
        <span>
          Total Sale Amount  From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{saleReport?.totalSum}
          </span>
        </span>

      </div>
      <div className='bg-white text-black'>
      <SaleMedicines saleMedicines={saleReport.data} />
      </div>



    </>
  )
}
