import {
  combineReducers,
  createStore,
  applyMiddleware,
  Middleware,
  PreloadedState,
  Store,
} from 'redux'
import { State } from './types/state.type'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { user } from './reducers/user'
import { locale } from './reducers/locale'
import { defaultOffer } from './reducers/signup'
import { steps, defaultStepsState } from './reducers/steps'

const withMiddlewares = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducers = combineReducers({
  locale,
  user,
  steps,
  defaultOffer,
})

export const initStore = (initialState?: PreloadedState<State>) =>
  createStore(reducers, initialState, withMiddlewares([thunkMiddleware]))

const { withRedux: withStore } = createWrapper<Store<State>>(
  () => initStore({ defaultOffer: 1, locale: 'ro', steps: defaultStepsState }),
  { debug: true }
)

export { withStore }
