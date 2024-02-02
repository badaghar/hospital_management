import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_IPD_INVESTIGATION_MUTATION = gql`
  mutation DeleteIpdInvestigationMutation($id: Int!) {
    deleteIpdInvestigation(id: $id) {
      id
    }
  }
`

const UPDATE_IPD_INVESTIGATION_MUTATION = gql`
  mutation UpdateIpdInvestigationMutation(
    $id: Int!
    $input: UpdateIpdInvestigationInput!
  ) {
    updateIpdInvestigation(id: $id, input: $input) {
      id
      lab_name
      isWaiting
      test_list
      url
      created_at
      updated_at
      extra
      ipdId
    }
  }
`

const IpdInvestigation = ({ ipdInvestigation }) => {
  const [deleteIpdInvestigation] = useMutation(
    DELETE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation deleted')
        navigate(routes.ipdInvestigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete ipdInvestigation ' + id + '?')
    ) {
      deleteIpdInvestigation({ variables: { id } })
    }
  }

  const [updateIpdInvestigation, { loading, error }] = useMutation(
    UPDATE_IPD_INVESTIGATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('IpdInvestigation updated')
        navigate(routes.ipdInvestigations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateIpdInvestigation({ variables: { id, input } })
  }


  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            IpdInvestigation {ipdInvestigation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ipdInvestigation.id}</td>
            </tr>
            <tr>
              <th>Lab name</th>
              <td>{ipdInvestigation.lab_name}</td>
            </tr>
            <tr>
              <th>Is waiting</th>
              <td>{checkboxInputTag(ipdInvestigation.isWaiting)}</td>
            </tr>
            <tr>
              <th>Test list</th>
              <td>{jsonDisplay(ipdInvestigation.test_list)}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{ipdInvestigation.url}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ipdInvestigation.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ipdInvestigation.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(ipdInvestigation.extra)}</td>
            </tr>
            <tr>
              <th>Ipd id</th>
              <td>{ipdInvestigation.ipdId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editIpdInvestigation({ id: ipdInvestigation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ipdInvestigation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default IpdInvestigation
