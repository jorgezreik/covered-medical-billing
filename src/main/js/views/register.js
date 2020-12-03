import React, { Component, useState } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../app.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

const phoneRegExp = /(\+[ ]?[0-9]+)?[ ]?[(]?[ ]?[0-9]{3}[ ]?[)]?[ ]?[0-9]{3}[ ]?[-]?[ ]?[0-9]{4}/;

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Must be a valid email").required("Required"),
    phone: Yup.string()
        .required("Required")
        .matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    terms: Yup.bool().oneOf([true], "You must agree before submitting"),
});

function RegistrationForm() {
    const [registrationFailed, setRegistrationFailed] = useState(null);

    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        dirty,
        isValid,
        isSubmitting,
        setSubmitting,
    } = useFormik({
        initialValues: {
            terms: false,
        },
        validationSchema,
        onSubmit(values) {
            values.phone = values.phone.replace(/\D/g, '');
            values.phone = values.phone.substring(values.phone.length - 10);
            const data = JSON.stringify({
                fullName: values.firstName + " " + values.lastName,
                userName: values.email,
                role: "USER",
                phone: values.phone,
                password: values.password,
                loanOption1: "LO1",
                loanOption2: "LO2",
                loanOption3: "LO3",
                autopay: false,
                selectedLoan: 0,
                stripeCustomerId: "",
            });
            console.log(data);
            fetch(
                "/api/users/sign-up",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: data,
                }
            )
                .then((data) => {
                    console.log("Success:", data);
                    if (data.status == 409) {
                        setRegistrationFailed(
                            <div className="invalid-feedback d-block position-static pt-2">
                                The email you chose is already taken.
                            </div>
                        );
                    } else if (data.status == 200) {
                        alert("Account created!");
                    } else {
                        console.log("Unspecified response status received.");
                    }
                })
                .then(() => {
                    setSubmitting(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    });

    return (
        <React.Fragment>
            <Form
                noValidate
                onSubmit={handleSubmit}
                className="text-left floating-form mb-5"
            >
                <h2 className="text-center mb-4">
                    <b>Register</b>
                </h2>
                <Form.Row>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="First name"
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last name"
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group className="pb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email"
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Phone Number"
                        isValid={touched.phone && !errors.phone}
                        isInvalid={touched.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm password"
                        isValid={
                            touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-0 mb-0">
                    <Form.Check
                        required
                        name="terms"
                        label="I agree to terms and conditions"
                        value={values.terms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.terms && !!errors.terms}
                        id="terms"
                    />
                </Form.Group>
                <Row className="justify-content-center text-center">
                    <Button
                        type="submit"
                        variant="main"
                        disabled={!(isValid && dirty) || isSubmitting}
                        className="mt-5"
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </Button>
                    {registrationFailed}
                </Row>
            </Form>
        </React.Fragment>
    );
}

class Register extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    <Col lg={4} md={5} sm={7} className="mx-auto mt-4">
                        <RegistrationForm />
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
