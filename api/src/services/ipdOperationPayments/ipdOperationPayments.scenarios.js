export const standard = defineScenario({
  ipdOperationPayment: {
    one: {
      data: {
        operation_name: 'String',
        date: '2023-06-27T02:34:32.285Z',
        operation_doctor: 'String',
        remark: 'String',
        result: 'String',
        amount: 1246569.3138174117,
        updated_at: '2023-06-27T02:34:32.285Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-27T02:34:32.285Z',
            updated_at: '2023-06-27T02:34:32.285Z',
            paid_amount: 2372032.36450485,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 2280234,
                updated_at: '2023-06-27T02:34:32.285Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        operation_name: 'String',
        date: '2023-06-27T02:34:32.285Z',
        operation_doctor: 'String',
        remark: 'String',
        result: 'String',
        amount: 8399078.100291222,
        updated_at: '2023-06-27T02:34:32.285Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-27T02:34:32.285Z',
            updated_at: '2023-06-27T02:34:32.285Z',
            paid_amount: 6682272.669906109,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 4562720,
                updated_at: '2023-06-27T02:34:32.285Z',
              },
            },
          },
        },
      },
    },
  },
})
