import {useContext} from 'react'
import {useQuery} from 'react-apollo'
import {AuthContext} from '../context'
import {USER_QUERY} from '../graphql'

const useUserData = id => {
  const {activeUser} = useContext(AuthContext)

  const {data, loading, error} = useQuery(USER_QUERY, {
    variables: {id: id || activeUser.user.id},
  })

  const amountBorrowed =
    data && data.user.borrowed ? data.user.borrowed.length : 0
  const amountShared =
    data && data.user.items ? data.user.items.length : 0

  return {
    data: data ? {...data.user, amountShared, amountBorrowed} : null,
    loading,
    error,
  }
}

export default useUserData
