import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

function render(Compoent) {  
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Compoent />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)
registerServiceWorker();

if(module.hot) {
  module.hot.accept('./router/index', () => {
    const NextApp = require('./router/index').default
    render(NextApp)
  })
}
