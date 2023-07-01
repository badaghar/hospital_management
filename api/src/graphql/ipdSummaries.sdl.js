export const schema = gql`
  type IpdSummary {
    id: Int!
    ipd: Ipd!
    ipdId: Int!
    summary: JSON!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    ipdSummaries: [IpdSummary!]! @requireAuth
    ipdSummary(id: Int!): IpdSummary @requireAuth
  }

  input CreateIpdSummaryInput {
    ipdId: Int!
    summary: JSON!
  }

  input UpdateIpdSummaryInput {
    ipdId: Int
    summary: JSON
  }

  type Mutation {
    createIpdSummary(input: CreateIpdSummaryInput!): IpdSummary! @requireAuth
    updateIpdSummary(id: Int!, input: UpdateIpdSummaryInput!): IpdSummary!
      @requireAuth
    deleteIpdSummary(id: Int!): IpdSummary! @requireAuth
  }
`
