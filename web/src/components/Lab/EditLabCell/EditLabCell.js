import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabForm from 'src/components/Lab/LabForm'

export const QUERY = gql`
  query EditLabById($id: Int!) {
    lab: lab(id: $id) {
      id
      name
      phone_no
      Address
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_LAB_MUTATION = gql`
  mutation UpdateLabMutation($id: Int!, $input: UpdateLabInput!) {
    updateLab(id: $id, input: $input) {
      id
      name
      phone_no
      Address
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ lab }) => {
  const [updateLab, { loading, error }] = useMutation(UPDATE_LAB_MUTATION, {
    onCompleted: () => {
      toast.success('Lab updated')
      navigate(routes.labs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateLab({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Lab {lab?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <LabForm lab={lab} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
