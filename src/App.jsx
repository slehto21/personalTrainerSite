import { Link, Outlet } from 'react-router-dom'


function App() {
// Render navigation bar and Outlet, which renders the child route
  return (
    <div className='App'>
      <div style={{ backgroundColor: 'orange', color: 'black', padding: '10px', textAlign: 'center' }}>
        <h1>Personal trainer app</h1>
      </div>
      <nav>
        <Link to="./" style={{ margin: '10px' }}>Customers</Link>
        <Link to="./TrainingList" style={{ margin: '10px' }}>Trainings</Link>
        <Link to="./Calendar" style={{ margin: '10px' }}>Calendar</Link>
        <Link to="./ActivityStats" style={{ margin: '10px' }}>ActivityStats</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
