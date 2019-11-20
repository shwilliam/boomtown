import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Button} from '@material-ui/core'

const Dropzone = ({onUpload, file, ...props}) => {
  const onDrop = useCallback(
    ([file]) => {
      onUpload({variables: {file}})
    },
    [onUpload],
  )
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="outlined" component="span" {...props}>
        {file
          ? 'Upload a new image'
          : isDragActive
          ? 'Drop your image here'
          : 'Select an image'}
      </Button>
    </div>
  )
}

export default Dropzone
