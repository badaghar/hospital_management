import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ViewBedsCell from 'src/components/Bed/ViewBedsCell'

const ViewBedPage = () => {
  return (
    <>
      <MetaTags title="ViewBed" description="ViewBed page" />

     <ViewBedsCell />
    </>
  )
}

export default ViewBedPage
