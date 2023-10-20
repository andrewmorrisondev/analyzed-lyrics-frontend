import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  // console.log('App.tsx')
  // if (code) {
  //   console.log('Dashboard')
  // } else {
  //   console.log('Login')
  // }

  return (
    <>
      <h1>analyzed-lyrics</h1>
      {code ? <Dashboard code={code} /> : <Login />}
    </>
  )
}

export default App
