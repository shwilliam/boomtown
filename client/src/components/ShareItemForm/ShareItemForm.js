import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Field} from 'react-final-form'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {makeStyles} from '@material-ui/core/styles'
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core'
import Dropzone from '../Dropzone'
import {ADD_ITEM_MUTATION, ALL_TAGS_QUERY} from '../../graphql'
import {ShareItemContext, GQLContext} from '../../context'
import {capitalize} from '../../utils'
import validate from './helpers/validate'

const useShareItemFormStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  formButton: {
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: 'firebrick',
  },
}))

const ShareItemForm = props => {
  const [imageData, setImageData] = useState()
  const {refetchUserData} = useContext(GQLContext)
  const {setFormFieldValue} = useContext(ShareItemContext)
  const [addItem, {data: newItem}] = useMutation(ADD_ITEM_MUTATION)
  const {data: tagsData, error: itemsError} = useQuery(ALL_TAGS_QUERY)
  const history = useHistory()
  const {
    root,
    formControl,
    formButton,
    errorMessage,
  } = useShareItemFormStyles()

  // TODO: handle error loading tags
  if (itemsError) console.error(itemsError)

  const onSubmit = useCallback(
    ({title, desc, tags = []}) =>
      addItem({
        variables: {
          item: {
            title,
            description: desc,
            tags: tags.map(d => Number(d)),
            image: imageData,
          },
        },
      }) && refetchUserData(),
    [imageData, addItem, refetchUserData],
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

  useEffect(() => {
    if (newItem) history.push('/')
  }, [history, newItem])

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({handleSubmit}) => (
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
            <InputLabel htmlFor="desc">Describe your item</InputLabel>
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
                          <ListItemText primary={capitalize(title)} />
                        </MenuItem>
                      ))}
                  </Select>
                )
              }}
            />
          </FormControl>
          <FormControl className={formControl}>
            <Button
              type="submit"
              className={formButton}
              variant="contained"
              size="large"
              color="secondary"
              disabled={false}
            >
              Submit
            </Button>
          </FormControl>
          <Typography className={errorMessage}>
            {/* errors */}
          </Typography>
        </form>
      )}
    />
  )
}

export default ShareItemForm
