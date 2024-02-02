export const QUERY = gql`
  query FindAllotLabQuery {
    labs{
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ labs }) => {
  return <div>{JSON.stringify(labs)}</div>
}
