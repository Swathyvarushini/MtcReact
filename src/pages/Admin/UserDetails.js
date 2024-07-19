import React from 'react'

const UserDetails = () => {
  return (
    <div className='user-container'>
        <h3 className='user-heading'>Staff Information</h3>
          <div class="table-container">
              <table className="responsive-table">
                  <thead>
                      <tr>
                          <th>S.No</th>
                          <th>Staff.No</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Mobile Number</th>
                          <th>Email ID</th>
                          <th>Password</th>
                          <th>Role</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>T123</td>
                          <td>Arunkumar</td>
                          <td>Developer</td>
                          <td>1234567890</td>
                          <td>arunkumar@example.com</td>
                          <td>*******</td>
                          <td>Admin</td>
                          <td>
                              <button className="btn update-btn">Update</button>
                              <button className="btn delete-btn">Delete</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>


    </div>
  )
}

export default UserDetails