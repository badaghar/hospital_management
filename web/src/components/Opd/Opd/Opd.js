import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_OPD_MUTATION = gql`
  mutation DeleteOpdMutation($id: Int!) {
    deleteOpd(id: $id) {
      id
    }
  }
`

const Opd = ({ opd }) => {
  const [deleteOpd] = useMutation(DELETE_OPD_MUTATION, {
    onCompleted: () => {
      toast.success('Opd deleted')
      navigate(routes.opds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete opd ' + id + '?')) {
      deleteOpd({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Opd {opd.id} Detail
          </h2>
        </header>

        <div>
          <div className='flex items-center mt-3  gap-x-4 justify-evenly p-3'>
            <span>
              Patient Name :-
            </span>
            <span>
              {opd.patient.name}
            </span>
            <span>
              Patient Age :-
            </span>
            <span>
              {opd.patient.age}
            </span>
          </div>

          <div className='flex items-center mt-3  gap-x-4'>
            <span>
              Consultant Doctor Name :-
            </span>
            <span>
              {
                opd.consultant_doctor
              }
            </span>

          </div>

          <div className="p-2 w-full shadow-sm bg-white ">
            <div className=" grid grid-cols-3 grid-flow-row gap-x-2 gap-y-2">
              <div className="flex col-span-1 justify-center">Doctor Name</div>
              <div className="flex col-span-1 justify-center">Charges Type</div>
              <div className="flex col-span-1 justify-center">Amount</div>
              {
                opd.charges.DoctorCharges?.map((item) => {
                  return (
                    <>
                      <div className="flex col-span-1 justify-center">{item.name}</div>
                      <div className="flex col-span-1 justify-center">{item.type}</div>
                      <div className="flex col-span-1 justify-center">{item.amount}</div>
                    </>

                  )
                })
              }


            </div>
          </div>

          <div className="p-2 w-full shadow-sm bg-white ">
            <div className=" grid grid-cols-4 grid-flow-row gap-x-2 gap-y-2">
              <div className="flex col-span-1 justify-center">Charges Type</div>
              <div className="flex col-span-1 justify-center">Amount</div>
              <div className="flex col-span-1 justify-center">Quantity</div>
              <div className="flex col-span-1 justify-center">Net Amount</div>
              {
                opd.charges.OtherCharges?.map((item) => {
                  return (
                    <>
                      <div className="flex col-span-1 justify-center">{item.type}</div>
                      <div className="flex col-span-1 justify-center">{item.amount}</div>
                      <div className="flex col-span-1 justify-center">{item.qunatity}</div>
                      <div className="flex col-span-1 justify-center">{item.net_amount}</div>
                    </>

                  )
                })
              }
            </div>
          </div>


          <div className='mr-4'>



            <div className='flex items-center mt-3 justify-end gap-x-4'>
              <span

                className="rw-label mt-0"

              >
                Payment mode
              </span>
              <div className="flex">

                <span>
                  {opd.paymentMode}
                </span>
              </div>
            </div>


            <div className='flex items-center mt-3 justify-end gap-x-4'>

              <span
                className="rw-label mt-0"
              >
                Amount
              </span>
              <div className="flex">
                <span>
                  {opd.amount}
                </span>
              </div>
            </div>
          </div>




        </div>

      </div>
      <nav className="rw-button-group">
        {/* <Link
          to={routes.editOpd({ id: opd.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link> */}
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(opd.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Opd
