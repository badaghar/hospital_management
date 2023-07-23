import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadLabChargeCell from 'src/components/Ipd/DownloadLabChargeCell'

const DownloadLabChargesPage = ({id}) => {
  return (
    <>
      <MetaTags
        title="DownloadLabCharges"
        description="DownloadLabCharges page"
      />

      <DownloadLabChargeCell id={id} />
    </>
  )
}

export default DownloadLabChargesPage
