import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { navigate, routes } from '@redwoodjs/router'
import { useEffect } from 'react'

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
    },
    ipds(type: "IPD"){
      id
      created_at
      date_of_admission
    }
    opds:ipds(type: "OPD"){
      id
      created_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>      <div className=''>

<FullCalendar
  height={'40rem'}
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"


/>
</div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ ipdOperationPayments,ipds,opds }) => {

  let totalTodayIpd,totalTodayOpd,totalMonthIpd,totalMonthOpd,totalTodayOperation,totalMonthOperation

  const today = new Date()
  const month = new Date()
  month.setDate(1)
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  const toIPD = ipds.filter((item) => {
    const newDate = new Date(item.date_of_admission)
    console.log(newDate,today)
    return newDate >= today
  })

  totalTodayIpd = toIPD.length
  console.log(toIPD)
  const toOPD = opds.filter((item) => {
    console.log(item)
    const newDate = new Date(item.created_at)
    console.log(newDate,today)
    return newDate >= today
  })
  totalTodayOpd = toOPD.length
  const monthIPD = ipds.filter((item) => {
    const newDate = new Date(item.date_of_admission)
    // console.log(newDate,today)
    return newDate >= month
  })
  totalMonthIpd = monthIPD.length
  const monthOPD = opds.filter((item) => {
    const newDate = new Date(item.created_at)
    // console.log(newDate,today)
    return newDate >= month
  })
  totalMonthOpd = monthOPD.length
  const todayOperation = ipdOperationPayments.filter((item) => {
    const newDate = new Date(item.extra.date)
    // console.log(newDate,today)
    return newDate >= today
  })
  totalTodayOperation = todayOperation.length
  const monthOperation = ipdOperationPayments.filter((item) => {
    const newDate = new Date(item.extra.date)
    // console.log(newDate,today)
    return newDate >= month
  })
  totalMonthOperation = monthOperation.length




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

<div className="flex m-4 flex-wrap relative text-white">

        {/* <div className="flex flex-col bg-purple-700 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Today Ipd Patients</h1>
          <p>  {totalTodayIpd} </p>

        </div> */}
        <div className="flex flex-col bg-gray-800  shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Today Opd Patient</h1>
          <p>  {totalTodayOpd} </p>

        </div>
        {/* <div className="flex flex-col bg-purple-950 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>This Month Ipd Patients</h1>
          <p>  {totalMonthIpd} </p>

        </div> */}
        <div className="flex flex-col bg-[#AED2FF] shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>This Month Opd Patient</h1>
          <p>  {totalMonthOpd} </p>

        </div>
        {/* <div className="flex flex-col bg-[#F6635C] shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Today Operation</h1>
          <p>  {totalTodayOperation} </p>

        </div>
        <div className="flex flex-col bg-[#79155B] shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>This Month Operation</h1>
          <p>  {totalMonthOperation} </p>

        </div> */}

      </div>
      {/* <div className=''>

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
      </div> */}

    </>
  )
}
