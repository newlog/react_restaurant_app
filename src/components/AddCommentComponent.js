import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useForm } from 'react-hook-form';

const AddComment = ({
  isModalOpen,
  setModalVisibility,
  addCommentAction,
  dishId,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    addCommentAction(dishId, data.rating, data.name, data.comment);
  };

  const toggleCommentModal = () => {
    setModalVisibility(!isModalOpen);
  };

  const ContactErrorMessages = ({ errorMessage }) => {
    return (
      <FormFeedback>
        {errorMessage ? <div>{errorMessage}</div> : <div />}
      </FormFeedback>
    );
  };

  return (
    <Modal isOpen={isModalOpen}>
      <ModalHeader toggle={toggleCommentModal}>Submit Comment</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="select"
              name="rating"
              id="rating"
              innerRef={register()}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(errors.name ? { invalid: true } : {})}
              innerRef={register({
                required: 'Your name is required.',
                minLength: {
                  value: 3,
                  message: 'Name should be at least 3 characters.',
                },
                maxLength: {
                  value: 15,
                  message: 'Name should not be longer than 15 characters.',
                },
              })}
            />
            <ContactErrorMessages
              errorMessage={errors && errors.name ? errors.name.message : ''}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="comment">Comment</Label>
            <Input
              type="textarea"
              name="comment"
              id="comment"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(errors.comment ? { invalid: true } : {})}
              innerRef={register({
                required: 'Your forgot to write a comment.',
              })}
            />
            <ContactErrorMessages
              errorMessage={
                errors && errors.comment ? errors.comment.message : ''
              }
            />
          </FormGroup>
          <Button type="submit" value="submit" color="primary" className="mt-2">
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddComment;
