import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileInfo } from '../../slice/profileSlice';

const Home = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.profile);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo?.user) {
      dispatch(fetchProfileInfo(userInfo.user.username));
    }
  }, [dispatch, userInfo]);

  const { staffNo, username, designation, branch, error } = profileInfo;

  return (
    <div className='admin-container'>
      <div className='admin-profile'>
        <h3 className='admin-heading'>Admin Profile</h3>
        <div className='admin-row'>
          <h5>Staff Number</h5>
          <p>{staffNo}</p>
        </div>
        <div className='admin-row'>
          <h5>Name</h5>
          <p>{username}</p>
        </div>
        <div className='admin-row'>
          <h5>Designation</h5>
          <p>{designation}</p>
        </div>
        <div className='admin-row'>
          <h5>Branch</h5>
          <p>{branch}</p>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  );
};

export default Home;
