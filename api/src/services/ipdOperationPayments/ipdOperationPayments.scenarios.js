export const standard = defineScenario({
  ipdOperationPayment: {
    one: {
      data: {
        operation_name: 'String',
        amount: 1642993.264972963,
        updated_at: '2023-06-27T09:41:53.557Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-27T09:41:53.557Z',
            updated_at: '2023-06-27T09:41:53.557Z',
            paid_amount: 7799335.624402033,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 9335953,
                updated_at: '2023-06-27T09:41:53.557Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        operation_name: 'String',
        amount: 7627159.252332096,
        updated_at: '2023-06-27T09:41:53.557Z',
        ipd: {
          create: {
            consultant_doctor: 'String',
            date_of_admission: '2023-06-27T09:41:53.557Z',
            updated_at: '2023-06-27T09:41:53.557Z',
            paid_amount: 7073297.843647073,
            patientType: 'String',
            patient: {
              create: {
                name: 'String',
                age: 7124629,
                updated_at: '2023-06-27T09:41:53.557Z',
              },
            },
          },
        },
      },
    },
  },
})
