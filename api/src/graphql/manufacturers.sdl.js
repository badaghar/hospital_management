export const schema = gql`
  type Manufacturer {
    id: Int!
    name: String!
    Product: [Product]!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    manufacturers: [Manufacturer!]! @requireAuth
    manufacturer(id: Int!): Manufacturer @requireAuth
  }

  input CreateManufacturerInput {
    name: String!
  }

  input UpdateManufacturerInput {
    name: String
  }

  type Mutation {
    createManufacturer(input: CreateManufacturerInput!): Manufacturer!
      @requireAuth
    updateManufacturer(
      id: Int!
      input: UpdateManufacturerInput!
    ): Manufacturer! @requireAuth
    deleteManufacturer(id: Int!): Manufacturer! @requireAuth
  }
`
