export const schema = gql`
  type SaleMedicine {
    id: Int!
    billNo: String!
    date: DateTime!
    medicine: JSON!
    homo_medicine: JSON
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    patient: Patient!
    created_at: DateTime!
    updated_at: DateTime!
    patientId: Int!
    doctor_name: String!
  }

  type Query {
    saleMedicines: [SaleMedicine!]! @requireAuth
    saleMedicine(id: Int!): SaleMedicine  @skipAuth
  }

  input CreateSaleMedicineInput {
    # billNo: String!
    date: DateTime!
    medicine: JSON!
    total: Float!
    discount: Float!
    sgst: Float!
    cgst: Float!
    grand_total: Float!
    patientId: Int!
    permedicine: JSON!
    doctor_name: String!
    homo_medicine: JSON!
  }

  input UpdateSaleMedicineInput {
    billNo: String
    date: DateTime
    medicine: JSON
    total: Float
    discount: Float
    sgst: Float
    cgst: Float
    grand_total: Float
    patientId: Int
  }

  type Mutation {
    createSaleMedicine(input: CreateSaleMedicineInput!): SaleMedicine!
      @requireAuth
    updateSaleMedicine(
      id: Int!
      input: UpdateSaleMedicineInput!
    ): SaleMedicine! @requireAuth
    deleteSaleMedicine(id: Int!): SaleMedicine! @requireAuth
  }
`
