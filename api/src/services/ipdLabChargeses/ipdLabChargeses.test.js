import {
  ipdLabChargeses,
  ipdLabCharges,
  createIpdLabCharges,
  updateIpdLabCharges,
  deleteIpdLabCharges,
} from './ipdLabChargeses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdLabChargeses', () => {
  scenario('returns all ipdLabChargeses', async (scenario) => {
    const result = await ipdLabChargeses()

    expect(result.length).toEqual(Object.keys(scenario.ipdLabCharges).length)
  })

  scenario('returns a single ipdLabCharges', async (scenario) => {
    const result = await ipdLabCharges({ id: scenario.ipdLabCharges.one.id })

    expect(result).toEqual(scenario.ipdLabCharges.one)
  })

  scenario('creates a ipdLabCharges', async (scenario) => {
    const result = await createIpdLabCharges({
      input: {
        lab_name: 'String',
        ipdId: scenario.ipdLabCharges.two.ipdId,
        amount: 6854061.981007873,
        updated_at: '2023-06-27T03:27:41.027Z',
      },
    })

    expect(result.lab_name).toEqual('String')
    expect(result.ipdId).toEqual(scenario.ipdLabCharges.two.ipdId)
    expect(result.amount).toEqual(6854061.981007873)
    expect(result.updated_at).toEqual(new Date('2023-06-27T03:27:41.027Z'))
  })

  scenario('updates a ipdLabCharges', async (scenario) => {
    const original = await ipdLabCharges({
      id: scenario.ipdLabCharges.one.id,
    })
    const result = await updateIpdLabCharges({
      id: original.id,
      input: { lab_name: 'String2' },
    })

    expect(result.lab_name).toEqual('String2')
  })

  scenario('deletes a ipdLabCharges', async (scenario) => {
    const original = await deleteIpdLabCharges({
      id: scenario.ipdLabCharges.one.id,
    })
    const result = await ipdLabCharges({ id: original.id })

    expect(result).toEqual(null)
  })
})
