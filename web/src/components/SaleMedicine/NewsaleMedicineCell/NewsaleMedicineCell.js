import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleMedicineForm from 'src/components/SaleMedicine/SaleMedicineForm'

const CREATE_SALE_MEDICINE_MUTATION = gql`
  mutation CreateSaleMedicineMutation($input: CreateSaleMedicineInput!) {
    createSaleMedicine(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewsaleMedicineQuery {
    medicines {
      id
      quantity
      productId
      batch
      exp
      mrp
      sgst
      cgst
      discount
      created_at
      updated_at
      pid{
        name
      }

    }
    patients {
      id
      name
      age
      phone_no
      gender
      address
      created_at
      updated_at
    }
    users{
      id
      name
      roles

    }


  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ medicines, patients,users}) => {
  const [createSaleMedicine, { loading, error }] = useMutation(
    CREATE_SALE_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('SaleMedicine created')
        navigate(routes.saleMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSaleMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SaleMedicine</h2>
      </header>
      <div className="rw-segment-main">
        <SaleMedicineForm onSave={onSave} loading={loading} error={error}
          patients={patients} medicines={medicines} users={users}
        />
      </div>
    </div>
  )
}
