import { useState } from "react"
import IpdHistoryComplaintCell from "../IpdHistoryFolder/IpdHistoryComplaintCell"
import IpdHistoryChargeCell from "../IpdHistoryFolder/IpdHistoryChargeCell"
import IpdHistoryPrescriptionCell from "../IpdHistoryFolder/IpdHistoryPrescriptionCell"
import IpdHistoryDocumentCell from "../IpdHistoryFolder/IpdHistoryDocumentCell"

const IpdHistory = ({ipd}) => {

  const [dropDownOpen,setDropDownOpen] = useState('complaints')
  const [totalAmount,setTotalAmount] = useState(0)
  const toggleDropDown = (text) => {
    setDropDownOpen(text)
  }
  return (
    <>
      <div className="mt-4">
        <div className='flex bg-gray-800 text-white  space-x-5 rounded-3xl justify-around flex-wrap'>
          <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this, 'complaints')}>
            Complaints
          </div>
          <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this, 'charges')}>
            Charges
          </div>
          <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this, 'prescription')}>
            Prescriptions
          </div>
          <div className='hover:bg-gray-950 hover:text-gray-500 rounded-3xl cursor-pointer p-2' onClick={toggleDropDown.bind(this, 'documents')}>
            Documents
          </div>
        </div>

        {
            dropDownOpen=='complaints' && <IpdHistoryComplaintCell ipd={ipd} id={ipd.patient.id}/>
          }
        {
            dropDownOpen=='charges' && <IpdHistoryChargeCell ipd={ipd} id={ipd.patient.id}/>
          }
        {
            dropDownOpen=='prescription' && <IpdHistoryPrescriptionCell ipd={ipd} id={ipd.patient.id}/>
          }
        {
            dropDownOpen=='documents' && <IpdHistoryDocumentCell ipd={ipd} id={ipd.patient.id}/>
          }
      </div>
    </>
  )
}

export default IpdHistory
