import React from 'react'
import { useAppContext } from '../context/appContext'

export default function Alert(props) {
  const { alertType, alertText } = useAppContext();
  return (
    // class danger OR success +  Alert text
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}
