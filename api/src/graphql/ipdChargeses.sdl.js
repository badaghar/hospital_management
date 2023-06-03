export const schema = gql`
  type IpdCharges {
    id: Int!
    charge_type: String!
    charge: Float!
    quantity: Int!
    total: Float!
    created_at: DateTime!
    updated_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
  }

  type Query {
    ipdChargeses: [IpdCharges!]! @requireAuth
    ipdCharges(id: Int!): IpdCharges @requireAuth
  }

  input CreateIpdChargesInput {
    charge_type: String!
    charge: Float!
    quantity: Int!
    total: Float!
    ipdId: Int!
  }

  input UpdateIpdChargesInput {
    charge_type: String
    charge: Float
    quantity: Int
    total: Float
    ipdId: Int
  }

  type Mutation {
    createIpdCharges(input: CreateIpdChargesInput!): IpdCharges! @requireAuth
    updateIpdCharges(id: Int!, input: UpdateIpdChargesInput!): IpdCharges!
      @requireAuth
    deleteIpdCharges(id: Int!): IpdCharges! @requireAuth
  }
`
