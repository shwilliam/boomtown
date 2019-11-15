import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Form, Field} from 'react-final-form'
import {useMutation} from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import {ADD_ITEM_MUTATION} from '../../graphql'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import validate from './helpers/validate'
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core'
import {ShareItemContext} from '../../context'

const TAGS = {1: 'Fun', 2: 'Gardening'}

const ShareItemForm = ({classes, ...props}) => {
  const {setFormFieldValue} = useContext(ShareItemContext)
  const [addItem, {data: newItem}] = useMutation(ADD_ITEM_MUTATION)
  const history = useHistory()

  const onSubmit = ({title, desc, tags}) =>
    addItem({
      variables: {
        item: {
          title,
          description: desc,
          tags: tags.map(d => Number(d)),
        },
      },
    })

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
          className={classes.form}
          onChange={e =>
            setFormFieldValue(e.target.name, e.target.value)
          }
          {...props}
        >
          <FormControl fullWidth className={classes.formControl}>
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
          <FormControl fullWidth className={classes.formControl}>
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
          <FormControl fullWidth className={classes.formControl}>
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
                      values.map(id => TAGS[id]).join(', ')
                    }
                    value={value || []}
                    name={name}
                    onChange={e =>
                      setFormFieldValue(
                        'tags',
                        e.target.value.map(id => ({
                          id,
                          title: TAGS[id],
                        })),
                      ) || onChange(e)
                    }
                  >
                    {Object.keys(TAGS).map(id => (
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
                        <ListItemText primary={TAGS[id]} />
                      </MenuItem>
                    ))}
                  </Select>
                )
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              type="submit"
              className={classes.formButton}
              variant="contained"
              size="large"
              color="secondary"
              disabled={false}
            >
              Submit
            </Button>
          </FormControl>
          <Typography className={classes.errorMessage}>
            {/* errors */}
          </Typography>
        </form>
      )}
    />
  )
}

export default withStyles(styles)(ShareItemForm)
