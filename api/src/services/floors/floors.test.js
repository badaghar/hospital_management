import { floors, floor, createFloor, updateFloor, deleteFloor } from './floors'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('floors', () => {
  scenario('returns all floors', async (scenario) => {
    const result = await floors()

    expect(result.length).toEqual(Object.keys(scenario.floor).length)
  })

  scenario('returns a single floor', async (scenario) => {
    const result = await floor({ id: scenario.floor.one.id })

    expect(result).toEqual(scenario.floor.one)
  })

  scenario('creates a floor', async () => {
    const result = await createFloor({
      input: {
        floor_name: 'String8973565',
        updated_at: '2023-06-04T12:02:47.262Z',
      },
    })

    expect(result.floor_name).toEqual('String8973565')
    expect(result.updated_at).toEqual(new Date('2023-06-04T12:02:47.262Z'))
  })

  scenario('updates a floor', async (scenario) => {
    const original = await floor({ id: scenario.floor.one.id })
    const result = await updateFloor({
      id: original.id,
      input: { floor_name: 'String29488472' },
    })

    expect(result.floor_name).toEqual('String29488472')
  })

  scenario('deletes a floor', async (scenario) => {
    const original = await deleteFloor({ id: scenario.floor.one.id })
    const result = await floor({ id: original.id })

    expect(result).toEqual(null)
  })
})
