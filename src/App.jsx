import ReactRouter from './ReactRouter';
import {  AppProvider } from './AppContext';
function App() {
 
  return (
    <AppProvider>
      <ReactRouter />
    </AppProvider>
  )
}

export default App
