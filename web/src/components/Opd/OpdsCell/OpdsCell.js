import { Link, routes } from '@redwoodjs/router'

import Opds from 'src/components/Opd/Opds'

export const QUERY = gql`
  query FindOpds {
    opds {
      id
      consultant_doctor
      charges
      paymentMode
      amount
      created_at
      updated_at
      patientId
      patient{
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No opds yet. '}
      <Link to={routes.newOpd()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ opds }) => {
  return <Opds opds={opds} />
}
