export const schema = gql`
  type Bed {
    id: Int!
    bed_name: String!
    floor: Floor!
    occupied: Boolean!
    ipd: Ipd
    created_at: DateTime!
    updated_at: DateTime!
    floorId: Int!
    ipdId: Int
  }

  type Query {
    beds: [Bed!]! @requireAuth
    bed(id: Int!): Bed @requireAuth
  }

  input CreateBedInput {
    bed_name: String!
    occupied: Boolean!
    floorId: Int!
    ipdId: Int
  }

  input UpdateBedInput {
    bed_name: String
    occupied: Boolean
    floorId: Int
    ipdId: Int
  }

  type Mutation {
    createBed(input: CreateBedInput!): Bed! @requireAuth
    updateBed(id: Int!, input: UpdateBedInput!): Bed! @requireAuth
    deleteBed(id: Int!): Bed! @requireAuth
  }
`
