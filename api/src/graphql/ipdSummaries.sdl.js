export const schema = gql`
  type IpdSummary {
    id: Int!
    created_at: DateTime!
    ipd: Ipd!
    ipdId: Int!
    updated_at: DateTime!
  }

  type Query {
    ipdSummaries: [IpdSummary!]! @requireAuth
    ipdSummary(id: Int!): IpdSummary @requireAuth
  }

  input CreateIpdSummaryInput {
    created_at: DateTime!
    ipdId: Int!
    updated_at: DateTime!
  }

  input UpdateIpdSummaryInput {
    created_at: DateTime
    ipdId: Int
    updated_at: DateTime
  }

  type Mutation {
    createIpdSummary(input: CreateIpdSummaryInput!): IpdSummary! @requireAuth
    updateIpdSummary(id: Int!, input: UpdateIpdSummaryInput!): IpdSummary!
      @requireAuth
    deleteIpdSummary(id: Int!): IpdSummary! @requireAuth
  }
`
