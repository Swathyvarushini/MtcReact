import React from 'react'

const Home = () => {
  return (
    <div className='admin-container'>
        <div className='admin-profile'>
        <h3 className='admin-heading'>Admin Profile</h3>
        <div className='admin-row'>
            <h5>Staff Number</h5>
            <p>T123</p>
        </div>
          <div className='admin-row'>
              <h5>Name</h5>
              <p>Arunkumar</p>
          </div>
          <div className='admin-row'>
              <h5>Designation</h5>
              <p>Frontend Developer</p>
          </div>
          <div className='admin-row'>
              <h5>Branch</h5>
              <p>Thambaram</p>
          </div>
          </div>
    </div>
  )
}

export default Home