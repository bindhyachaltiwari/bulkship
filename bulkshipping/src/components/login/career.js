import React from 'react';

function Career() {
    return (
        <div>
            <h2>Join us</h2>
            <p><strong>Bulkcom Shipping is always looking for candidates who are passionate about ship brokering</strong></p>
            <p>Apply here to join us <a href="mailto:career@bulkcomshipping.com">career@bulkcomshipping.com</a></p>
            <form name='contatcForm' className='careerForm' role='form' method='post' encType='multipart/form-data'>
                <fieldset>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Enter your name' tabIndex='1' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='text' name='email' placeholder='Enter your email' tabIndex='1' />
                        <p className='info'>We'll never share your email with anyone else.</p>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='upload'>Upload CV</label>
                        <input type='text' className='uploadFile' name='upload' tabIndex='2' />

                        <input type="file" id="myfile" className='uploadFile' name="myfile" /><br />
                    </div>
                    <button type='submit' className='submit-btn' tabIndex='4'>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Career;