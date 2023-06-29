import IpdChat from 'src/components/IpdChat/IpdChat'

export const QUERY = gql`
  query FindIpdChatById($id: Int!) {
    ipdChat: ipdChat(id: $id) {
      id
      created_at
      ipdId
      date
      drug
      dose
      route
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>IpdChat not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdChat }) => {
  return <IpdChat ipdChat={ipdChat} />
}
