import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MyContext } from "../Context.jsx";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CreateTodo } from "./CreateTodo";
import Dropdown from "react-bootstrap/Dropdown";
import { todoObject } from "../interface.js";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const List = () => {
  const { UserName, setUserName, todos, setTodos } = useContext<any>(MyContext);

  const [show, setShow] = useState<boolean>(false);

  const [editIndex, setEditIndex] = useState<number>(0);

  const handleClose = (): void => {setEditIndex(0); setShow(false)};
  const handleShow = (): void => setShow(true);
  const handleEdit = (e: any, index: number): void => {
    setEditIndex(index + 1);
    setShow(true);
  };
  const logout = (): void => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  return (
    <>
        <Row className="p-3">
        <Col md={6}>
        <Card
          className="align-left"
          style={{ padding: 15, borderRadius: "initial" }}
        >
          <h2>Your ToDo List</h2>
        </Card>
          </Col> 
           <Col md={6} style={{paddingTop:20}}>
           <div className="d-flex align-items-center justify-content-center">
        <Dropdown>
            <Dropdown.Toggle
              className="margin-right-3"
              variant="success"
              id="dropdown-basic"
            >
              Edit
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {todos.map((item:todoObject,index:number)=>
              <Dropdown.Item
                key={index}
                 onClick={(e) => {
                  handleEdit(e, index);
                }}
              >
        {item.completed ? (
                      <span>{item.name} &#9989;</span>
                    ) : (
                      <span
                       
                      >
                        {item.name} &#128337;{" "}
                      </span>
                    )}
              </Dropdown.Item> )}
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={handleShow} >Create</Button>
<div className="hideArrow">
<Dropdown>
            <Dropdown.Toggle
              className="username"
              variant="success"
              id="dropdown-basic"
            >
              {UserName && UserName.length ? UserName[0] : "U"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
</div>
        
        </div>
          </Col>
          
        </Row>


        
      <Accordion className="shadow-lg">
        {todos.map(
          (
            item: todoObject,
            index: number
          ) => {
            if (item.isNested) {
              return (
                <Accordion.Item
                  key={index}
                  className={
                    item.completed
                      ? "bg-success shadow-lg"
                      : "bg-warning shadow-lg"
                  }
                  eventKey={`${index + 1}`}
                >
                  <Accordion.Header>
                    {item.completed ? (
                      <span>{item.name} &#9989;</span>
                    ) : (
                      <span
                       
                      >
                        {item.name} &#128337;{" "}
                      </span>
                    )}
                  </Accordion.Header>
                  {item.isNested ? (
                    <Accordion.Body>{item?.description}</Accordion.Body>
                  ) : (
                    ""
                  )}
                </Accordion.Item>
              );
            } else {
              return (
                <Card
                key={index}
                  className="align-left"
                  style={{ padding: 15, borderRadius: "initial" }}
                >
                  {item.completed ? (
                    <span
                      className="text-left"
                      style={{ textAlign: "left", paddingLeft: 5 }}
                    >
                      {item.name} &#9989;
                    </span>
                  ) : (
                    <span
                      className="text-left"
                      style={{ textAlign: "left", paddingLeft: 5 }}
                    >
                      {item.name} &#128337;{" "}
                    </span>
                  )}
                </Card>
              );
            }
          }
        )}
      </Accordion>

      <CreateTodo
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </>
  );
};
export default List;
