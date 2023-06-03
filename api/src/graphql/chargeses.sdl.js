export const schema = gql`
  type Charges {
    id: Int!
    name: String!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    chargeses: [Charges!]! @requireAuth
    charges(id: Int!): Charges @requireAuth
  }

  input CreateChargesInput {
    name: String!
    amount: Float!
  }

  input UpdateChargesInput {
    name: String
    amount: Float
  }

  type Mutation {
    createCharges(input: CreateChargesInput!): Charges! @requireAuth
    updateCharges(id: Int!, input: UpdateChargesInput!): Charges! @requireAuth
    deleteCharges(id: Int!): Charges! @requireAuth
  }
`
