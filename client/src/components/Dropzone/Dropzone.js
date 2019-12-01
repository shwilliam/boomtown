import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@material-ui/core'
import {useDropzone} from 'react-dropzone'
import useStyles from './Dropzone.styles'

const Dropzone = ({onUpload, file, ...props}) => {
  const onDrop = ([file]) => {
    onUpload({variables: {file}})
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
  })
  const {button} = useStyles()

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        variant="outlined"
        component="span"
        className={button}
        {...props}
      >
        {file
          ? 'Upload a new image'
          : isDragActive
          ? 'Drop your image here'
          : 'Select an image'}
      </Button>
    </div>
  )
}

Dropzone.propTypes = {
  onUpload: PropTypes.func.isRequired,
  file: PropTypes.shape(), // file upload
}

export default Dropzone
