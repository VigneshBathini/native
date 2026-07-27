//step2

import {Provider} from 'react-redux';
import {store,persistor} from './redux/store';
import HomesScreen from './redux/HomeScreen';

import { PersistGate } from "redux-persist/integration/react";
//PersistGate delays rendering until persisted Redux data has been restored.


export default function App(){

  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <HomesScreen />
      </PersistGate>
    </Provider>
  )

}