import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/ChartsContainer'
import {useAppContext} from '../context/appContext'
import BarChart from './BarChart'
import AreaChart from './AreaChart'

export default function ChartsContainer() {
  const[barChart, setBarChart]=useState(false)
  const {monthlyApplications: data} = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={()=>setBarChart(!barChart)}>{barChart ? 'AreaChart' : 'BarChart'}</button>
      {barChart ? <BarChart monthlyApplications={data}/> : <AreaChart monthlyApplications={data}/>}
    </Wrapper>
  )
}
