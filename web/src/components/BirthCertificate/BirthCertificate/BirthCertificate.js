import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_BIRTH_CERTIFICATE_MUTATION = gql`
  mutation DeleteBirthCertificateMutation($id: Int!) {
    deleteBirthCertificate(id: $id) {
      id
    }
  }
`

const BirthCertificate = ({ birthCertificate }) => {
  const [deleteBirthCertificate] = useMutation(
    DELETE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BirthCertificate deleted')
        navigate(routes.birthCertificates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete birthCertificate ' + id + '?')
    ) {
      deleteBirthCertificate({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            BirthCertificate {birthCertificate.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{birthCertificate.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{birthCertificate.name}</td>
            </tr>
            <tr>
              <th>Birth date</th>
              <td>{timeTag(birthCertificate.birth_date)}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{birthCertificate.weight}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{birthCertificate.type}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(birthCertificate.extra)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(birthCertificate.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(birthCertificate.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBirthCertificate({ id: birthCertificate.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(birthCertificate.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default BirthCertificate
