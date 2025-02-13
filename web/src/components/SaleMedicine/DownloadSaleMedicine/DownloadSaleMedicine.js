import { useState } from 'react'

import humanize from 'humanize-string'
import BarLoader from 'react-spinners/BarLoader'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SaleMedicineSkeleton from '../SaleMedicineSkeleton/SaleMedicineSkeleton'

const axios = require('axios')

const DownloadSaleMedicine = ({ saleMedicine, download }) => {
  const [downloadstart, setDownloadstart] = useState(false)
  function getPDF() {
    return axios.get(
      `/.redwood/functions/downloadSaleMedicineBill?id=` + saleMedicine.id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = () => {
    const printContents = document.getElementById('printable').innerHTML
    const originalContents = document.body.innerHTML

    document.body.innerHTML = printContents
    window.print()
    // document.body.innerHTML = originalContents
    window.location.reload()

    // wwindo
    // setDownloadstart(true)
    // return getPDF() // API call
    //   .then((response) => {
    //     const blob = new Blob([response.data], { type: 'application/pdf' })
    //     // const link = document.createElement('a')
    //     // link.href = window.URL.createObjectURL(blob)
    //     // link.download =
    //     //   saleMedicine.patient.name + saleMedicine.id +
    //     //   '.pdf'
    //     // link.click()
    //     var blobURL = URL.createObjectURL(blob)
    //     var iframe =  document.createElement('iframe')
    //     document.body.appendChild(iframe)
    //     iframe.style.display = 'none'

    //     iframe.src = blobURL
    //  iframe.onload = function() {
    //   setTimeout(function() {
    //     iframe.focus()
    //     iframe.contentWindow.print()
    //   }, 1)
    // }
    //    setDownloadstart(false)
    //     toast.success('Download Complete')
    //   })
    //   .catch((err) => {
    //   setDownloadstart(false)
    //     toast.error('something wrong happened try again')
    //     console.log(err)
    //   })
  }
  return (
    <>
      {!download ? (
        <>
          <div className="m-2 grid w-full grid-cols-12 justify-center gap-y-4 p-2">
            <div className="col-span-3"></div>
            <div className="col-span-3 flex justify-start p-2">
              <Link
                to={routes.saleMedicines()}
                className="rounded-full bg-red-900 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Go Back
              </Link>
            </div>
            <div className="col-span-3 flex justify-end p-2">
              <button
                className="rounded-full bg-red-900 px-4 py-2 font-bold text-white hover:bg-red-700"
                id="print-button"
                onClick={printPDF}
                disabled={downloadstart}
              >
                {downloadstart ? (
                  <>
                    <BarLoader
                      color="white"
                      loading={downloadstart}
                      height={10}
                    />
                  </>
                ) : (
                  'Print PDF'
                )}
              </button>
            </div>

            <div className="col-span-12 flex justify-center">
              <div id="printable">
                {<SaleMedicineSkeleton saleMedicine={saleMedicine} />}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{<SaleMedicineSkeleton saleMedicine={saleMedicine} />}</>
      )}
    </>
  )
}

export default DownloadSaleMedicine
