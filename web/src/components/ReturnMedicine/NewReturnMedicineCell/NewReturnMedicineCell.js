import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReturnMedicineForm from 'src/components/ReturnMedicine/ReturnMedicineForm'

const CREATE_RETURN_MEDICINE_MUTATION = gql`
  mutation CreateReturnMedicineMutation($input: CreateReturnMedicineInput!) {
    createReturnMedicine(input: $input) {
      id
    }
  }
`

export const QUERY = gql`
  query FindNewReturnMedicineQuery {
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
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ patients,medicines }) => {
  const [createReturnMedicine, { loading, error }] = useMutation(
    CREATE_RETURN_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ReturnMedicine created')
        navigate(routes.returnMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createReturnMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ReturnMedicine</h2>
      </header>
      <div className="rw-segment-main">
        <ReturnMedicineForm onSave={onSave} loading={loading} error={error}
          patients={patients} medicines={medicines}
        />
      </div>
    </div>
  )
}
