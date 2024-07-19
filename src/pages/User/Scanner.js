import React from 'react'
import ScannerElement from '../../components/ScannerElement'
import icon from '../../assets/images/newlogo.png';

export default function Scanner() {
  return (
    <>
      <section className="container-fluid scanner">
        <img src={icon} alt="icon" className='scanner__icon' />
        <h1 className='scanner__title'>MTC-THAMBARAM</h1>
        <p className='scanner__desc'>Click the button, scan the QR code, to access the form.</p>
        <ScannerElement />
      </section>
        
    </>
  )
}
