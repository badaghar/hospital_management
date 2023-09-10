import {FaBed} from 'react-icons/fa'

export const QUERY = gql`
  query ViewBedsQuery {
    floors{
      id
      floor_name
    }
    beds {
      id
      bed_name
      floor{
        id
        floor_name
      }
      floorId
      ipd{
        patient{
          name
        }
      }

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ floors,beds }) => {
  return (
   <>

<div className='bg-white pb-9'>


    <div className="text-3xl flex justify-center p-7  text-white">
      <h1 className=" bg-slate-800 p-3 rounded-3xl ">Hospital - Bed Map</h1>
    </div>

    <div className='text-black'>
      {
        floors.map((floor)=>{
          return(
            <>
              <div className='border border-black rounded-xl mx-11 my-3 p-4'>
                <div className=' flex justify-center p-2'>
                  <h1 className='underline'>{floor.floor_name}</h1>
                </div>
                <div className='grid grid-cols-4 justify-items-center'>
                  {
                    beds.filter((bed)=>bed.floorId==floor.id).map((item)=>{
                      return(
                        <div className={`flex flex-col items-center  ${item.ipd?.patient.name ? 'text-red-700' : 'text-green-700'}`}>
                          <span>{item.bed_name}</span>
                          <FaBed className={`text-xl`} />
                          <span className=''>{item.ipd?.patient.name || 'Empty'}</span>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </>

          )
        })
      }
    </div>

    </div>


   </>
  )
}
