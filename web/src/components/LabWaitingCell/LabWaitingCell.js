import IpdInvestigationsList from "../IpdInvestigation/IpdInvestigations/IpdInvestigations"

export const QUERY = gql`
  query FindLabWaitingQuery($lab: String!) {
    labWaiting: labWaiting(lab: $lab) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
      ipd{
        patient{
          name
        }

      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ labWaiting }) => {
  return (
    <div className="rw-scaffold">

    <header className="rw-header">
      <h1 className="rw-heading rw-heading-primary" >
        </h1>

    </header>
    <main className="rw-main"><IpdInvestigationsList ipdInvestigations={labWaiting} upload={true} /></main>
  </div>





  )
}
