import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import NewSaleMedicine from 'src/components/SaleMedicine/NewSaleMedicine'
import NewsaleMedicineCell from 'src/components/SaleMedicine/NewsaleMedicineCell'

const QrcodePage = () => {
  return (
    <>
      <MetaTags title="Qrcode" description="Qrcode page" />
      <NewsaleMedicineCell qrcode={true} />
    </>
  )
}

export default QrcodePage
