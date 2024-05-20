import React from 'react';
import './CreateCard.css';
import styled from 'styled-components';
import { useCreatePlayer } from '../hooks/useCreatePlayer';
import { Loader } from '../components/loader';
import { ErrorView } from '../components/errorview';
import { useFormHook } from '../hooks/useFormHook';
import Modal from '../components/modals';


const Container = styled.div`
    background-color: #F0F0F0;
    width:400px;
    margin: 20px auto;
`
const Title = styled.div`
    text-align: center;
`

const Form = styled.form`
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:auto;
    grid-gap:10px;
    padding: 20px
`

const FormField = styled.div`
    display:flex;
    flex-direction:column;
`

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-right: 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

interface CreateCardProps {
  retrigger: () => void;
}

export const CreateCard = (props:CreateCardProps) => {

    const {retrigger} = props
    const {submitPlayer,submitting,error,showPopup,setshowPopup} = useCreatePlayer(retrigger);
    const {values,handleChange,errors,handleSubmit,touched} = useFormHook(submitPlayer);

    return (

       <>

      <ButtonContainer>
      <Button onClick={() => setshowPopup(true)}>Add Player</Button>
      </ButtonContainer>

       <Modal show={showPopup} onClose={() => setshowPopup(false)}>
        <Container>
          <Title>
           <h2>Enter Player Info</h2>
          </Title>

          <Loader visible={submitting}/>

          {error && <ErrorView message={'Unable to Create Player'}/>}
          
          <Form onSubmit={handleSubmit}>

          <FormField>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder='Enter First Name'
            value={values.firstname}
            onChange={handleChange}
          />
          {touched.firstname && errors.firstname && (
            <div className="error">{errors.firstname}</div>
          )}
          </FormField>

          <FormField>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder='Enter Last Name'
            value={values.lastname}
            onChange={handleChange}
          />
          {touched.lastname && errors.lastname && (
            <div className="error">{errors.lastname}</div>
          )}
          </FormField>

          <FormField>
          <label htmlFor="name">Date Of Birth</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={values.birthday}
            onChange={handleChange}
          />
          {touched.birthday && errors.birthday && (
            <div className="error">{errors.birthday}</div>
          )}
          </FormField>

          <FormField>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder='Enter Image URL'
            value={values.image}
            onChange={handleChange}
          />
          {touched.image && errors.image && (
            <div className="error">{errors.image}</div>
          )}

          </FormField>

          <div className="form-field btn">
           <input type="submit" name="submit" className="submit" value="Create"></input>
          </div>
          
          </Form>

        </Container>
       </Modal>

       </>

        
    )

};
