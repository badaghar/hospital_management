import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ManufacturerForm from 'src/components/Manufacturer/ManufacturerForm'

const CREATE_MANUFACTURER_MUTATION = gql`
  mutation CreateManufacturerMutation($input: CreateManufacturerInput!) {
    createManufacturer(input: $input) {
      id
    }
  }
`

const NewManufacturer = () => {
  const [createManufacturer, { loading, error }] = useMutation(
    CREATE_MANUFACTURER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Manufacturer created')
        navigate(routes.manufacturers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createManufacturer({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Manufacturer</h2>
      </header>
      <div className="rw-segment-main">
        <ManufacturerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewManufacturer
