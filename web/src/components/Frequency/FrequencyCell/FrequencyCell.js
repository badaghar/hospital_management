import Frequency from 'src/components/Frequency/Frequency'

export const QUERY = gql`
  query FindFrequencyById($id: Int!) {
    frequency: frequency(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Frequency not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ frequency }) => {
  return <Frequency frequency={frequency} />
}
