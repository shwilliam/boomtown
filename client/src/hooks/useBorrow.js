import {useMutation} from '@apollo/react-hooks'
import {BORROW_ITEM_MUTATION, RETURN_ITEM_MUTATION} from '../graphql'

const useBorrow = () => {
  const [borrowItem, {data: borrowStatus}] = useMutation(
    BORROW_ITEM_MUTATION,
    // TODO: fix refetch user items on borrow/return
    {refetchQueries: ['items', 'user']},
  )
  const [returnItem] = useMutation(RETURN_ITEM_MUTATION, {
    refetchQueries: ['items', 'user'],
  })

  return {borrowItem, returnItem, borrowStatus}
}

export default useBorrow
