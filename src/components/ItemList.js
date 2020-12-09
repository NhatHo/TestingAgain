import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Fab, makeStyles, Typography, Tooltip } from '@material-ui/core'
import { KeyboardArrowDown, Close } from '@material-ui/icons'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Virtuoso } from 'react-virtuoso'
import selectors from '../selectors'
import actions from '../actions'

const styles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start'
  },
  itemText: {
    flex: 1,
    marginRight: theme.spacing(1),
    MozUserSelect: 'none' /* Safari */,
    WebkitUserSelect: 'none' /* Firefox */,
    msUserSelect: 'none' /* IE10+/Edge */,
    userSelect: 'none' /* Standard */
  },
  itemContainer: {
    backgroundColor: '#B2DFDB',
    padding: theme.spacing(1),
    cursor: 'pointer'
  },
  itemLists: {
    height: '100%',
    width: '100%'
  },
  listContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: 'absolute'
  },
  closeButton: {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  }
}))

const Item = (props) => {
  const { text, index } = props
  const classes = styles()
  const dispatch = useDispatch()
  return (
    <div className={classes.itemContainer}>
      <div className={classes.item}>
        <div className={classes.itemText}>{text}</div>
        <Fab
          className={classes.closeButton}
          size='small'
          onClick={() => {
            dispatch(actions.deleteItem(index))
          }}
        >
          <Close />
        </Fab>
      </div>
    </div>
  )
}

const ItemContainerSortable = SortableElement((props) => (
  <div key={[props.index, 'item'].join('-')} {...props} />
))

const ItemContainer = (props) => {
  const { 'data-index': index } = props
  return <ItemContainerSortable index={index} {...props} />
}

const ListContainerSortable = SortableContainer(
  ({ listRef, children, className, style }) => (
    <div ref={listRef} className={className} style={style}>
      {children}
    </div>
  )
)

const ItemList = () => {
  const classes = styles()
  const dispatch = useDispatch()
  const virtuosoRef = useRef(null)
  const [atBottom, setAtBottom] = useState(true)
  const itemLists = useSelector(selectors.getItemsList).toArray()
  const scrollOnGeneration = useSelector(selectors.getScrollOnGeneration)
  const itemCount = itemLists.length

  const scrollToBottom = useCallback(() => {
    if (virtuosoRef && virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: itemCount - 1,
        behavior: 'smooth'
      })
    }
  }, [virtuosoRef, itemCount])

  useEffect(() => {
    if (itemCount && scrollOnGeneration) {
      scrollToBottom()
      dispatch(actions.setScrollOnGeneration(false))
    }
  }, [itemCount, scrollOnGeneration, scrollToBottom, dispatch])

  const List = forwardRef((props, ref) => (
    <ListContainerSortable
      {...props}
      listRef={ref}
      helperDimensions={({ node }) => {
        return { minHeight: 'auto' }
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        dispatch(actions.reorderList(oldIndex, newIndex))
      }}
      pressDelay={100} // in case user clicks on delete button
    />
  ))

  return (
    <>
      <div className={classes.listContainer}>
        {itemCount ? (
          <div className={classes.itemLists}>
            <AutoSizer>
              {({ width, height }) => (
                <Virtuoso
                  ref={virtuosoRef}
                  components={{ List, Item: ItemContainer }}
                  style={{ height, width }}
                  totalCount={itemCount}
                  initialTopMostItemIndex={itemCount - 1}
                  itemContent={(index) => (
                    <div>
                      <Item text={itemLists[index]} index={index} />
                    </div>
                  )}
                  followOutput='smooth'
                  atBottomStateChange={(isAtBottom) => setAtBottom(isAtBottom)}
                />
              )}
            </AutoSizer>
          </div>
        ) : (
          <Typography variant='h2'>Please generate a few items</Typography>
        )}
      </div>

      {!atBottom && (
        <Tooltip title='Scroll To Bottom'>
          <Fab
            size='large'
            color='primary'
            className={classes.fab}
            onClick={scrollToBottom}
          >
            <KeyboardArrowDown />
          </Fab>
        </Tooltip>
      )}
    </>
  )
}

export default ItemList
