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
  const type = birthCertificate.type == 1 ? 'Birth' : 'Dead'
  const day = new Date((birthCertificate.birth_date))
  const date = day.toDateString()
  const time = day.toLocaleTimeString()

  const [deleteBirthCertificate] = useMutation(
    DELETE_BIRTH_CERTIFICATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BirthCertificate deleted')
        navigate(routes.birthCertificates({ type }))
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
      <section
        className="border-black border text-black text-xl"
        style={{ width: '21cm', height: '29.7cm', padding: '0.7cm 0.7cm' }}
      >
        <section
          className="border-black border"
          style={{ width: '19.6cm', height: '13.45cm' }}
        >
          <section
            id="firstLayer"
            className="border-b border-black"
            style={{ width: '19.6cm', height: '2.8cm' }}
          >
            <div style={{ padding: '0cm 0.1cm' }}>
              <img src="/srihos.jpg" alt="" srcset="" />
            </div>

          </section>
          <section
            id="secondLayer"
            className="border-b border-black"
            style={{ width: '19.6cm', height: '7cm', padding: '0cm 0cm' }}


          >

            <div className='space-y-4'>
              <div className='flex justify-center italic text-2xl   underline'>
                <span>{type} Information Certificate</span>
              </div>
              <div className='flex justify-between px-5 '>
                <span>
                  No . {birthCertificate.id}
                </span>
                <span className=''>
                  Date .......................................
                </span>
              </div>

              <div className='flex space-x-3 px-5 '>
                <span>
                  This is to certify that Mrs./Ms
                </span>
                <span className='flex-1 border-b-2 border-black '>
                  {birthCertificate.name}
                  {/* <hr className='font-bold' /> */}

                </span>
              </div>
              <div className='flex space-x-3 px-5 '>
                <span>
                  {birthCertificate.type == 1 ? 'has delivered at this Hospital on' : 'has died at this Hospital on'}
                </span>
                <span className=' border-b-2 border-black flex-1 '>
                  {date}
                  {/* <hr className='font-bold' /> */}

                </span>
                <span className='  '>
                  at
                  {/* <hr className='font-bold' /> */}

                </span>
                <span className=' border-b-2 border-black  flex-1'>
                  {time}
                  {/* <hr className='font-bold' /> */}

                </span>
                {
                  birthCertificate.type == 1 &&
                  <span>
                    &
                  </span>
                }
              </div>
{birthCertificate.type == 1 &&
              <div className='flex space-x-3 px-5 '>
                <span>
                  has given birth to a baby boy / girl weighing
                </span>
                <span className='border-b-2 border-black'>
                  {birthCertificate.weight}
                </span>
                <span>
                  grams
                </span>
              </div>}

            </div>


          </section>
          <div className='grid col-span-3 grid-cols-3 px-5'>
            <div className="border-r border-black">
              <div>
                Note :
              </div>
              <span className='text-base'>
                The Authorised {type} certificate should be collected from the local authorities within one month
              </span>

            </div>
            <div className="border-r border-black text-center">
              Doctor's Signatures
            </div>
            <div className="text-center">
        { birthCertificate.type == 1 ? 'Patient Signature' : 'Attendar Signature'}
            </div>
          </div>
        </section>
      </section>
      {/* <div className="rw-segment">
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
      </nav> */}
    </>
  )
}

export default BirthCertificate
