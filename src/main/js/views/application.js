import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../app.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    dob: Yup.string()
        .required("Required"),
    ssn: Yup.string()
        .required("Required"),
    address: Yup.string()
        .required("Required"),
    address2: Yup.string()
        .required("Required"),
    city: Yup.string()
        .required("Required"),
    state: Yup.string()
        .required().notOneOf([""]),
    zip: Yup.number()
        .required("Required"),
    terms: Yup.bool().oneOf([true], "You must agree before submitting"),
});

function ApplicationForm(props) {
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
            const data = JSON.stringify({
                dob: values.dob,
                ssn: values.ssn,
                address: values.address,
                address2: values.address2,
                city: values.city,
                state: values.state,
                zip: values.zip,
            });
            console.log(data);
            fetch(
                "/",
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
                console.log("Test:", data);
                props.onFinish(true);
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
                <Form.Group className="pb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        readOnly
                        value={props.user.fullName}
                    />
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        readOnly
                        value={props.user.userName}
                    />
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        readOnly
                        value={props.user.phone}
                    />
                </Form.Group>

                <hr style={{ borderColor: '#C5C5C5' }} />

                <Form.Group className="pb-2">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="text"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="MM/DD/YYYY"
                        isValid={touched.dob && !errors.dob}
                        isInvalid={touched.dob && !!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.dob}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                        type="text"
                        name="ssn"
                        value={values.ssn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="SSN"
                        isValid={touched.ssn && !errors.ssn}
                        isInvalid={touched.ssn && !!errors.ssn}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.ssn}
                    </Form.Control.Feedback>
                </Form.Group>

                <hr style={{ borderColor: '#C5C5C5' }} />

                <Form.Group className="pb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="1234 Main St"
                        isValid={touched.address && !errors.address}
                        isInvalid={touched.address && !!errors.address}
                    />
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="address2"
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Apartment, studio, or floor"
                        isValid={touched.address2 && !errors.address2}
                        isInvalid={touched.address2 && !!errors.address2}
                    />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="4" className="pb-2">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.city && !errors.city}
                            isInvalid={touched.city && !!errors.city}
                        />
                    </Form.Group>

                    <Form.Group as={Col} cmd="4" className="pb-2">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            as="select"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.state && !errors.state}
                            isInvalid={touched.state && !!errors.state}
                            defaultValue="Choose..."
                        >
                            <option value="">N/A</option>
                            <option value="AK">Alaska</option>
                            <option value="AL">Alabama</option>
                            <option value="AR">Arkansas</option>
                            <option value="AZ">Arizona</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DC">District of Columbia</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="IA">Iowa</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MD">Maryland</option>
                            <option value="ME">Maine</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MO">Missouri</option>
                            <option value="MS">Mississippi</option>
                            <option value="MT">Montana</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="NE">Nebraska</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NV">Nevada</option>
                            <option value="NY">New York</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VA">Virginia</option>
                            <option value="VT">Vermont</option>
                            <option value="WA">Washington</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WV">West Virginia</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="pb-2">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            type="text"
                            name="zip"
                            value={values.zip}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.zip && !errors.zip}
                            isInvalid={touched.zip && !!errors.zip}
                        />
                    </Form.Group>
                </Form.Row>
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
                </Row>
            </Form>
        </React.Fragment>
    );
}

class Register extends Component {

    constructor() {
		super();

        this.setDone = this.setDone.bind(this);

		this.state = {
			user: {
				fullName: 'Loading name...',
				phone: '0000000000',
				userName: 'Loading email...',
            },
            applicationDone: false
        };
    }
    
    componentDidMount() {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => this.setState({user: data}));    
    }

    setDone(val) {
        this.setState({
            applicationDone: val
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    
                    <Col lg={4} md={5} sm={7} className="mx-auto mt-4">
                        {this.state.applicationDone ? 
                            <React.Fragment>
                                <h2 className="text-center mb-4 primary">
                                    <b>Thank You!</b>
                                </h2>
                                <p className="text-center">
                                    Your application will be processed within 5 business days.
                                    Click below to be taken to our homepage:
                                </p>
                                <Row className="justify-content-center text-center">
                                    <Button variant="main" href="/" className="mx-auto">Finish</Button>
                                </Row>
                            </React.Fragment> :
                            <React.Fragment>
                                <h2 className="text-center mb-4">
                                    <b>Application</b>
                                </h2>
                                <ApplicationForm user={this.state.user} onFinish={this.setDone} />
                            </React.Fragment>
                        }
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
