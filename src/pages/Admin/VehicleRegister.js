import React from 'react'

const VehicleRegister = () => {
  return (
      <div class="form-container">
          <h2>Vehicle Registration</h2>
          <form class="registration-form">
              <div class="input-group">
                  <label htmlFor="fleetNo">Fleet.No</label>
                  <input type="text" id="fleetNo" name="fleetNo" placeholder="Enter Fleet No" required />
              </div>
              <div class="input-group">
                  <label for="serviceRoute">Service Route</label>
                  <input type="text" id="serviceRoute" name="serviceRoute" placeholder="Enter Service Route" required />
              </div>
              <div class="input-group">
                  <label for="model">Model</label>
                  <input type="text" id="model" name="model" placeholder="Enter a Model" required />
              </div>
              <div class="input-group">
                  <label for="doc">Date of Commencement</label>
                  <input type="text" id="doc" name="doc" placeholder="Date of Commencement" required />
              </div>
              <button type="submit" class="submit-btn">Submit</button>
          </form>
      </div>
  )
}

export default VehicleRegister