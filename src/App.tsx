import { Outlet } from 'react-router-dom'
import Logged from './components/layouts/Logged'

export default function App() {
  return (
    <Logged>
      <Outlet />
    </Logged>
  )
}
