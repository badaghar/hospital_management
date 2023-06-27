export const schema = gql`
  type LabCharges {
    id: Int!
    name: String!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    labChargeses: [LabCharges!]! @requireAuth
    labCharges(id: Int!): LabCharges @requireAuth
  }

  input CreateLabChargesInput {
    name: String!
    amount: Float!
  }

  input UpdateLabChargesInput {
    name: String
    amount: Float
  }

  type Mutation {
    createLabCharges(input: CreateLabChargesInput!): LabCharges! @requireAuth
    updateLabCharges(id: Int!, input: UpdateLabChargesInput!): LabCharges!
      @requireAuth
    deleteLabCharges(id: Int!): LabCharges! @requireAuth
  }
`
