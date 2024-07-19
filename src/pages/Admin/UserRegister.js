import React from 'react'

const UserRegister = () => {
  return (
      <div class="form-container">
          <h2>User Registration</h2>
          <form class="registration-form">
              <div class="input-group">
                  <label for="staffNo">Staff.No</label>
                  <input type="text" id="staffNo" name="staffNo" placeholder="Enter Staff No" required/>
              </div>
              <div class="input-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter Name" required/>
              </div>
              <div class="input-group">
                  <label for="designation">Designation</label>
                  <input type="text" id="designation" name="designation" placeholder="Enter Designation" required/>
              </div>
              <div class="input-group">
                  <label for="role">Role</label>
                  <input type="text" id="role" name="role" placeholder="Enter Role" required/>
              </div>
              <div class="input-group">
                  <label for="mobileNumber">Mobile Number</label>
                  <input type="tel" id="mobileNumber" name="mobileNumber" placeholder="Enter Mobile Number" required/>
              </div>
              <div class="input-group">
                  <label for="emailId">Email ID</label>
                  <input type="email" id="emailId" name="emailId" placeholder="Enter Email ID" required/>
              </div>
              <div class="input-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter Password" required/>
              </div>
              <div class="input-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" required/>
              </div>
              <button type="submit" class="submit-btn">Submit</button>
          </form>
      </div>
  )
}

export default UserRegister