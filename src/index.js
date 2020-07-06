import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style/App.css'

import reducers from './config/redux/reducers'
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDom.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.getElementById('root')
    )