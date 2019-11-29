import React from 'react'
import {Button} from '@material-ui/core'
import {useDropzone} from 'react-dropzone'

const Dropzone = ({onUpload, file, ...props}) => {
  const onDrop = ([file]) => {
    onUpload({variables: {file}})
  }
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
