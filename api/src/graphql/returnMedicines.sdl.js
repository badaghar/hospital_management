export const schema = gql`
  type ReturnMedicine {
    id: Int!
    date: DateTime!
    medicine: JSON!
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    patient: Patient!
    created_at: DateTime!
    updated_at: DateTime!
    patientId: Int!
  }

  type Query {
    returnMedicines: [ReturnMedicine!]! @requireAuth
    returnMedicine(id: Int!): ReturnMedicine @requireAuth
  }

  input CreateReturnMedicineInput {
    date: DateTime!
    medicine: JSON!
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    patientId: Int!
    permedicine: JSON!
  }

  input UpdateReturnMedicineInput {
    date: DateTime
    medicine: JSON
    total: Float
    discount: Float
    sgst: Float
    cgst: Float
    grand_total: Float
    created_at: DateTime
    updated_at: DateTime
    patientId: Int
  }

  type Mutation {
    createReturnMedicine(input: CreateReturnMedicineInput!): ReturnMedicine!
      @requireAuth
    updateReturnMedicine(
      id: Int!
      input: UpdateReturnMedicineInput!
    ): ReturnMedicine! @requireAuth
    deleteReturnMedicine(id: Int!): ReturnMedicine! @requireAuth
  }
`
