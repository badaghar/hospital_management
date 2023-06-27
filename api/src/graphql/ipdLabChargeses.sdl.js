export const schema = gql`
  type IpdLabCharges {
    id: Int!
    lab_name: String!
    ipd: Ipd!
    ipdId: Int!
    amount: Float!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    ipdLabChargeses: [IpdLabCharges!]! @requireAuth
    ipdLabCharges(id: Int!): IpdLabCharges @requireAuth
  }

  input CreateIpdLabChargesInput {
    lab_name: String!
    ipdId: Int!
    amount: Float!
  }

  input UpdateIpdLabChargesInput {
    lab_name: String
    ipdId: Int
    amount: Float
  }

  type Mutation {
    createIpdLabCharges(input: [CreateIpdLabChargesInput]!): IpdLabCharges
      @requireAuth
    updateIpdLabCharges(
      id: Int!
      input: UpdateIpdLabChargesInput!
    ): IpdLabCharges! @requireAuth
    deleteIpdLabCharges(id: Int!): IpdLabCharges! @requireAuth
  }
`
