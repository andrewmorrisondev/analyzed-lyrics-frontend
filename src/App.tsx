import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return (
    <>
        {code 
        ? 
        <main>
          <Dashboard code={code} />
        </main>
        :
        <main
          className='flex justify-center '
          style={{marginTop: '50vh'}}
        >
          <Login />
        </main>
        }
    </>
  )
}

export default App
