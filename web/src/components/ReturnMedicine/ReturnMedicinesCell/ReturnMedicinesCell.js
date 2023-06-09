import { Link, routes } from '@redwoodjs/router'

import ReturnMedicines from 'src/components/ReturnMedicine/ReturnMedicines'

export const QUERY = gql`
  query FindReturnMedicines {
    returnMedicines {
      id
      date
      medicine
      total
      discount
      sgst
      cgst
      grand_total
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
      {'No returnMedicines yet. '}
      <Link to={routes.newReturnMedicine()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ returnMedicines }) => {
  return <ReturnMedicines returnMedicines={returnMedicines} />
}
