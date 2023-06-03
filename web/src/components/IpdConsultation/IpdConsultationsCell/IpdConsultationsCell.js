import { Link, routes } from '@redwoodjs/router'

import IpdConsultations from 'src/components/IpdConsultation/IpdConsultations'

export const QUERY = gql`
  query FindIpdConsultations {
    ipdConsultations {
      id
      consultation_doctor
      consultation_type
      amount
      ipdId
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No ipdConsultations yet. '}
      <Link to={routes.newIpdConsultation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ipdConsultations }) => {
  return <IpdConsultations ipdConsultations={ipdConsultations} />
}
