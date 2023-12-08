import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HomoMedicineForm from 'src/components/HomoMedicine/HomoMedicineForm'

const CREATE_HOMO_MEDICINE_MUTATION = gql`
  mutation CreateHomoMedicineMutation($input: CreateHomoMedicineInput!) {
    createHomoMedicine(input: $input) {
      id
    }
  }
`

const NewHomoMedicine = () => {
  const [createHomoMedicine, { loading, error }] = useMutation(
    CREATE_HOMO_MEDICINE_MUTATION,
    {
      onCompleted: () => {
        toast.success('HomoMedicine created')
        navigate(routes.homoMedicines())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createHomoMedicine({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New HomoMedicine</h2>
      </header>
      <div className="rw-segment-main">
        <HomoMedicineForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHomoMedicine
