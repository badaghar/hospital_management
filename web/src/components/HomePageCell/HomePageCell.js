import { useEffect, useState } from "react"

export const QUERY = gql`
  query FindHomePageQuery {
    purchaseMedicines{
      id
      grand_total
      date
    },
    saleMedicines{
      id
      grand_total
      date

    },
    ipds(type: "IPD"){
      id
    }
    opds:ipds(type: "OPD"){
      id
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ purchaseMedicines, saleMedicines, ipds, opds }) => {
  const [totalPurchase, setTotalPurchase] = useState(0)
  const [totalSale, setTotalSale] = useState(0)
  const [totalTodayIpd, setTotalTodayIpd] = useState(0)
  const [totalTodayOpd, setTotalTodayOpd] = useState(0)
  const [totalMonthIpd, setTotalMonthIpd] = useState(0)
  const [totalMonthOpd, setTotalMonthOpd] = useState(0)
  const [todayPurchase, setTodayPurchase] = useState(0)
  const [todaySale, setTodaySale] = useState(0)
  const [monthSale, setMonthSale] = useState(0)
  const [monthPurchase, setMonthPurchase] = useState(0)
  const [profit, setProfit] = useState(0)

  // const [totalPurchase,setTotalPurchase] = useState(0)

  useEffect(() => {
    const tp = purchaseMedicines.reduce((prev, item) => prev + item.grand_total, 0)
    setTotalPurchase(tp)
    const ts = saleMedicines.reduce((prev, item) => prev + item.grand_total, 0)
    setTotalSale(ts)
    setProfit(ts - tp)
    const today = new Date()
    const month = new Date()
    month.setDate(1)
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    const tos = saleMedicines.filter((item) => {
      const newDate = new Date(item.date)
      // console.log(newDate,today)
      return newDate >= today
    })
    const top = purchaseMedicines.filter((item) => {
      const newDate = new Date(item.date)
      // console.log(newDate,today)
      return newDate >= today
    })

    const tSale = tos.reduce((prev, item) => prev + item.grand_total, 0)
    const tPurchase = top.reduce((prev, item) => prev + item.grand_total, 0)
    const monthtos = saleMedicines.filter((item) => {
      const newDate = new Date(item.date)
      // console.log(newDate,today)
      return newDate >= month
    })
    const monthtop = purchaseMedicines.filter((item) => {
      const newDate = new Date(item.date)
      // console.log(newDate,today)
      return newDate >= month
    })

    const msale = monthtos.reduce((prev, item) => prev + item.grand_total, 0)
    const mpurchase = monthtop.reduce((prev, item) => prev + item.grand_total, 0)

    setTodaySale(tSale)
    setTodayPurchase(tPurchase)
    setMonthPurchase(mpurchase)
    setMonthSale(msale)
    // console.log(tos)

  }, [])
  return (
    <>
      <div className="flex m-4 flex-wrap relative text-white">
        <div className="flex flex-col bg-orange-800 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Total Profit</h1>
          <p> ₹ {profit.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-green-800 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Total Purchase Medicine</h1>
          <p> ₹ {totalPurchase.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-red-500 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Total Sale Medicine</h1>
          <p> ₹ {totalSale.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-purple-700 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Today Purchase Medicine</h1>
          <p> ₹ {todayPurchase.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-gray-800  shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>Today Sale Medicine</h1>
          <p> ₹ {todaySale.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-purple-950 shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>This Month Purchase Medicine</h1>
          <p> ₹ {monthPurchase.toFixed(2)} </p>

        </div>
        <div className="flex flex-col bg-[#AED2FF] shadow-lg rounded-2xl p-6 items-center m-4">
          <h1>This Month Sale Medicine</h1>
          <p> ₹ {monthSale.toFixed(2)} </p>

        </div>

      </div>


    </>
  )
}
