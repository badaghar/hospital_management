import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadOtherChargeCell from 'src/components/Ipd/DownloadOtherChargeCell'

const DownloadOtherChargesPage = ({id}) => {
  return (
    <>
      <MetaTags
        title="DownloadOtherCharges"
        description="DownloadOtherCharges page"
      />

     <DownloadOtherChargeCell id={id} />
    </>
  )
}

export default DownloadOtherChargesPage
