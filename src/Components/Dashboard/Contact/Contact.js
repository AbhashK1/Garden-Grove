import './Contact.css'
import axios from 'axios'; 
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function Contact() {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const initialFormData = {
        firstName: '',
        email: '',
        phoneNumber: '',
        query: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

    const handleSubmit = async (e) => {
        setFormData(initialFormData);
        setSnackbarOpen(true);
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/putquery', formData);
            setSnackbarMessage('Query Registered');
        } catch (error) {
            console.error('Error submitting data', error);
            // Handle error
        }
    };

    return (
        <><div class="contact_us_6">
            <div class="responsive-container-block container">
                <form class="form-box" onSubmit={handleSubmit}>
                    <div class="container-block form-wrapper">
                        <div class="mob-text">
                            <p class="text-blk contactus-head">
                                Get in Touch
                            </p>
                        </div>
                        <div class="responsive-container-block" id="i2cbk">
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-3">
                                <p class="text-blk input-title">
                                    FIRST NAME
                                </p>
                                <input class="input" id="ijowk-3" name="firstName" placeholder="Please enter first name..." value={formData.firstName}
                                    onChange={handleChange} />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ip1yp">
                                <p class="text-blk input-title">
                                    EMAIL
                                </p>
                                <input class="input" id="ipmgh-3" name="email" placeholder="Please enter email..." value={formData.email}
                                    onChange={handleChange} />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ih9wi">
                                <p class="text-blk input-title">
                                    PHONE NUMBER
                                </p>
                                <input class="input" id="imgis-3" name="phoneNumber" placeholder="Please enter phone number..." value={formData.phoneNumber}
                                    onChange={handleChange} />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-3">
                                <p class="text-blk input-title">
                                    WHAT DO YOU HAVE IN MIND ?
                                </p>
                                <textarea class="textinput" id="i5vyy-3" name="query" placeholder="Please enter query..." value={formData.query}
                                    onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <button class="submit-btn" id="w-c-s-bgc_p-1-dm-id-2" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
                <div class="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12" id="i772w">
                    <div class="map-part">
                        <p class="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
                            Reach us at
                        </p>
                        <p class="text-blk map-contactus-subhead">
                            Dehradun, Uttarakhand (248002)
                        </p>
                        <div class="social-media-links mob">
                            <a class="social-icon-link" href="#" id="ix94i-2-2">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png" />
                            </a>
                            <a class="social-icon-link" href="#" id="itixd">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png" />
                            </a>
                            <a class="social-icon-link" href="#" id="izxvt">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png" />
                            </a>
                            <a class="social-icon-link" href="#" id="izldf-2-2">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png" />
                            </a>
                        </div>
                        <div class="map-box">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7324.178256402547!2d77.9979154203387!3d30.27112000529346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092b9451ae8dfd%3A0xf39c46d34a152faa!2sGraphic%20Era%20(Deemed%20to%20be%20University)!5e0!3m2!1sen!2sin!4v1691485897102!5m2!1sen!2sin" width="100%" height="100%" style={{ border: '0', borderRadius: '10px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div><Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar></>
    );
}

export default Contact;
