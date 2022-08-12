import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, ProductsDetail, Purchases } from './pages'
import { LoadingScreen, NavBar, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'
import './App.css'

function App() {

  const isLoading = useSelector(state => state.isLoading)
  
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        { isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/product/:id' element={ <ProductsDetail /> } />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={ <Purchases/> } />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
