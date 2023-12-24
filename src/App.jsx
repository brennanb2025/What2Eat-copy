import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Dispatcher from './components/Dispatcher';

const Main = () => {
  return <Dispatcher />;
};

const App = () => {
  return (
    <div className='container'>
      <Main />
    </div>
  );
};

export default App;
