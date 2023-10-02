import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import { setCredentials } from '../Slices/authSlice';
import { useRegisterMutation } from '../Slices/usersSlice';
const RegisterScreen = () => {
    const [name, setName ] = useState()
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [confirmPassword, setConfirmPassword] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ register, { isLoading } ] = useRegisterMutation()

    const { userInfo } = useSelector((state)=> state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password Does Not Match!!')
            return;
        }else{
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({...res}))
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=>{ setName(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder='Enter E-Mail'
                        value={email}
                        onChange={(e)=>{ setEmail(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        disabled={ isLoading }
                        onChange={(e)=>{ setPassword(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        disabled={ isLoading }
                        onChange={(e)=>{ setConfirmPassword(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className='mt-2'>Register</Button>
                    { isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                Already Have an account? {' '} 
                <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                    Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
