import React, {useCallback, useContext, useState} from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'
import {Field, Form} from 'react-final-form'
import {
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Modal,
} from '@material-ui/core'
import {CloudDone as CloudDoneIcon} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import {ShareItemContext} from '../../context'
import {ADD_ITEM_MUTATION, ALL_TAGS_QUERY} from '../../graphql'
import {capitalize} from '../../utils'
import Dropzone from '../Dropzone'
import validate from './helpers/validate'
import useStyles from './ShareItemForm.styles'

const useModalStyles = makeStyles(theme => ({
  modal: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    margin: theme.spacing(2),
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineIcon: {
    verticalAlign: 'text-bottom',
  },
}))

const useButtonStyles = makeStyles(theme => ({
  buttonPrimary: {
    borderRadius: 3,
  },
  buttonSecondary: {
    color: theme.palette.primary.main,
    borderRadius: 3,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}20`,
    },
  },
}))

const ShareItemForm = props => {
  const [imageData, setImageData] = useState()
  const [addingMultipleItems, setAddingMultipleItems] = useState(
    false,
  )
  const {setFormFieldValue, onFormReset} = useContext(
    ShareItemContext,
  )
  const [addItem, {data: newItem, error: newItemError}] = useMutation(
    ADD_ITEM_MUTATION,
  )
  const {data: tagsData, error: tagsError} = useQuery(ALL_TAGS_QUERY)
  const {root, formControl, formButton, errorMessage} = useStyles()
  const {modal, modalContainer, inlineIcon} = useModalStyles()
  // TODO: refactor modal component
  const {buttonPrimary, buttonSecondary} = useButtonStyles()
  // TODO: refactor button components
  const history = useHistory()

  // TODO: handle error loading tags
  if (tagsError) console.error(tagsError)

  const onSubmit = useCallback(
    ({title, desc, tags = []}) => {
      setAddingMultipleItems(false)
      addItem({
        variables: {
          item: {
            title,
            description: desc,
            tags: tags.map(d => Number(d)),
            image: imageData,
          },
        },
      })
    },
    [imageData, addItem],
  )

  const onImageUpload = useCallback(
    e => {
      setImageData(e)
      const reader = new FileReader()
      reader.readAsDataURL(e.variables.file)
      reader.onloadend = () =>
        setFormFieldValue('image', reader.result)
    },
    [setFormFieldValue],
  )

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({
        handleSubmit,
        pristine,
        touched,
        errors,
        invalid,
        form,
      }) => (
        <>
          <form
            onSubmit={handleSubmit}
            className={root}
            onChange={e =>
              setFormFieldValue(e.target.name, e.target.value)
            }
            {...props}
          >
            <Dropzone onUpload={onImageUpload} file={imageData} />

            <FormControl fullWidth className={formControl}>
              <InputLabel htmlFor="title">Name your item</InputLabel>
              <Field
                name="title"
                render={({input, meta}) => (
                  <Input
                    id="title"
                    type="text"
                    error={meta.touched && !!meta.error}
                    inputProps={{
                      ...input,
                      autoComplete: 'off',
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth className={formControl}>
              <InputLabel htmlFor="desc">
                Describe your item
              </InputLabel>
              <Field
                name="desc"
                render={({input, meta}) => (
                  <Input
                    id="desc"
                    type="text"
                    error={meta.touched && !!meta.error}
                    inputProps={{
                      ...input,
                      autoComplete: 'off',
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth className={formControl}>
              <InputLabel htmlFor="tags">Add some tags</InputLabel>
              <Field
                name="tags"
                render={({input}) => {
                  const {name, value, onChange, ...inputProps} = input

                  return (
                    <Select
                      id="tags"
                      multiple
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                          },
                        },
                      }}
                      inputProps={inputProps}
                      {...input}
                      renderValue={values =>
                        values
                          .map(val =>
                            capitalize(
                              tagsData.tags.find(({id}) => id === val)
                                .title,
                            ),
                          )
                          .join(', ')
                      }
                      value={value || []}
                      name={name}
                      onChange={e =>
                        setFormFieldValue(
                          'tags',
                          tagsData
                            ? tagsData.tags.filter(({id}) =>
                                e.target.value.includes(String(id)),
                              )
                            : [],
                        ) || onChange(e)
                      }
                    >
                      {tagsData &&
                        tagsData.tags.map(({id, title}) => (
                          <MenuItem key={id} value={id}>
                            <Checkbox
                              checked={
                                !!(
                                  value &&
                                  value.some(
                                    selectedId => selectedId === id,
                                  )
                                )
                              }
                            />
                            <ListItemText
                              primary={capitalize(title)}
                            />
                          </MenuItem>
                        ))}
                    </Select>
                  )
                }}
              />
            </FormControl>
            <Typography className={errorMessage}>
              {(errors && (touched.title && errors.title)) ||
                (touched.desc && errors.desc)}
            </Typography>
            <FormControl className={formControl}>
              <Button
                type="submit"
                className={formButton}
                variant="contained"
                size="large"
                color="secondary"
                disabled={pristine || invalid}
              >
                Submit
              </Button>
            </FormControl>
            <Modal
              aria-labelledby="item-share-title"
              aria-describedby="item-share-description"
              open={!!newItem && !addingMultipleItems}
            >
              <div className={modalContainer}>
                <div className={modal}>
                  <Typography
                    variant="h6"
                    component="p"
                    id="item-share-title"
                  >
                    <CloudDoneIcon className={inlineIcon} /> Your item
                    was added!
                  </Typography>
                  <Typography
                    variant="body1"
                    id="item-share-description"
                  >
                    Thanks for contributing to Boomtown! Add another
                    item or return to the items page below.
                  </Typography>
                  <Button
                    onClick={() => {
                      form.reset()
                      onFormReset()
                      setAddingMultipleItems(true)
                    }}
                    className={buttonSecondary}
                  >
                    Add another item
                  </Button>
                  <Button
                    onClick={() => {
                      history.push('/')
                    }}
                    className={buttonPrimary}
                  >
                    Back to items
                  </Button>
                </div>
              </div>
            </Modal>
            <Modal
              aria-labelledby="item-share-error-title"
              aria-describedby="item-share-error-description"
              open={!!newItemError}
              className={modal}
            >
              <div>
                <h2 id="item-share-error-title">
                  Something went wrong
                </h2>
                <p id="item-share-error-description">
                  Unable to share item. If you wish to try again press
                  'Add Another Item', otherwise use 'Back to Items' to
                  navigate back to the items page.
                </p>
                <Button
                  onClick={() => {
                    history.push('/share')
                  }}
                  className={buttonSecondary}
                >
                  Try again
                </Button>
                <Button
                  onClick={() => {
                    history.push('/')
                  }}
                  className={buttonPrimary}
                >
                  Back to items
                </Button>
              </div>
            </Modal>
          </form>
        </>
      )}
    />
  )
}

export default ShareItemForm
