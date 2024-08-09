import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const { staffNumber, staffName, role, branch, designation } = userInfo;

  return (
    <div className='admin-container'>
      {userInfo ? (
        <div className='admin-profile'>
          <h3 className='admin-heading'>Admin Profile</h3>
          <div className='admin-row'>
            <h5>Staff Number</h5>
            <p>{staffNumber}</p>
          </div>
          <div className='admin-row'>
            <h5>Name</h5>
            <p>{staffName}</p>
          </div>
          <div className='admin-row'>
            <h5>Designation</h5>
            <p>{designation}</p>
          </div>
          <div className='admin-row'>
            <h5>Role</h5>
            <p>{role}</p>
          </div>
          <div className='admin-row'>
            <h5>Branch</h5>
            <p>{branch}</p>
          </div>
        </div>
      ) : (
        <div className='error'>No user information available</div>
      )}
    </div>
  );
};

export default Home;
