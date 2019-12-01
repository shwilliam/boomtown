import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import {useMutation} from 'react-apollo'
import {Button, TextField} from '@material-ui/core'
import {UPDATE_BIO_MUTATION} from '../../graphql'
import useStyles from './BioInput.styles'

const BioInput = ({bio, ...props}) => {
  const [bioTouched, setBioTouched] = useState(false)
  const [bioInput, setBioInput] = useState(bio)
  const [updateBio] = useMutation(UPDATE_BIO_MUTATION, {
    refetchQueries: ['user'],
  })
  const {root, input, submitBtn} = useStyles()

  const onBioSubmit = useCallback(
    e => {
      e.preventDefault()
      updateBio({variables: {bio: bioInput}})
    },
    [updateBio, bioInput],
  )

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onBioSubmit}
      className={root}
      {...props}
    >
      <TextField
        value={bioInput || ''}
        onChange={e => setBioInput(e.target.value)}
        onFocus={() => setBioTouched(true)}
        label={bioInput ? 'Bio' : 'No bio provided'}
        multiline
        rows="2"
        className={input}
      />
      <Button
        type="submit"
        disabled={!bioTouched || bio === bioInput}
        className={submitBtn}
      >
        Save
      </Button>
    </form>
  )
}

BioInput.propTypes = {
  bio: PropTypes.string,
}

export default BioInput
