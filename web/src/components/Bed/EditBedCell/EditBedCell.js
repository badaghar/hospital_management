import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BedForm from 'src/components/Bed/BedForm'

export const QUERY = gql`
  query EditBedById($id: Int!) {
    bed: bed(id: $id) {
      id
      bed_name
      occupied
      created_at
      updated_at
      floorId
      ipdId
    }
  }
`
const UPDATE_BED_MUTATION = gql`
  mutation UpdateBedMutation($id: Int!, $input: UpdateBedInput!) {
    updateBed(id: $id, input: $input) {
      id
      bed_name
      occupied
      created_at
      updated_at
      floorId
      ipdId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bed }) => {
  const [updateBed, { loading, error }] = useMutation(UPDATE_BED_MUTATION, {
    onCompleted: () => {
      toast.success('Bed updated')
      navigate(routes.beds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateBed({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Bed {bed?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BedForm bed={bed} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
