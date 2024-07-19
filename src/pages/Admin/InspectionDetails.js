import React from 'react'

const InspectionDetails = () => {
  return (
      <div className='user-container'>
          <h3 className='user-heading'>Inspection Details</h3>
          <div class="table-container">
              <table className="responsive-table">
                  <thead>
                      <tr>
                          <th>S.No</th>
                          <th>Fleet.No</th>
                          <th>Staff.No</th>
                          <th>Name</th>
                          <th>Date.of.Submission</th>
                          <th>Time.of.Submission</th>
                          <th>Comments</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>A124587458414475454</td>
                          <td>T123</td>
                          <td>Arunkumar</td>
                          <td>20-12-1987</td>
                          <td>13:12:48</td>
                          <td>Good</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default InspectionDetails