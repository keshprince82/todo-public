import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context.jsx";
import { CurrentContextType } from "./interface.js";

const Login = (): JSX.Element => {
  const { UserName, setUserName } = useContext<CurrentContextType>(MyContext);

  const allowedDetails: { email: string; password: string }[] = [
    { email: "pk@gmail.com", password: "12345" },
    { email: "pk2@gmail.com", password: "12345" },
  ];
  const navigate = useNavigate();
  const [disabled, setdisabled] = useState<boolean>(false);
  const [email, setemail] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [error, seterror] = useState<boolean>(false);
  const handleChange = (e: any) => {
    seterror(false)
    if (e.target.id == "email") {
      setemail(e.target.value);
    } else {
      setpassword(e.target.value);
    }
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email == allowedDetails[0].email &&
      password == allowedDetails[0].password
    ) {
      setUserName(email);
      localStorage.setItem("userName", email);

      seterror(false);
      navigate("/List");
      localStorage.setItem("authToken", "987654321");
    } else {
      seterror(true);
    }
  };

  //   useEffect(()=>{
  //     if(localStorage.getItem('authToken')){
  //         navigate('/List')
  //     }
  //   },[])
  return (
    <>
      <div className="authentication-page">
        <Form onSubmit={handleLogin} onChange={handleChange}>
          <Form.Group className="mb-3">
            <Form.Label>Email address *</Form.Label>
            <Form.Control className={error ?'error':''} id="email" type="email" placeholder="pk@gmail.com" />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label  >Password *</Form.Label>
            <Form.Control className={error ?'error':''}  id="password" type="password" placeholder="12345" />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={disabled}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
export default Login;
