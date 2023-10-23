import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return (
    <>
      <h1>analyzed-lyrics</h1>
      {code ? <Dashboard code={code} /> : <Login />}
    </>
  )
}

export default App
