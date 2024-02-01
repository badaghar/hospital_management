export const schema = gql`
  type LabPriceList {
    id: Int!
    lab: Lab!
    test_list: JSON!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    labId: Int!
  }

  type Query {
    labPriceLists: [LabPriceList!]! @requireAuth
    labPriceList(id: Int!): LabPriceList @requireAuth
  }

  input CreateLabPriceListInput {
    test_list: JSON!
    extra: JSON
    labId: Int!
  }

  input UpdateLabPriceListInput {
    test_list: JSON
    extra: JSON
    labId: Int
  }

  type Mutation {
    createLabPriceList(input: CreateLabPriceListInput!): LabPriceList!
      @requireAuth
    updateLabPriceList(
      id: Int!
      input: UpdateLabPriceListInput!
    ): LabPriceList! @requireAuth
    deleteLabPriceList(id: Int!): LabPriceList! @requireAuth
  }
`
