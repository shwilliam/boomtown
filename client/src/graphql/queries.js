import gql from 'graphql-tag'

export const ALL_ITEMS_QUERY = gql`
  query items {
    items {
      id
      title
      created_at
      desc
      tags {
        id
        title
      }
    }
  }
`

// export const ALL_USER_ITEMS_QUERY = gql``

// export const ALL_TAGS_QUERY = gql``

// export const ADD_ITEM_MUTATION = gql``

// export const VIEWER_QUERY = gql``

// export const LOGOUT_MUTATION = gql``

export const SIGNUP_MUTATION = gql`
  mutation signup($user: NewUserInput!) {
    signup(user: $user) {
      user {
        id
      }
      token
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginUserInput!) {
    login(user: $user) {
      user {
        id
      }
      token
    }
  }
`
