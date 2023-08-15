export const schema = gql`
  type ReturnExpiryMedicine {
    id: Int!
    distributerId: Int!
    medicine: JSON!
    return_med: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type xyz{
    data:ReturnExpiryMedicine,
    data2: Distributer
  }

  type Query {
    returnExpiryMedicines: [ReturnExpiryMedicine!]! @requireAuth
    returnExpiryMedicine(id: Int!): xyz @requireAuth
  }

  input CreateReturnExpiryMedicineInput {
    distributerId: Int!
    medicine: JSON!
    return_med: Boolean!

  }

  input UpdateReturnExpiryMedicineInput {
    distributerId: Int
    medicine: JSON
    return_med: Boolean

  }

  type Mutation {
    createReturnExpiryMedicine(
      input: CreateReturnExpiryMedicineInput!
    ): ReturnExpiryMedicine! @requireAuth
    updateReturnExpiryMedicine(
      id: Int!
      input: UpdateReturnExpiryMedicineInput!
    ): ReturnExpiryMedicine! @requireAuth
    deleteReturnExpiryMedicine(id: Int!): ReturnExpiryMedicine! @requireAuth
  }
`
