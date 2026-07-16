//step2

import {Provider} from 'react-redux';
import {store} from './redux/store';
import HomesScreen from './redux/HomeScreen';


export default function App(){

  return(
    <Provider store={store}>
      <HomesScreen />
    </Provider>
  )

}