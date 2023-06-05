import { beds, bed, createBed, updateBed, deleteBed } from './beds'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('beds', () => {
  scenario('returns all beds', async (scenario) => {
    const result = await beds()

    expect(result.length).toEqual(Object.keys(scenario.bed).length)
  })

  scenario('returns a single bed', async (scenario) => {
    const result = await bed({ id: scenario.bed.one.id })

    expect(result).toEqual(scenario.bed.one)
  })

  scenario('creates a bed', async (scenario) => {
    const result = await createBed({
      input: {
        bed_name: 'String',
        occupied: true,
        updated_at: '2023-06-04T12:03:21.541Z',
        floorId: scenario.bed.two.floorId,
      },
    })

    expect(result.bed_name).toEqual('String')
    expect(result.occupied).toEqual(true)
    expect(result.updated_at).toEqual(new Date('2023-06-04T12:03:21.541Z'))
    expect(result.floorId).toEqual(scenario.bed.two.floorId)
  })

  scenario('updates a bed', async (scenario) => {
    const original = await bed({ id: scenario.bed.one.id })
    const result = await updateBed({
      id: original.id,
      input: { bed_name: 'String2' },
    })

    expect(result.bed_name).toEqual('String2')
  })

  scenario('deletes a bed', async (scenario) => {
    const original = await deleteBed({ id: scenario.bed.one.id })
    const result = await bed({ id: original.id })

    expect(result).toEqual(null)
  })
})
