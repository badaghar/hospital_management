import IpdInvestigation from 'src/components/IpdInvestigation/IpdInvestigation'

export const QUERY = gql`
  query FindIpdInvestigationById($id: Int!) {
    ipdInvestigation: ipdInvestigation(id: $id) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdInvestigation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdInvestigation }) => {
  return <IpdInvestigation ipdInvestigation={ipdInvestigation} />
}
