import Dossage from 'src/components/Dossage/Dossage'

export const QUERY = gql`
  query FindDossageById($id: Int!) {
    dossage: dossage(id: $id) {
      id
      dose
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Dossage not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ dossage }) => {
  return <Dossage dossage={dossage} />
}
