import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IpdForm from 'src/components/Ipd/IpdForm'

const CREATE_IPD_MUTATION = gql`
  mutation CreateIpdMutation($input: CreateIpdInput!) {
    createIpd(input: $input) {
      id
    }
  }
`

const NewIpd = ({type}) => {
  const [createIpd, { loading, error }] = useMutation(CREATE_IPD_MUTATION, {
    onCompleted: () => {
      toast.success('Ipd created')
      navigate(routes.ipds({type}))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createIpd({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Ipd</h2>
      </header>
      <div className="rw-segment-main">
        <IpdForm onSave={onSave} loading={loading} error={error} type={type} />
      </div>
    </div>
  )
}

export default NewIpd
