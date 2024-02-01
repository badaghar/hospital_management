import { labs, lab, createLab, updateLab, deleteLab } from './labs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('labs', () => {
  scenario('returns all labs', async (scenario) => {
    const result = await labs()

    expect(result.length).toEqual(Object.keys(scenario.lab).length)
  })

  scenario('returns a single lab', async (scenario) => {
    const result = await lab({ id: scenario.lab.one.id })

    expect(result).toEqual(scenario.lab.one)
  })

  scenario('creates a lab', async () => {
    const result = await createLab({
      input: {
        name: 'String',
        phone_no: 'String',
        Address: 'String',
        updated_at: '2024-02-01T16:36:54.324Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.phone_no).toEqual('String')
    expect(result.Address).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-02-01T16:36:54.324Z'))
  })

  scenario('updates a lab', async (scenario) => {
    const original = await lab({ id: scenario.lab.one.id })
    const result = await updateLab({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a lab', async (scenario) => {
    const original = await deleteLab({ id: scenario.lab.one.id })
    const result = await lab({ id: original.id })

    expect(result).toEqual(null)
  })
})
