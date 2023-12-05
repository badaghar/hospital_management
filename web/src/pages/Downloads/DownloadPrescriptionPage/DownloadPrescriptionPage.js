import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadPrescriptionCell from 'src/components/Ipd/DownloadPrescriptionCell'
const DownloadPrescriptionPage = ({id}) => {
  return (
    <>
      <MetaTags
        title="DownloadPrescription"
        description="DownloadPrescription page"
      />
      <DownloadPrescriptionCell id={id} />



    </>
  )
}

export default DownloadPrescriptionPage
