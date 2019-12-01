import React from 'react'
import {Modal as MuiModal} from '@material-ui/core'
import useStyles from './Modal.styles'

const Modal = ({children, ...props}) => {
  const {modal, modalContainer} = useStyles()

  return (
    <MuiModal {...props}>
      <div className={modalContainer}>
        <div className={modal}>{children}</div>
      </div>
    </MuiModal>
  )
}

export default Modal
