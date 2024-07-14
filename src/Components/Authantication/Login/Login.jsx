import React, { useState, useContext } from 'react';
import { Alert, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
// import { groceryContext } from '../../Layout/Layout';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig'; // Your firebase config file
import login from '../../../assets/login/login.png';
import registeration from '../../../assets/login/register.png';
import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [logInError, setLogInError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    // const { userLoggedInState } = useContext(groceryContext);
    // const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://desismart.co.uk/web/user/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Login successful:', result);
                // Save user data to sessionStorage
                console.log(result);
                const accessToken= result.data.accessToken
                localStorage.setItem('accessToken', result.data.accessToken);
                localStorage.setItem('refreshToken', result.data.refreshToken);
                getLoginUserData(accessToken);
            } else {
                console.error('Login failed:', result);
                setLogInError(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLogInError('Login failed');
        }
    };

    const getLoginUserData=async (accessToken)=>{
        try {
            console.log("========> ",accessToken)
            const response = await fetch('https://desismart.co.uk/web/user/get-logged-in-user-details', {
                method: 'GET',
                headers: {Authorization:`Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Login successful:', result);
                // Save user data to sessionStorage
                console.log(result);
                localStorage.setItem('userData',JSON.stringify( result.data));
                localStorage.setItem('userName',JSON.stringify( result.data.user_name));
                localStorage.setItem('user_id',JSON.stringify( result.data.user_id));
                localStorage.setItem('Address',JSON.stringify( result.data.Address));
                localStorage.setItem('Pincode',JSON.stringify( result.data.Pincode));
                localStorage.setItem('email',JSON.stringify( result.data.email));
                localStorage.setItem('grocery_userLoggedIn', true);
                // setIsUserLoggedIn(true);
                navigate(from);
            } else {
                console.error('Login User Details failed:', result);
                setLogInError(result.message || 'Login User Details failed');
            }
        } catch (error) {
            console.error('Login User Details error:', error);
            setLogInError('Login User Details failed');
        }
    }

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleSocialLogin = (provider) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('grocery_userLoggedIn', JSON.stringify(true));
                // setIsUserLoggedIn(true);
                navigate(from);
            })
            .catch((error) => {
                setLogInError(error.message);
            });
    };

    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <SignInForm
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        register={register}
                        errors={errors}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        logInError={logInError}
                        handleSocialLogin={handleSocialLogin}
                    />
                    <SignUpForm
                        handleSubmit={handleSubmit}
                        handleSocialLogin={handleSocialLogin}
                        setSignUpError={setSignUpError}
                        navigate={navigate} // Pass navigate function to handle navigation after signup
                    />
                </div>
            </div>

            <div className="panels-container">
                <Panel
                    position="left"
                    title="New here ?"
                    text="Sign up now to unlock exclusive benefits and stay updated with our latest offers!"
                    buttonText="Sign up"
                    image={login}
                    onClick={handleSignUpClick}
                />
                <Panel
                    position="right"
                    title="One of us ?"
                    text="Embark on a culinary journey and unlock fresh flavors with your login to our convenient virtual grocery aisles."
                    buttonText="Login"
                    image={registeration}
                    onClick={handleSignInClick}
                />
            </div>
        </div>
    );
};

const SignInForm = ({ handleSubmit, onSubmit, register, errors, showPassword, setShowPassword, logInError, handleSocialLogin }) => (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <h2 className="title font-bold">Login</h2>
        <div className="input-field">
            <i className="fas fa-user"></i>
            <input
                type="text"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                })}
                placeholder='Email'
                label='Email'
                size='small'
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ''}
                fullWidth
                color='success'
                variant='outlined'
                className='input'
            />
        </div>
        <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
                type="password"
                {...register('password', {
                    required: 'Password is required',
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[@!])[a-zA-Z0-9@!]{6,}$/,
                        message: 'Minimum 6 characters with one uppercase letter',
                    },
                })}
                placeholder='Password'
                label="Password"
                fullWidth
                size="small"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : ''}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                size='small'
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <VisibilityOff fontSize='inherit' />
                                    : <Visibility fontSize='inherit' />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
        {logInError && <Alert severity="error">{logInError}</Alert>}
        <button type="submit" className="btn solid bg-[#2E7D32]">Login</button>
        <a href="/forgotpassword" className='hover:underline'>Forgot Password?</a>
        <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
            <SocialIcon href="#" iconClass="fab fa-google" onClick={() => handleSocialLogin(new GoogleAuthProvider())} />
            <SocialIcon href="#" iconClass="fab fa-facebook" onClick={() => handleSocialLogin(new FacebookAuthProvider())} />
        </div>
    </form>
);

const SignUpForm = ({ handleSubmit, handleSocialLogin, setSignUpError, navigate }) => {
    const { register, formState: { errors }, handleSubmit: handleSignUpSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { from } = location.state || { from: { pathname: '/login' } };
    // const { userLoggedInState } = useContext(groceryContext);
    // const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;
    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://desismart.co.uk/web/user/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Signup successful:', result);
                // Save user data to sessionStorage
                localStorage.setItem('grocery_user', JSON.stringify(result.user));
                localStorage.setItem('grocery_userLoggedIn', JSON.stringify(true));
                window.location.replace("/login")
                navigate(from);
            } else {
                console.error('Signup failed:', result);
                setSignUpError(result.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setSignUpError('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSignUpSubmit(onSubmit)} className="sign-up-form">
            <h2 className="title font-bold">Sign up</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="text"
                    {...register('user_name', {
                        required: 'Username is required'
                    })}
                    placeholder="Username"
                    size='small'
                    error={errors.username ? true : false}
                    helperText={errors.username ? errors.username.message : ''}
                    fullWidth
                    variant='outlined'
                    className='input'
                />
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                    type="text"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    placeholder="Email"
                    size='small'
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : ''}
                    fullWidth
                    variant='outlined'
                    className='input'
                />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[@!])[a-zA-Z0-9@!]{6,}$/,
                            message: 'Minimum 6 characters with one uppercase letter',
                        },
                    })}
                    placeholder="Password"
                    fullWidth
                    size="small"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password.message : ''}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    size='small'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <VisibilityOff fontSize='inherit' />
                                        : <Visibility fontSize='inherit' />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    {...register('confirm_password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[@!])[a-zA-Z0-9@!]{6,}$/,
                            message: 'Password Does Not Match',
                        },
                    })}
                    placeholder="Confirm Password"
                    fullWidth
                    size="small"
                    error={errors.confirm_password ? true : false}
                    helperText={errors.confirm_password ? errors.confirm_password.message : ''}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    size='small'
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ?
                                        <VisibilityOff fontSize='inherit' />
                                        : <Visibility fontSize='inherit' />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="input-field">
                <i className="fas fa-location-dot"></i>
                <input
                    type="text"
                    {...register('Address', {
                        required: 'Address is required',
                        
                    })}
                    placeholder="Address"
                    size='small'
                    error={errors.Address ? true : false}
                    helperText={errors.Address ? errors.Address.message : ''}
                    fullWidth
                    variant='outlined'
                    className='input'
                />
            </div>
            <div className="input-field">
                <i className="fas fa-location-dot"></i>
                <input
                    type="text"
                    {...register('Pincode', {
                        required: 'Pincode is required',
                        
                    })}
                    placeholder="Pincode"
                    size='small'
                    error={errors.Pincode ? true : false}
                    helperText={errors.Pincode ? errors.Pincode.message : ''}
                    fullWidth
                    variant='outlined'
                    className='input'
                />
            </div>
            <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                    type="number"
                    {...register('mobile_number', {
                        required: 'Mobilenumber is required',
                        
                    })}
                    placeholder="Mobile Number"
                    size='small'
                    error={errors.mobile_number ? true : false}
                    helperText={errors.mobile_number ? errors.mobile_number.message : ''}
                    fullWidth
                    variant='outlined'
                    className='input'
                />
            </div>
            <button type="submit" className="btn solid bg-[#2E7D32]">Sign Up</button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
                <SocialIcon href="#" iconClass="fab fa-google" onClick={() => handleSocialLogin(new GoogleAuthProvider())} />
                <SocialIcon href="#" iconClass="fab fa-facebook" onClick={() => handleSocialLogin(new FacebookAuthProvider())} />
            </div>
        </form>
    );
};

const SocialIcon = ({ href, iconClass, onClick }) => (
    <a href={href} className="social-icon" onClick={onClick}>
        <i className={iconClass}></i>
    </a>
);

const Panel = ({ position, title, text, buttonText, image, onClick }) => (
    <div className={`panel ${position}-panel`}>
        <div className="content">
            <h3>{title}</h3>
            <p>{text}</p>
            <button className="btn transparent" onClick={onClick}>
                {buttonText}
            </button>
        </div>
        <img src={image} className="image" alt="" />
    </div>
);

export default Login;
