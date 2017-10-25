//React
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
//Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//Components
import Table from './containers/Table';

const store = configureStore();

ReactDOM.render(
    <Provider store={store} >
        <Table />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
