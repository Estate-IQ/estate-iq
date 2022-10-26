import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SVGs } from "../../../assets/svg/SVGs";
import States from "../../../components/States/State";
import LGAs from "../../../components/States/State";

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
      emailId: "",
      state: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, firstName, password, state } = this.state;
    // alert(`Your registration detail: \n
    // Email: ${email} \n
    // Username: ${firstName} \n
    // Username:  ${state} \n
    // Password: ${password}\n
    // `);
    Swal.fire({
      title: `<h1>${firstName},</h1>You just created an estate with the email <h4> ${email} </h4> and your password is ${state} ${password}</div>`,
      icon: "success",
      showConfirmButton: true,
      showCloseButton: true,
    });

    // useNavigate("/profile", { replace: true });

    // .then(function () {
    //   window.location = "/Test/profile";
    // });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="outlined-btn" type="button" onClick={this._prev}>
          &#60;
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button className="important-btn" type="button" onClick={this._next}>
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <form
          onSubmit={this.handleSubmit}
          // method="post"
          // action="/profile"
          className="new_estates_form scale-up-center"
        >
          <p>Step {this.state.currentStep} of 2</p>

          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            password={this.state.password}
            mobile={this.state.mobile}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            estate_email={this.state.estate_email}
            emailId={this.state.emailId}
            estate_ads={this.state.estate_ads}
            estateName={this.state.estateName}
          />
          <div className="control_btn">
            {this.previousButton()}
            {this.nextButton()}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <div className="create_est ">
        <div className="form_txt">
          <h1>Create Estate</h1>
          <h4>Admin Info</h4>
        </div>
        <input
          type="text"
          id="firstName"
          value={props.firstName}
          onChange={props.handleChange}
          name="firstName"
          placeholder="First Name"
        />
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          value={props.lastName}
          onChange={props.handleChange}
          name="lastName"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={props.email}
          onChange={props.handleChange}
          required
        />
        <input
          type="number"
          id="mobile"
          name="mobile"
          placeholder="Mobile"
          value={props.mobile}
          onChange={props.handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          value={props.password}
          onChange={props.handleChange}
          placeholder="Confirm Password"
        />
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <div className="create_est ">
        <div className="form_txt">
          <h1>Create Estate</h1>
          <h4>Estate info</h4>
        </div>
        <input
          type="text"
          id="estateName"
          name="estateName"
          placeholder="Estate Name"
          value={props.estateName}
          onChange={props.handleChange}
        />
        <input
          type="text"
          id="estate_ads"
          name="estate_ads"
          placeholder="Estate Address"
          value={props.estate_email}
          onChange={props.handleChange}
        />
        <input
          type="email"
          id="estate_email"
          name="estate_email"
          placeholder="Estate Email *"
          value={props.estate_email}
          onChange={props.handleChange}
          required
        />
        <input
          type="text"
          id="emailId"
          name="emailId"
          placeholder="Estate ID"
          value={props.emailId}
          onChange={props.handleChange}
        />
        <div className="double_input">
          <States name="emailId" placeholder="Estate ID" />
          <LGAs />
        </div>
      </div>
      <button
        onClick={returnSuccessMessage}
        className="btn btn-success btn-block"
      >
        Create Estate
      </button>
    </div>
  );
}

const returnSuccessMessage = ({ open, onClose }) => {
  // if (!open) return null;
  return (
    <div onClick={onClose} className="bills_on_me">
      {/* ===========
      SUCESS MESSAGE
      ============== */}
      <div
        className="success_message slide-in-top"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>
          Your have successfully added a new Estate.
          <span>You can check your Estate list to see them</span>
        </p>
        <Link to="/profile">
          <button onClick={onClose} className="important-btn">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="bills_on_me">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <MasterForm />
        <img src={SVGs.close} alt="" onClick={onClose} />
      </div>
    </div>
  );
};
export default Modal;
