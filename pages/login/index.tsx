import Image from "next/image";
import Link from 'next/link'
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router'
const login = () => {
    const router = useRouter()
    // Variables
    const [formField, setFormField] = useState<any>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<any>({
        email: "",
        password: ""
    });
    const [isSubmited, setIsSubmited] = useState(false);
    // Validations
    const validate = (values: { email: any; password: any; }) => {
        let errors = {}
        if (!values.email) {
            errors.email = "Please enter email"
        }
        if (!values.password) {
            errors.password = "Please enter password"
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
            loginAPI(formField);
        }
    }, [error]);
    // login API
    const loginAPI = async (data: any) => {
        const res = await fetch('http://microhub.tk/api/v1/users/signin', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
                return response.json();
            })
            .then((res) => {
                router.push("/dashboard")
            })
            .catch ((error) => {
            console.log("response Error")
            })
        }
return <>
    <div className="bg-blue auth-page">
        <div className="login-page">

            <Container>
                <div className="logo">
                    <Image src="/Logo.svg" width={290} height={114} alt={"Logo"}></Image>
                </div>
                <div className="authForm">
                    <h6>Sign In</h6>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" name="email" placeholder="Email Address" value={formField.email} onChange={(e) => handleChange(e)} />
                            {error?.email && <Form.Text className="errorMessage">{error.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" name="password" placeholder="Password" value={formField.password} onChange={(e) => handleChange(e)} />
                            {error?.password && <Form.Text className="errorMessage">{error.password}</Form.Text>}
                        </Form.Group>
                        <Button className="cmn_btn" variant="primary" type="submit" onClick={(e) => submitForm(e)}>
                            Sign In
                        </Button>
                        <p className="auth-form">Don't have an account? <Link href="/signup">Sign up</Link></p>
                    </Form>
                </div>
            </Container>
        </div>
    </div>
</>
}

export default login;