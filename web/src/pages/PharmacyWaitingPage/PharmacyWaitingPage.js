import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import PharmacyWaitingCell from 'src/components/PharmacyWaitingCell'

const PharmacyWaitingPage = () => {
  return (
    <>
      <MetaTags title="PharmacyWaiting" description="PharmacyWaiting page" />

      <PharmacyWaitingCell />
    </>
  )
}

export default PharmacyWaitingPage
