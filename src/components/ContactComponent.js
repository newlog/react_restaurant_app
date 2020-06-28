import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ContactForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup row>
        <Label htmlFor="firstname" md={2}>
          First Name
        </Label>
        <Col md={10}>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            // this is a hack to have dynamic attributes
            // without the "invalid" the FormFeedback is not shown
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(errors.firstname ? { invalid: true } : {})}
            innerRef={register({
              required: 'First name is required.',
              minLength: {
                value: 3,
                message: 'First name should be at least 3 characters.',
              },
            })}
          />
          <ContactErrorMessages
            errorMessage={
              errors && errors.firstname ? errors.firstname.message : ''
            }
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="lastname" md={2}>
          Last Name
        </Label>
        <Col md={10}>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(errors.lastname ? { invalid: true } : {})}
            innerRef={register({
              required: 'Last name is required.',
              minLength: {
                value: 3,
                message: 'Last name should be at least 3 characters.',
              },
            })}
          />
          <ContactErrorMessages
            errorMessage={
              errors && errors.lastname ? errors.lastname.message : ''
            }
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="telnum" md={2}>
          Contact Tel.
        </Label>
        <Col md={10}>
          <Input
            type="tel"
            id="telnum"
            name="telnum"
            placeholder="Contact Tel."
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(errors.telnum ? { invalid: true } : {})}
            innerRef={register({
              required: 'Contact telephone is required.',
              minLength: {
                value: 9,
                message: 'Contact telephone should be at least 9 characters.',
              },
              validate: (value) =>
                !Number.isNaN(Number(value)) ||
                'Contact telephone should be a number.',
            })}
          />
          <ContactErrorMessages
            errorMessage={errors && errors.telnum ? errors.telnum.message : ''}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="email" md={2}>
          Email
        </Label>
        <Col md={10}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="name@domain.com"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(errors.email ? { invalid: true } : {})}
            innerRef={register({
              pattern: {
                required: 'Email is required.',
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email format.',
              },
            })}
          />
          <ContactErrorMessages
            errorMessage={errors && errors.email ? errors.email.message : ''}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md={{ size: 6, offset: 2 }}>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="agree" innerRef={register} />
              <strong>May we contact you?</strong>
            </Label>
          </FormGroup>
        </Col>
        <Col md={{ size: 3, offset: 1 }}>
          <Input type="select" name="contactType" innerRef={register}>
            <option>Tel.</option>
            <option>Email</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="feedback" md={2}>
          Your Feedback
        </Label>
        <Col md={10}>
          <Input
            type="textarea"
            id="message"
            name="message"
            rows="12"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(errors.message ? { invalid: true } : {})}
            innerRef={register({
              required: 'Feedback is required.',
            })}
          />
          <ContactErrorMessages
            errorMessage={
              errors && errors.message ? errors.message.message : ''
            }
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md={{ size: 10, offset: 2 }}>
          <Button type="submit" color="primary">
            Send Feedback
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

const ContactErrorMessages = ({ errorMessage }) => {
  return (
    <FormFeedback>
      {errorMessage ? <div>{errorMessage}</div> : <div />}
    </FormFeedback>
  );
};

// eslint-disable-next-line react/prefer-stateless-function
class Contact extends Component {
  render() {
    // const errors = this.validate(firstname, lastname, telnum, email);

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone" />: +852 1234 5678
              <br />
              <i className="fa fa-fax" />: +852 8765 4321
              <br />
              <i className="fa fa-envelope" />:{' '}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone" /> Call
              </a>
              <button type="button" className="btn btn-info">
                <i className="fa fa-skype" /> Skype
              </button>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o" /> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
