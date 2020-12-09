import { ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import PageLayout from './components/PageLayout'
import theme from './theme'
import store from './store'
import rootSaga from './sagas/rootSagas'
import sagaMiddleware from './middleware'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PageLayout />
      </ThemeProvider>
    </Provider>
  )
}

export default App

sagaMiddleware.run(rootSaga)
