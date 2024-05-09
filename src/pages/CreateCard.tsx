import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import { CardDto } from '../lib/dtos/card';
import { styled } from '@mui/system';
import { createCard } from '../lib/collection';

const Body = styled('div')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
    
});

const SearchHeader = styled('div')({
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0",
    gap: "10px",
});

const lineWidth = '40%';

const Form = styled('form')({
    display: "grid",
    gridTemplateColumns: `${lineWidth} ${lineWidth}`,
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "gold",
    width: "80vw",
    maxWidth: "800px",
    boxShadow: "0 0 10px black",
});

const Line = styled('div')({
    width: lineWidth,
    display: "flex",
    margin: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
});

const Label = styled('label')({
    fontSize: "14pt",
    fontWeight: "bold",
    margin: "10px",
});

const Input = styled('input')({
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid black",
    width: "200px",
    textAlign: "center",
});

const Button = styled('button')({
    padding: "10px",
    margin: "10px",
    width: "300px",
    textAlign: "center",
    fontSize: "14pt",
    backgroundColor: "gold",
    color: "black",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "black",
        color: "gold",
    },
});




/**
 * Step 3: Render a form and everything needed to be able to create a card
 */
export const CreateCard = () => {

    const [form, setForm] = React.useState<CardDto>({
        id: '',
        player: {
            id: '',
            firstname: '',
            lastname: '',
            birthday: '',
            image: '',
        }
    });

    const [isLoading, setLoading] = React.useState(true);
    const [canSend, setCanSend] = React.useState(false);

    const [dateOk, setDateOk] = React.useState(false);
    const [dateError, setDateError] = React.useState("");
    
    const [imageOk, setImageOk] = React.useState(false);
    const [imageError, setImageError] = React.useState("");

    const [nameOk, setNameOk] = React.useState(false);
    const [nameError, setNameError] = React.useState("");

    const [lastNameOk, setLastNameOk] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState("");
    
    useEffect(() => {
        // Validating form
        let canSend = true;

        if (!form.player.birthday) {
            canSend = false;
            setDateOk(false);
            setDateError("Date is required");
        } else if (form.player.birthday && !form.player.birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
            canSend = false;
            setDateOk(false);
            setDateError("Invalid date format");
        } else {
            const thisYear = new Date().getFullYear();
            const birthYear = new Date(form.player.birthday).getFullYear();
            const age = thisYear - birthYear;
            if (age < 12 || age > 120) {
                canSend = false;
                setDateOk(false);
                setDateError("Invalid date. Must be between 12 and 120 years old");
            } else {
                setDateOk(true);
            }
        }

        if (!form.player.image) {
            canSend = false;
            setImageOk(false);
            setImageError("Image is required");
        } else {
            setImageOk(true);
        }

        if (!form.player.firstname) {
            canSend = false;
            setNameOk(false);
            setNameError("First name is required");
        } else {
            setNameOk(true);
        }

        if (!form.player.lastname) {
            canSend = false;
            setLastNameOk(false);
            setLastNameError("Last name is required");
        } else {
            setLastNameOk(true);
        }

        setCanSend(canSend);
    }, [form]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSend) {
            return;
        }

        await createCard(form)
        .then((response) => {
            console.log(response);
            toast.success(response?.message || 'Created card');
            setTimeout(() => window.location.href = `/collection?search=${response.data.id}&type=id`, 2000);
        })
        .catch((error) => {
            console.error(error);
            toast.error(error?.message || 'Error creating card');
        });



        toast.success('Card created!');




    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            player: {
                ...form.player,
                [name]: value,
            }
        });
    }


    return (
        <Body>
            <SearchHeader>
                <h1>Create a Card</h1>
            </SearchHeader>
            <Form id='createCardForm' onSubmit={handleSubmit}>
                <Line>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input type="text" id="firstname" name="firstname" onChange={handleChange} />
                    {
                        nameOk ? null : <div style={{color:"red", width:"100%"}}>{nameError}</div>
                    }
                </Line>
                <Line>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input type="text" id="lastname" name="lastname" onChange={handleChange} />
                    {
                        lastNameOk ? null : <div style={{color:"red", width:"100%"}}>{lastNameError}</div>
                    }
                </Line>
                <Line>
                    <Label htmlFor="birthday">Birth Date</Label>
                    <Input type="date" id="birthday" name="birthday" onChange={handleChange} />
                    {
                        dateOk ? null : <div style={{color:"red", width:"100%"}}>{dateError}</div>
                    }
                </Line>
                <Line>
                    <Label htmlFor="image">Image</Label>
                    <Input type="text" id="image" name="image" onChange={handleChange} />
                    {
                        imageOk ? null : <div style={{color:"red", width:"100%"}}>{imageError}</div>
                    }
                </Line>
                <Line style={{width:"100%", gridColumn: "1 / -1"}}>
                    <Button type="submit" disabled={!canSend} >Create</Button>
                </Line>
            </Form>
        </Body>
    );
}
