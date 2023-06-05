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
    <div className="text-3xl flex justify-center p-7  text-white">
      <h1 className=" bg-slate-800 p-3 rounded-3xl ">Hospital - Bed Map</h1>
    </div>

    <div>
      {
        floors.map((floor)=>{
          return(
            <>
              <div className='border border-white rounded-xl mx-11 my-3 p-4'>
                <div className='text-xl flex justify-center p-2'>
                  <h1 className='underline'>{floor.floor_name}</h1>
                </div>
                <div className='grid grid-cols-4 justify-items-center'>
                  {
                    beds.filter((bed)=>bed.floorId==floor.id).map((item)=>{
                      return(
                        <div className={`flex flex-col items-center  ${item.ipd?.patient.name ? 'text-red-700' : 'text-green-700'}`}>
                          <FaBed className={`text-[100px]`} />
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


   </>
  )
}
