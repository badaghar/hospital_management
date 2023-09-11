import { Link, routes } from '@redwoodjs/router'

import BirthCertificates from 'src/components/BirthCertificate/BirthCertificates'

export const QUERY = gql`
  query FindBirthCertificates {
    birthCertificates {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No birthCertificates yet. '}
      <Link to={routes.newBirthCertificate()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ birthCertificates }) => {
  return <BirthCertificates birthCertificates={birthCertificates} />
}
