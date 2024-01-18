import Duration from 'src/components/Duration/Duration'

export const QUERY = gql`
  query FindDurationById($id: Int!) {
    duration: duration(id: $id) {
      id
      name
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Duration not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ duration }) => {
  return <Duration duration={duration} />
}
