import React from 'react'

const RemarkForm = () => {
  return (
    <div className='container-fluid remark-container'>
      <h3 className='form-title'>Inspection From</h3>
      <form action="" className='remark-form'>
        <label htmlFor='remarks' className='form-label'>Remarks</label>
        <textarea name="remarks" id="remark" className='form-textarea' placeholder='Enter your comments'></textarea>
        <small className='info-text'>*required to filled</small>
        <button className='form-btn'>Submit</button>
      </form>
    </div>
  )
}

export default RemarkForm;