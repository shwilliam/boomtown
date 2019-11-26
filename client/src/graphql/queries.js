import gql from 'graphql-tag'

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      id
      title
      created_at
      desc
      image_url
      tags {
        id
        title
      }
      owner {
        id
        fullname
      }
      borrower {
        id
      }
    }
  }
`

export const ALL_TAGS_QUERY = gql`
  query tags {
    tags {
      id
      title
    }
  }
`

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      id
    }
  }
`

export const VIEWER_QUERY = gql`
  query viewer {
    viewer {
      fullname
      email
    }
  }
`

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      fullname
      email
      items {
        id
        title
        created_at
        desc
        image_url
        tags {
          id
          title
        }
        borrower {
          id
        }
      }
      borrowed {
        id
        title
        created_at
        desc
        image_url
        tags {
          id
          title
        }
        owner {
          id
          fullname
        }
        borrower {
          id
        }
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signup($user: NewUserInput!) {
    signup(user: $user) {
      user {
        id
        fullname
        email
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
        fullname
        email
      }
      token
    }
  }
`

export const BORROW_ITEM_MUTATION = gql`
  mutation borrowItem($item: ID!) {
    borrowItem(item: $item)
  }
`
