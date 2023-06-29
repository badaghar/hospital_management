import IpdsList from "src/components/Ipd/Ipds/Ipds"

export const QUERY = gql`
  query FindIpdReportQuery($startDate: String!,$endDate: String!,$type: String!) {
    ipdReport: ipdReport(startDate: $startDate, endDate: $endDate,type: $type) {
      data{
        id
      consultant_doctor
      date_of_admission
      discharge_date
      created_at
      updated_at
      paid_amount
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

export const Success = ({ ipdReport,startDate,endDate }) => {
  return (
    <>
          <div className='text-white p-10 text-center'>
        <span>
          Total Paymnet Done From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} is <span className='font-bold'>
            ₹{ipdReport.totalSum}
          </span>
        </span>

      </div>
      <div className='bg-white text-black'>
      <IpdsList ipds={ipdReport.data} />
      </div>
    </>
  )
}
