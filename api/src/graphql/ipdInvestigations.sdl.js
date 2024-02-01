export const schema = gql`
  type IpdInvestigation {
    id: Int!
    ipd: Ipd!
    lab_name: String!
    isWaiting: Boolean!
    test_list: JSON!
    url: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    ipdId: Int!
  }

  type Query {
    ipdInvestigations: [IpdInvestigation!]! @requireAuth
    ipdInvestigation(id: Int!): IpdInvestigation @requireAuth
  }

  input CreateIpdInvestigationInput {
    lab_name: String!
    isWaiting: Boolean!
    test_list: JSON!
    url: String!
    extra: JSON
    ipdId: Int!
  }

  input UpdateIpdInvestigationInput {
    lab_name: String
    isWaiting: Boolean
    test_list: JSON
    url: String
    extra: JSON
    ipdId: Int
  }

  type Mutation {
    createIpdInvestigation(
      input: CreateIpdInvestigationInput!
    ): IpdInvestigation! @requireAuth
    updateIpdInvestigation(
      id: Int!
      input: UpdateIpdInvestigationInput!
    ): IpdInvestigation! @requireAuth
    deleteIpdInvestigation(id: Int!): IpdInvestigation! @requireAuth
  }
`
