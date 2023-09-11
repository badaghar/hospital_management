import BirthCertificate from 'src/components/BirthCertificate/BirthCertificate'

export const QUERY = gql`
  query FindBirthCertificateById($id: Int!) {
    birthCertificate: birthCertificate(id: $id) {
      id
      name
      birth_date
      weight
      type
      extra
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>BirthCertificate not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ birthCertificate }) => {
  return <BirthCertificate birthCertificate={birthCertificate} />
}
