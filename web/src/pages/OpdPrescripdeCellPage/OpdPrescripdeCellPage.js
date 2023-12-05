import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import OpdPrescribedCell from 'src/components/OpdPrescribedCell'

const OpdPrescripdeCellPage = ({id}) => {
  return (
    <>
      <OpdPrescribedCell id={id} />
    </>
  )
}

export default OpdPrescripdeCellPage
