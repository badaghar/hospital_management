import {
  complaintses,
  complaints,
  createComplaints,
  updateComplaints,
  deleteComplaints,
} from './complaintses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('complaintses', () => {
  scenario('returns all complaintses', async (scenario) => {
    const result = await complaintses()

    expect(result.length).toEqual(Object.keys(scenario.complaints).length)
  })

  scenario('returns a single complaints', async (scenario) => {
    const result = await complaints({ id: scenario.complaints.one.id })

    expect(result).toEqual(scenario.complaints.one)
  })

  scenario('creates a complaints', async (scenario) => {
    const result = await createComplaints({
      input: {
        note: 'String',
        updated_at: '2023-12-11T07:59:34.473Z',
        ipdId: scenario.complaints.two.ipdId,
      },
    })

    expect(result.note).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2023-12-11T07:59:34.473Z'))
    expect(result.ipdId).toEqual(scenario.complaints.two.ipdId)
  })

  scenario('updates a complaints', async (scenario) => {
    const original = await complaints({
      id: scenario.complaints.one.id,
    })
    const result = await updateComplaints({
      id: original.id,
      input: { note: 'String2' },
    })

    expect(result.note).toEqual('String2')
  })

  scenario('deletes a complaints', async (scenario) => {
    const original = await deleteComplaints({
      id: scenario.complaints.one.id,
    })
    const result = await complaints({ id: original.id })

    expect(result).toEqual(null)
  })
})
