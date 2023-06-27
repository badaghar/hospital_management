import IpdSummary from 'src/components/IpdSummary/IpdSummary'

export const QUERY = gql`
  query FindIpdSummaryById($id: Int!) {
    ipdSummary: ipdSummary(id: $id) {
      id
      created_at
      ipdId
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdSummary not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdSummary }) => {
  return <IpdSummary ipdSummary={ipdSummary} />
}
