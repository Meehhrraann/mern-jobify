import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function BarChartComponent({monthlyApplications}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyApplications} margin={{top:50}}>
        <CartesianGrid strokeDasharray='3 3 '/> {/*grid bg*/}
        <XAxis dataKey='date'/> {/*x ---> date*/}
        <YAxis allowDecimals={false}/> {/*x ---> date*/}
        <Tooltip/>
        <Bar dataKey='count' fill='#2cb1bc' barSize={75}/> {/*y ---> count*/}
      </BarChart>
    </ResponsiveContainer>
  )
}
