import React, {createContext, useContext} from 'react'
import PropTypes from 'prop-types'
import AuthContext from './AuthContext'
import {useQuery} from 'react-apollo'
import {ALL_ITEMS_QUERY} from '../graphql'

const ItemsContext = createContext()

const ItemsContextProvider = ({children}) => {
  const {activeUser} = useContext(AuthContext)
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
        itemsData: !itemsLoading ? itemsData : null,
        itemsLoading,
        itemsError,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

ItemsContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ItemsContext
export {ItemsContextProvider}
