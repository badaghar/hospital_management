import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LabForm from 'src/components/Lab/LabForm'

const CREATE_LAB_MUTATION = gql`
  mutation CreateLabMutation($input: CreateLabInput!) {
    createLab(input: $input) {
      id
    }
  }
`

const NewLab = () => {
  const [createLab, { loading, error }] = useMutation(CREATE_LAB_MUTATION, {
    onCompleted: () => {
      toast.success('Lab created')
      navigate(routes.labs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createLab({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Lab</h2>
      </header>
      <div className="rw-segment-main">
        <LabForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLab
