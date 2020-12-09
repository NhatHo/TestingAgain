import React, { useEffect } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import PageControls from './PageControls'
import ItemList from './ItemList'
import { useDispatch } from 'react-redux'
import actions from '../actions'

const styles = makeStyles((theme) => ({
  pageContent: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const PageLayout = () => {
  const classes = styles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.retrieveData())
  }, [dispatch])

  return (
    <Container maxWidth='md' className={classes.pageContent}>
      <PageControls />
      <ItemList />
    </Container>
  )
}

export default PageLayout
