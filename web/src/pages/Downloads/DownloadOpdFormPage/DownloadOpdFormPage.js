import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import DownloadOpdFormCell from 'src/components/Ipd/DownloadOpdFormCell'

const DownloadOpdFormPage = ({id}) => {
  return (
    <>
      <MetaTags title="DownloadOpdForm" description="DownloadOpdForm page" />

      <DownloadOpdFormCell id={id}/>
    </>
  )
}

export default DownloadOpdFormPage
