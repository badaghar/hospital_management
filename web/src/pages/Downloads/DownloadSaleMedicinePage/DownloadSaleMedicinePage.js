import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadSaleMedicineCell from 'src/components/SaleMedicine/DownloadSaleMedicineCell'

const DownloadSaleMedicinePage = ({id}) => {
  return (
    <>



      <DownloadSaleMedicineCell id={id} download={true} />

    </>
  )
}

export default DownloadSaleMedicinePage
