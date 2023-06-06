import OpdsList from "src/components/Opd/Opds/Opds"

export const QUERY = gql`
  query FindOpdReportQuery($startDate: String!,$endDate: String!) {
    opdReport: opdReport(startDate: $startDate, endDate: $endDate){
      data{
        id
      consultant_doctor
      charges
      paymentMode
      amount
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

  No Report Found B/w {startDate.toString()} and {endDate.toString()}

</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ opdReport,startDate,endDate }) => {
  return (
    <>
          <div className='text-white p-10 text-center'>
        <span>
          Total Paymnet Done From {startDate.toString()} to {endDate.toString()} is <span className='font-bold'>
            ₹{opdReport.totalSum}
          </span>
        </span>

      </div>
      <OpdsList opds={opdReport.data} />
    </>
  )
}
