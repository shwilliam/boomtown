import React, {createContext, useContext} from 'react'
import AuthContext from './AuthContext'
import {useQuery} from 'react-apollo'
import {ALL_ITEMS_QUERY, VIEWER_QUERY} from '../graphql'

const GQLContext = createContext()

const GQLContextProvider = ({children}) => {
  const {activeUser} = useContext(AuthContext)
  // TODO: avoid fetching if no user
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
    refetch: refetchItems,
  } = useQuery(ALL_ITEMS_QUERY, {
    variables: {filter: activeUser && activeUser.user.id},
    pollInterval: 30000, // 30 sec
  })
  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useQuery(VIEWER_QUERY)

  return (
    <GQLContext.Provider
      value={{
        // HACK: avoid unfiltered query flash
        itemsData: activeUser && !itemsLoading ? itemsData : null,
        itemsLoading: activeUser ? itemsLoading : true,
        itemsError,
        refetchItems,
        userData,
        userDataLoading,
        userDataError,
        refetchUserData,
      }}
    >
      {children}
    </GQLContext.Provider>
  )
}

export default GQLContext
export {GQLContextProvider}
