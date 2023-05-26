import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ManufacturerForm from 'src/components/Manufacturer/ManufacturerForm'

export const QUERY = gql`
  query EditManufacturerById($id: Int!) {
    manufacturer: manufacturer(id: $id) {
      id
      name
      created_at
      updated_at
    }
  }
`
const UPDATE_MANUFACTURER_MUTATION = gql`
  mutation UpdateManufacturerMutation(
    $id: Int!
    $input: UpdateManufacturerInput!
  ) {
    updateManufacturer(id: $id, input: $input) {
      id
      name
      created_at
      updated_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ manufacturer }) => {
  const [updateManufacturer, { loading, error }] = useMutation(
    UPDATE_MANUFACTURER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Manufacturer updated')
        navigate(routes.manufacturers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateManufacturer({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Manufacturer {manufacturer?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ManufacturerForm
          manufacturer={manufacturer}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
