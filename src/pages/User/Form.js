import React from 'react'
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';

export default function Form() {
  return (
    <>
      <section className='container-fluid form-container'>
        <div className='form-header'>
          <img src={icon} alt="icon" className='scanner__icon' />
          <h1 className='scanner__title'>MTC-THAMBARAM</h1>
          <div className='form-details'>
            <p>Name: Arunkumar</p>
            <p>Staff.Id: A502145</p>
            <p>Fleat.No: A50214504151451</p>
            <p>Date: 09/07/2024 13:25:14</p>
          </div>
        </div>
        <RemarkForm />
      </section>

    </>
  )
}
