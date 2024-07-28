import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileInfo } from '../../slice/profileSlice';

const Home = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const profileInfo = useSelector((state) => state.profile);
  console.log(userInfo);

  useEffect(() => {
    console.log('useEffect triggered with userInfo:', userInfo);
    if (userInfo && userInfo.staffNumber) {
      console.log("Dispatching fetchProfileInfo with staffNumber:", userInfo.staffNumber);
      dispatch(fetchProfileInfo(userInfo.staffNumber));
    } else {
      console.log("No valid userInfo found");
    }
  }, [dispatch, userInfo]);

  const { staffNumber, staffName, role, error } = profileInfo;

  console.log('profileInfo:', profileInfo);

  return (
    <div className='admin-container'>
      {error ? (
        <div className='error'>{error.message || 'No message available'}</div>
      ) : (
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
            <p>{role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
