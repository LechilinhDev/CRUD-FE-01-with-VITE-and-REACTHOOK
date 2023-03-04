import { useState } from 'react'

import './App.scss'

import TableList from './components/TableList'


const App = () => {


  return (
    <div className="App m-2">
      <h1 className='text-center'>CRUD with VITE and REACT HOOK</h1>
      <TableList />
    </div>
  )
}

export default App
