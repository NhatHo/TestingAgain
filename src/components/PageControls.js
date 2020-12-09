import React, { useState } from 'react'
import { toNumber, isInteger } from 'lodash-es'
import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import actions from './../actions'
import selectors from '../selectors'

const styles = makeStyles((theme) => ({
  control: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0)
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  item: { marginRight: theme.spacing(1) }
}))

/**
 * This is the control panel of the app.
 */
const PageControls = () => {
  const classes = styles()
  const dispatch = useDispatch()
  const [itemsCount, setItemsCount] = useState(0)
  const numericItemsCount = toNumber(itemsCount)
  const itemsListCount = useSelector(selectors.getItemsList).toArray().length
  const disableSave = useSelector(selectors.disableSave)
  return (
    <div className={classes.control}>
      <div className={classes.buttonGroup}>
        <TextField
          size='small'
          variant='outlined'
          value={itemsCount}
          label='# of items'
          onChange={(event) => setItemsCount(event.target.value)}
          className={classes.item}
        />
        <Button
          color='primary'
          variant='contained'
          disabled={!isInteger(numericItemsCount) || numericItemsCount <= 0}
          className={classes.item}
          onClick={() => {
            dispatch(actions.createItems(numericItemsCount))
            dispatch(actions.setScrollOnGeneration(true))
          }}
        >
          Generate
        </Button>
        <Button
          color='primary'
          disabled={itemsListCount <= 0}
          onClick={() => dispatch(actions.clearItems())}
          variant='contained'
          className={classes.item}
        >
          Reset
        </Button>
        {itemsListCount > 0 && (
          <Typography variant='body1'>{`(${itemsListCount} items in total)`}</Typography>
        )}
      </div>
      <div className={classes.buttonGroup}>
        <Button
          color='secondary'
          variant='contained'
          disabled={disableSave}
          className={classes.item}
          onClick={() => dispatch(actions.storeData())}
        >
          Save List To Storage
        </Button>
      </div>
    </div>
  )
}

export default PageControls
