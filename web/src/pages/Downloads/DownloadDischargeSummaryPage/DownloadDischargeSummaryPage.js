import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadDischargeSummaryCell from 'src/components/Ipd/DownloadDischargeSummaryCell'

const DownloadDischargeSummaryPage = ({id}) => {
  return (
    <>
     <DownloadDischargeSummaryCell id={id}/>
    </>
  )
}

export default DownloadDischargeSummaryPage
