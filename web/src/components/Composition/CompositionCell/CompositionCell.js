import Composition from 'src/components/Composition/Composition'

export const QUERY = gql`
  query FindCompositionById($id: Int!) {
    composition: composition(id: $id) {
      id
      name
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Composition not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ composition }) => {
  return <Composition composition={composition} />
}
