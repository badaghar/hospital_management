import { DateField, FieldError, Form, Label, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/dist/toast'
import { toast } from '@redwoodjs/web/toast'

import { useEffect, useLayoutEffect, useState } from 'react'
import OpdReportCell from 'src/components/PharmacyReport/OpdReportCell'
import IpdReportCell from 'src/components/PharmacyReport/IpdReportCell'
import PharmacyPaymentCell from 'src/components/PharmacyReport/PharmacyPaymentCell/PharmacyPaymentCell'
import PharmacyReportDistributerCell from 'src/components/PharmacyReport/PharmacyReportDistributerCell'
import PharmacyReportHeaderCell from 'src/components/PharmacyReport/PharmacyReportHeaderCell'
import PharmacyReportPurchaseCell from 'src/components/PharmacyReport/PharmacyReportPurchaseCell'
import PharmacyReportSaleCell from 'src/components/PharmacyReport/PharmacyReportSaleCell'


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}



const PharmacyReportPage = ({id}) => {
  const [defaultstartDate, setdefaultStartDate] = useState(new Date(2022, 1).toISOString().split('T')[0])
  const [today, setToday] = useState(new Date())
  const [defaultendDate, setdefaultEndDate] = useState(new Date(today.getFullYear() + 1, 1).toISOString().split('T')[0])
  const [startDate,setStartDate] = useState()
  const [endDate,setEndDate] = useState()
  // console.log(text)
  const [remove,setRemove] = useState(false)
  const [text,setText] = useState('')
  const [ComponentRender,SetComponentRender] = useState()


  const [searchId,setSearchId] = useState(0)
  useEffect(()=>{
    SetComponentRender(0)
    setdefaultStartDate(new Date(2022, 1).toISOString().split('T')[0])
    setdefaultEndDate(new Date(today.getFullYear() + 1, 1).toISOString().split('T')[0])
    setSearchId(0)

    if(id===1)
    {
      setText("Select Distributer Name")
    }else if(id==2)
    {
      setText("Purchase Bill Report")
    }
    else if(id==3)
    {
      setText("Sale Bill Report")

    }
    else if(id==4)
    {
      setText("Select Payment Type")

    }
    else if(id==5)
    {
      setText('IPD Patient Report')
    }
    else if(id==6)
    {
      setText('OPD Patient Report')
    }
  },[id])
  useLayoutEffect(()=>{
    setRemove(false)
    const timeoutId = setTimeout(() => {
      setRemove(true)
    }, 10);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);

  },[id])

  const changeId = (value)=>{
    setSearchId(value)
  }

  // useEffect(()=>{
  //   // SetComponentRender(1)
  //       if(id==1)
  //   {
  //     SetComponentRender(1)
  //   }

  // },[searchId,startDate,endDate])


  const getReport = (data) =>{
    if(searchId==0 && id==1)
    {
      toast.error("Select Distributer To get The Report")
      console.log("here")
      return
    }
    if(searchId==0 && id==4)
    {
      toast.error("Select Payment Type To get The Report")
      return
    }

    setStartDate(data['date'])
    setEndDate(data['date2'])

    SetComponentRender(id)

  }

  return (
    <>
      <div>
        <div className='p-10 text-white'>
          <div >
            { (id==1 || id==4) ? remove && <PharmacyReportHeaderCell changeId={changeId} text={text} id={id} SetComponentRender={SetComponentRender} /> : <div className='flex justify-center text-xl border-white border rounded-3xl p-3'>
                {text}
              </div>}
          </div>
          <div>
            <Form onSubmit={getReport}>
              <div className="flex items-center justify-evenly mt-3  gap-x-4">
                <Label
                  name="date"
                  className="rw-label mt-0 text-white"
                  errorClassName="rw-label mt-0 rw-label-error"
                >
                  From Date
                </Label>
                <div className="flex">
                  <DateField
                    name="date"
                    defaultValue={formatDatetime(defaultstartDate)}
                    className="rw-input mt-0"
                    errorClassName="rw-input mt-0 rw-input-error"
                    validation={{ required: true }}
                    // onChange={(val)=>setStartDate(val)}
                  />
                </div>
                <FieldError name="date" className="rw-field-error" />

                <Label
                  name="date2"
                  className="rw-label mt-0 text-white"
                  errorClassName="rw-label mt-0 rw-label-error"
                >
                  To Date
                </Label>
                <div className="flex">
                  <DateField
                    name="date2"
                    defaultValue={formatDatetime(defaultendDate)}
                    className="rw-input mt-0"
                    errorClassName="rw-input mt-0 rw-input-error"
                    validation={{ required: true }}
                    // onChange={(val)=>setEndDate(val)}

                  />
                </div>
                <FieldError name="date2" className="rw-field-error" />
                <div>
                  <Submit  className="rw-button rw-button-green">
                    Get Report
                  </Submit>
                </div>
              </div>


            </Form>
          </div>
        </div>

        <div>
          {/* <ComponentRender /> */}
          {
            ComponentRender==1 ? <PharmacyReportDistributerCell id={searchId} startDate={startDate} endDate={endDate} /> : ComponentRender==2 ? <PharmacyReportPurchaseCell startDate={startDate} endDate={endDate}  /> : ComponentRender==3 ?  <PharmacyReportSaleCell startDate={startDate} endDate={endDate}  /> : ComponentRender==4 ? <PharmacyPaymentCell id={searchId} startDate={startDate} endDate={endDate} /> : ComponentRender==5 ? <IpdReportCell  startDate={startDate} endDate={endDate} />  :  ComponentRender==6 ? <OpdReportCell  startDate={startDate} endDate={endDate} /> : <></>
          }

        </div>


      </div>
    </>
  )
}

export default PharmacyReportPage
