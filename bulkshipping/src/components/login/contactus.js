import React from 'react';

function ContactUs() {
    return (
        <div className='contact-us'>
            <h2>Contact us</h2>
            <div className = 'addressSection'>
                <strong>BULKCOM SHIPPING</strong> <br/>
                Unit No 35, 7th Floor,<br/>
                Emaar Emerald Plaza, Sector 65<br/>
                Gurgaon (Delhi NCR), I N D I A<br/>
                Tel: +91 124 424 1476, 425 1476<br/>
                Email: <a href="mailto:fix@bulkcomshipping.com">fix@bulkcomshipping.com</a><br/>
            </div>
            <div className = 'contact-form-section'>
                <form name='contatcForm' className = 'contactForm' role='form' method='post' encType='multipart/form-data'>
                    <fieldset>
                        <legend>Get in Touch</legend>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' tabIndex='1' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='text' name='email' tabIndex='1' />
                            <p className='info'>We'll never share your email with anyone else.</p>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='subject'>Subject</label>
                            <input type='text' name='subject' tabIndex='2' />

                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Message</label>
                            <textarea type='text' name='message' tabIndex='2' />

                        </div>
                        <button type='submit' className='submit-btn' tabIndex='4'>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default ContactUs