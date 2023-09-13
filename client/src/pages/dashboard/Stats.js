import React, { useEffect } from 'react'
import { ChartsContainer, Loading, StatsContainer } from '../../components'
import { useAppContext } from '../../context/appContext'

export default function Stats() {
  const { monthlyApplications, showStats, isLoading} = useAppContext()

  useEffect(()=>{
    showStats()
  },[])

  if(isLoading) {
    return <Loading center/>
  }

  return (
    <div>
      <StatsContainer/>
      {monthlyApplications.length > 0 && <ChartsContainer/>}
    </div>
  )
  
}
