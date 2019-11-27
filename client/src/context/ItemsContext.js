import React, {createContext, useContext} from 'react'
import AuthContext from './AuthContext'
import {useQuery} from 'react-apollo'
import {ALL_ITEMS_QUERY} from '../graphql'

const ItemsContext = createContext()

const ItemsContextProvider = ({children}) => {
  const {activeUser} = useContext(AuthContext)
  // TODO: avoid fetching if no user
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useQuery(ALL_ITEMS_QUERY, {
    variables: {filter: activeUser && activeUser.user.id},
    pollInterval: 30000, // 30 sec
  })

  return (
    <ItemsContext.Provider
      value={{
        // HACK: avoid unfiltered query flash
        itemsData: activeUser && !itemsLoading ? itemsData : null,
        itemsLoading: activeUser ? itemsLoading : true,
        itemsError,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export default ItemsContext
export {ItemsContextProvider}
