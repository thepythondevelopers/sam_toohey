import Image from "next/image";
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';

const signup = () => {
    // Variables
    const router = useRouter();
    const [formField, setFormField] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [error, setError] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [isSubmited, setIsSubmited] = useState(false);
    // Validations
    const validate = (values: { first_name: any; last_name: any; email: any; password: any; passwordConfirm: any; }) => {
        let errors = {}
        if (!values.first_name) {
            errors.first_name = "Please enter first name"
        }
        if (!values.last_name) {
            errors.last_name = "Please enter last name"
        }
        if (!values.email) {
            errors.email = "Please enter email"
        }
        if (!values.password) {
            errors.password = "Please enter password"
        }
        if(!values.passwordConfirm){
            error.passwordConfrm = "please confirm your password"
        }else if (values.passwordConfirm != values.password) {
            errors.passwordConfirm = "Password do not match"
        }
        console.log("test", error);
        return errors
    }
    // On chnage
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormField({ ...formField, [name]: value });
    }
    // On Submit
    async function submitForm(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
        e.preventDefault();
        setError(validate(formField));
        setIsSubmited(true);
        // loginAPI(formField);
    }
    useEffect(() => {
        console.log("useEffect working")
        if (Object.keys(error).length == 0 && isSubmited) {
            console.log("Working");
            // navigator("/dashboard");
            signUpAPI(formField);
        }
    }, [error]);
    // login API
    const signUpAPI = async (data: any) => {
        const res = await fetch('http://microhub.tk/api/v1/users/signup/nutritionist', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0NTQzNzk2LCJleHAiOjE2NjQ2MzAxOTZ9.vY69_48T5a6OSRki4eTUFjjFE_hW2gZKRminNoq6An0"
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            console.log("response Error")
        })
    }
    return <>
        <div className="bg-blue auth-page">
            <div className="signup-page">

                <Container>
                    <div className="logo">
                        <Image src="/Logo.svg" width={290} height={114} alt={"Logo"}></Image>
                    </div>
                    <div className="authForm">
                        <h6>Sign Up</h6>
                        <Form>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" name="first_name" placeholder="First Name" value={formField.last_name} onChange={(e) =>
                                            handleChange(e)} />
                                        {error?.first_name && <Form.Text className="errorMessage">{error.first_name}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" name="last_name" placeholder="Last Name" value={formField.last_name} onChange={(e) =>
                                            handleChange(e)} />
                                        {error?.last_name && <Form.Text className="errorMessage">{error.last_name}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col sm={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="email" name="email" placeholder="Email" value={formField.email} onChange={(e) => handleChange(e)} />
                                        {error?.email && <Form.Text className="errorMessage">{error.email}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                {/* <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="tel" name="phone" placeholder="Phone" value={formField.phone} onChange={(e) => handleChange(e)} />
                                        {error?.phone && <Form.Text className="errorMessage">{error.phone}</Form.Text>}
                                    </Form.Group>
                                </Col> */}
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="password" name="password" placeholder="password" value={formField.password} onChange={(e) => handleChange(e)} />
                                        {error?.password && <Form.Text className="errorMessage">{error.password}</Form.Text>}
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control type="password" name="passwordConfirm" placeholder="Confirm Password" value={formField.passwordConfirm} onChange={(e) => handleChange(e)} />
                                        {error?.passwordConfirm && <Form.Text className="errorMessage">{error.passwordConfirm}</Form.Text>}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button className="cmn_btn" variant="primary" type="submit" onClick={(e) => submitForm(e)}>
                                Sign Up
                            </Button>
                            <p className="auth-form">Don't have an account? <Link href="/logins">Sign up</Link></p>
                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    </>
}

export default signup;