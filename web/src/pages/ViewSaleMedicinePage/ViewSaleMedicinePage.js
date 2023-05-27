import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadSaleMedicineCell from 'src/components/SaleMedicine/DownloadSaleMedicineCell'
const ViewSaleMedicinePage = ({ id }) => {
  return (
    <>
      <div className='bg-white'>
        <DownloadSaleMedicineCell id={id} download={false} />
      </div>
    </>
  )
}

export default ViewSaleMedicinePage
