import { useState } from 'react'

import humanize from 'humanize-string'
import BarLoader from 'react-spinners/BarLoader'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import SaleMedicineSkeleton from '../SaleMedicineSkeleton/SaleMedicineSkeleton'

const axios = require('axios')


const DownloadSaleMedicine = ({ saleMedicine,download }) => {

  const [downloadstart, setDownloadstart] = useState(false)
  function getPDF() {
    return axios.get(
      `/.redwood/functions/downloadSaleMedicineBill?id=` +
      saleMedicine.id,
      {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      }
    )
  }
  const printPDF = () => {
    setDownloadstart(true)
    return getPDF() // API call
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        // const link = document.createElement('a')
        // link.href = window.URL.createObjectURL(blob)
        // link.download =
        //   saleMedicine.patient.name + saleMedicine.id +
        //   '.pdf'
        // link.click()
        var blobURL = URL.createObjectURL(blob)
        var iframe =  document.createElement('iframe')
        document.body.appendChild(iframe)
        iframe.style.display = 'none'

        iframe.src = blobURL
     iframe.onload = function() {
      setTimeout(function() {
        iframe.focus()
        iframe.contentWindow.print()
      }, 1)
    }
       setDownloadstart(false)
        toast.success('Download Complete')
      })
      .catch((err) => {
      setDownloadstart(false)
        toast.error('something wrong happened try again')
        console.log(err)
      })
  }
  return (
    <>
    {!download ? (
      <>
        <div className="grid grid-cols-12 gap-y-4 w-full justify-center m-2 p-2">
          <div className="col-span-3"></div>
          <div className="flex justify-start col-span-3 p-2">
            <Link
              to={routes.saleMedicines()}
              className="bg-red-900 text-white hover:bg-red-700 font-bold py-2 px-4 rounded-full"
            >
              Go Back
            </Link>
          </div>
          <div className="flex col-span-3 justify-end p-2">
            <button
              className="bg-red-900 text-white hover:bg-red-700 font-bold py-2 px-4 rounded-full"
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
                'Download PDF'
              )}
            </button>
          </div>

          <div className="col-span-12 flex justify-center">
            {<SaleMedicineSkeleton saleMedicine={saleMedicine}/>}
          </div>
        </div>
      </>
    ) : (
      <>{<SaleMedicineSkeleton saleMedicine={saleMedicine}/>}</>
    )}
  </>
)
}

export default DownloadSaleMedicine
