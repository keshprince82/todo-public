import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MyContext } from "../Context";

export function CreateTodo({
  show,
  handleClose,
  handleShow,
  editIndex,
  setEditIndex,
}: {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  editIndex: number;
  setEditIndex: (props: number) => void;
}) {
  const { UserName, setUserName, todos, setTodos } = useContext<any>(MyContext);

  const [todoDetail, setTodoDetail] = useState<{
    name: string;
    isNested: boolean;
    description: string;
    completed: boolean;
  }>({
    name: "",
    isNested: false,
    description: "",
    completed: false,
  });
  const handleChange = (e: any) => {
    if (e.target.id == "isNested" || e.target.id == "completed") {
      setTodoDetail({ ...todoDetail, [e.target.id]: e.target.checked });
    } else {
      setTodoDetail({ ...todoDetail, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = () => {
    if(editIndex && todoDetail?.name){
      let arrayTodo = todos;
      arrayTodo[editIndex -1]=todoDetail;
      setTodos(arrayTodo)
      setTodoDetail({
        name: "",
        isNested: false,
        description: "",
        completed: false,
      });
      handleClose();

    }else if (todoDetail?.name) {
      setTodos([...todos, todoDetail]);
      setTodoDetail({
        name: "",
        isNested: false,
        description: "",
        completed: false,
      });
      handleClose();
    }

  };
  useEffect(() => {
    if (editIndex) {
      setTodoDetail({
        name: todos[editIndex - 1]?.name,
        isNested: todos[editIndex - 1]?.isNested,
        description: todos[editIndex - 1]?.description,
        completed: todos[editIndex - 1]?.completed,
      });
    } else {
      setTodoDetail({
        name: "",
        isNested: false,
        description: "",
        completed: false,
      });
    }
  }, [editIndex]); 
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex? 'Edit': 'Create'} Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onChange={handleChange} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Todo *</Form.Label>
              <Form.Control
                required
                type="text"
                id="name"
                placeholder="buy milk"
                defaultValue={todoDetail.name}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                checked={todoDetail?.isNested}
                id="isNested"
                label="Create Nested Todo"
              />
            </Form.Group>
            {todoDetail?.isNested && (
              <Form.Group className="mb-3">
                <Form.Label>Add Nested Todo Descrition</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  defaultValue={todoDetail?.description}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="completed"
                label="Completed"
                checked={todoDetail?.completed}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
