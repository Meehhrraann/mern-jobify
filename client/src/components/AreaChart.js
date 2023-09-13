import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function AreaChartComponent({monthlyApplications}) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={monthlyApplications} margin={{top:50}}>
      <CartesianGrid strokeDasharray='3 3 '/> {/*grid bg*/}
        <XAxis dataKey='date'/> {/*x ---> date*/}
        <YAxis allowDecimals={false}/> {/*x ---> date*/}
        <Tooltip/>
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' /> {/*y ---> count*/}
      </AreaChart>
    </ResponsiveContainer>
  )
}
