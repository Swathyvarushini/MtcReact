import React from 'react'

const VehicleDetails = () => {
  return (
      <div className='user-container'>
          <h3 className='user-heading'>Vehicle Information</h3>
          <div class="table-container">
              <table className="responsive-table">
                  <thead>
                      <tr>
                          <th>S.No</th>
                          <th>Fleet.No</th>
                          <th>Service Route</th>
                          <th>Model</th>
                          <th>Date of Commencement</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>A124587458414475454</td>
                          <td>Thambaram</td>
                          <td>BS6</td>
                          <td>20-12-1987</td>
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

export default VehicleDetails