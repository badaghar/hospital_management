import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindHomePage2Query {
    ipdOperationPayments {
      id
      operation_name
      amount
      created_at
      updated_at
      ipdId
      extra

      ipd{
        id
        patient{
          name,
          phone_no
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ ipdOperationPayments }) => {



  const events = []
  for(let i=0;i<ipdOperationPayments.length;i++) {

    let date;
    if(ipdOperationPayments[i]?.extra?.date)
    {
       date = new Date(ipdOperationPayments[i].extra['date'])

       let month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
       let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

       date = `${date.getFullYear()}-${month}-${day}`
      //  console.log(date)

    }
    events.push({
      title:`${ipdOperationPayments[i].operation_name} - ${ipdOperationPayments[i].ipd.id} `,date
    })
  }

  const handleEventClick = (e) => {
    let data = e.el.innerText.split(' - ')[1]
    navigate(routes.ipd({id:data}))
    // console.log(data)
  }





  return (
    <>
      <div className=''>

        <FullCalendar
          height={'40rem'}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          // events={[
          //   { title: 'event 1', date: '2023-09-26' },
          //   { title: 'event 2', date: '2023-09-26' }
          // ]}
          events={events}
        eventClick={handleEventClick}
        />
      </div>

    </>
  )
}
