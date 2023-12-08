import {
  ipdHomoPrescriptions,
  ipdHomoPrescription,
  createIpdHomoPrescription,
  updateIpdHomoPrescription,
  deleteIpdHomoPrescription,
} from './ipdHomoPrescriptions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('ipdHomoPrescriptions', () => {
  scenario('returns all ipdHomoPrescriptions', async (scenario) => {
    const result = await ipdHomoPrescriptions()

    expect(result.length).toEqual(
      Object.keys(scenario.ipdHomoPrescription).length
    )
  })

  scenario('returns a single ipdHomoPrescription', async (scenario) => {
    const result = await ipdHomoPrescription({
      id: scenario.ipdHomoPrescription.one.id,
    })

    expect(result).toEqual(scenario.ipdHomoPrescription.one)
  })

  scenario('creates a ipdHomoPrescription', async (scenario) => {
    const result = await createIpdHomoPrescription({
      input: {
        ipdId: scenario.ipdHomoPrescription.two.ipdId,
        medicine: 'String',
        dosage: 'String',
        timing: 'String',
        frequency: 'String',
        duration: 'String',
        rate: 3529506,
        updated_at: '2023-12-08T09:49:13.507Z',
      },
    })

    expect(result.ipdId).toEqual(scenario.ipdHomoPrescription.two.ipdId)
    expect(result.medicine).toEqual('String')
    expect(result.dosage).toEqual('String')
    expect(result.timing).toEqual('String')
    expect(result.frequency).toEqual('String')
    expect(result.duration).toEqual('String')
    expect(result.rate).toEqual(3529506)
    expect(result.updated_at).toEqual(new Date('2023-12-08T09:49:13.507Z'))
  })

  scenario('updates a ipdHomoPrescription', async (scenario) => {
    const original = await ipdHomoPrescription({
      id: scenario.ipdHomoPrescription.one.id,
    })
    const result = await updateIpdHomoPrescription({
      id: original.id,
      input: { medicine: 'String2' },
    })

    expect(result.medicine).toEqual('String2')
  })

  scenario('deletes a ipdHomoPrescription', async (scenario) => {
    const original = await deleteIpdHomoPrescription({
      id: scenario.ipdHomoPrescription.one.id,
    })
    const result = await ipdHomoPrescription({ id: original.id })

    expect(result).toEqual(null)
  })
})
