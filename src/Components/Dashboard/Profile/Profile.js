import './Profile.css'
import profile from './profile.jpg'
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'; // Import useEffect
import back from './back.jpg'
import { Link } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate();
    const userx = localStorage.getItem('user');
    const parsedUser = JSON.parse(userx);
    useEffect(() => {
        if (!parsedUser) {
            navigate('/index');
        }
    }, []);

    if (!parsedUser) {
        return null;
    }
    return (
        <div className="profile"><div class="main-content">
            <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{
                minHeight: '400px',
                backgroundImage: `url(${back})`,
                backgroundSize: '100%',
                backgroundPosition: 'center top'
            }}>

                <span class="mask bg-gradient-default opacity-8"></span>

                <div class="container-fluid d-flex align-items-center">
                    <div class="row">
                        <div class="col-lg-7 col-md-10">
                            <h1 class="display-2 text-white">Hello {parsedUser.name},</h1>
                            <p class="text-white mt-0 mb-5">This is your profile page. You can see the details of your orders and membership here.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid mt--7">
                <div class="row">
                    <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div class="card card-profile shadow">
                            <div class="row justify-content-center">
                                <div class="col-lg-3 order-lg-2">
                                    <div class="card-profile-image">
                                        <a href="#">
                                            <img src={profile} class="rounded-circle" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            </div>
                            <div class="card-body pt-0 pt-md-4">
                                <div class="row">
                                    <div class="col">
                                        <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <h3>
                                        {parsedUser.name}<span class="font-weight-light"></span>
                                    </h3>
                                    <div class="h5 font-weight-300">
                                        <i class="ni location_pin mr-2"></i>{parsedUser.email}
                                    </div>

                                    <div>
                                        <i class="ni education_hat mr-2"></i>Premium Member
                                    </div>
                                    <hr class="my-4" />
                                    <p>Previous Order Here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8 order-xl-1">
                        <div class="card bg-secondary shadow">
                            <div class="card-header bg-white border-0">
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <h3 class="mb-0">My account</h3>
                                    </div>
                                    <div class="col-4 text-right">
                                        <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <h6 class="heading-small text-muted mb-4">User information</h6>
                                    <div class="pl-lg-4">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-email">Email address</label>
                                                    <input type="email" id="input-email" class="form-control form-control-alternative" placeholder={parsedUser.email} />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group focused">
                                                    <label class="form-control-label" for="input-first-name">Full name</label>
                                                    <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder={parsedUser.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 text-left">
                                                <a href="#!" class="btn btn-sm btn-primary">Update Info</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-4" />

                                    <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                    <div class="pl-lg-4">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group focused">
                                                    <label class="form-control-label" for="input-address">Address</label>
                                                    <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" value="Race Course" type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="form-group focused">
                                                    <label class="form-control-label" for="input-city">City</label>
                                                    <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" value="Dehradun" />
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="form-group focused">
                                                    <label class="form-control-label" for="input-country">Country</label>
                                                    <input type="text" id="input-country" class="form-control form-control-alternative" placeholder="Country" value="India" />
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-country">Postal code</label>
                                                    <input type="number" id="input-postal-code" class="form-control form-control-alternative" placeholder="Postal code" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 text-left">
                                                <a href="#!" class="btn btn-sm btn-primary">Update Address</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><footer class="footer">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6 m-auto text-center">
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'Copyright © '}
                            <Link to="/index" color="inherit">
                                Garden Grove
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </div>
                </div>
            </footer></div>
    )
}

export default Profile