export const standard = defineScenario({
  saleMedicine: {
    one: {
      data: {
        billNo: 'String',
        date: '2023-05-26T18:01:30.097Z',
        medicine: { foo: 'bar' },
        total: 8492530.973041428,
        discount: 3870924.084003824,
        sgst: 6507378.323126884,
        cgst: 3111774.66435429,
        grand_total: 8209406.582431638,
        updated_at: '2023-05-26T18:01:30.097Z',
        patient: {
          create: {
            name: 'String',
            age: 8648421,
            phone_no: 'String',
            gender: 'String',
            updated_at: '2023-05-26T18:01:30.097Z',
          },
        },
      },
    },
    two: {
      data: {
        billNo: 'String',
        date: '2023-05-26T18:01:30.097Z',
        medicine: { foo: 'bar' },
        total: 2379834.108659693,
        discount: 1395049.2104935085,
        sgst: 5660633.606211023,
        cgst: 4254838.0332171675,
        grand_total: 1610803.090314037,
        updated_at: '2023-05-26T18:01:30.097Z',
        patient: {
          create: {
            name: 'String',
            age: 3000955,
            phone_no: 'String',
            gender: 'String',
            updated_at: '2023-05-26T18:01:30.097Z',
          },
        },
      },
    },
  },
})
