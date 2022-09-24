import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import Sign from './Sign';
import { useForm } from "react-hook-form";
import { Button, FormControl } from '@mui/material';
import axios from 'axios';

import { db } from '../../firebaseConfig';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const Form = () => {
    const recipientCollectionRef = collection(db, "recipients");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setState(data);
        setStep(true)
    }
    const [step, setStep] = useState(false);
    const [type_getter, setType] = useState([]);
    const [state, setState] = useState({});
    const [sign, setSign] = useState({});
    
    function handleSend() {
        console.log(JSON.stringify({...state, sign: sign.signature}))
        /*axios.post('http://127.0.0.1:4444/recipient/',  {
            "name": state.name, 
            "surname": state.surname, 
            "fathers": state.fathers, 
            "phone": state.phone, 
            "church": state.church, 
            "city": state.city, 
            "child_less": state.child_less, 
            "child_more": state.child_more, 
            "sign": sign.signature, 
            "address": state.address, 
            "type_list": type_getter[0] || "Другое"
        })*/
    }

    const createRecipient = async () => {
        try {
            await addDoc(recipientCollectionRef, {
                name: state.name, 
                surname: state.surname, 
                fathers: state.fathers, 
                phone: state.phone, 
                church: state.church, 
                city: state.city, 
                child_less: state.child_less, 
                child_more: state.child_more, 
                address: state.address, 
                type_list: type_getter[0] || "Другое"
            });
        } catch (e) {
            alert(e.message)
        }
        
    }

    function typeChoose(e) {
        const value = e.target.value
        const alt = type_getter;
        if(type_getter.indexOf(value) != -1){
          let _el = type_getter.indexOf(value);
          alt.splice(_el, 1)
          setType(alt)
          console.log(alt)
        }
        else if (type_getter.indexOf(value) === -1) {  
            setType([...type_getter, value]);
        }
    }
    console.log(type_getter)
  return (
    <Box sx={{ flexGrow: 1 }} className="px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box  className="my-5">
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                <TextField 
                    required
                    autoComplete='off'
                    id="surname" 
                    label="Фамилия" 
                    variant="standard"
                    className="flex"
                    {...register("name")}
                />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                    required
                    autoComplete='off'
                    id="name"     
                    label="Имя" 
                    variant="standard" 
                    className="flex"
                    {...register("surname")}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                    required
                    autoComplete='off'
                    id="fthers_name" 
                    label="Отчество" 
                    variant="standard" 
                    className="flex"
                    {...register("fathers")}
                    />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                        required
                        id="city" 
                        label="Город" 
                        variant="standard"
                        className="flex" 
                        {...register("city")}
                        />   
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                        required
                        id="church" 
                        label="Церковь" 
                        variant="standard"
                        className="flex" 
                        {...register("church")}
                        />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                        required
                        autoComplete='off'
                        id="adress" 
                        label="Адрес" 
                        variant="standard"
                        className="flex" 
                        {...register("address")}
                        />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                        required
                        autoComplete='off'
                        id="phone" 
                        label="Номер телефона" 
                        variant="standard"
                        type="number" 
                        className="flex"
                        {...register("phone")}
                    />
                </Grid>
                {
                /*
                <Grid xs={12} md={4}>
                    <TextField 
                        id="pasport" 
                        autoComplete='off'
                        label="Паспорт" 
                        variant="standard"
                        className="flex" 
                        //{...register("passport")}
                        />
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField 
                        id="inn" 
                        autoComplete='off'
                        label="ИНН" 
                        variant="standard"
                        type="number" 
                        className="flex"
                        //{...register("inn")}
                    />
                
                
                </Grid>
                */}
                <Grid xs={12} md={4}>
                    <Box className='flex md:justify-between justify-evenly'>
                        <TextField 
                            autoComplete='off'
                            id="outlined-basic" 
                            label="Дети до 3" 
                            variant="standard" 
                            type="number"
                            {...register("child_less")}
                            />
                        <TextField 
                            autoComplete='off'
                            id="outlined-basic" 
                            label="Дети 3-18" 
                            type="number"
                            variant="standard"
                            {...register("child_more")}
                            />
                    </Box>
                </Grid>
            </Grid>   
        </Box>
        <Box className='flex flex-col'>
            <FormControl onChange={typeChoose}>
                <FormControlLabel
                    className='grow'
                    value="Многодетная семья"
                    label="Многодетная семья"
                    control={<Checkbox  />}
                />
                <FormControlLabel
                    className='grow'
                    label="Ивалид"
                    value="Ивалид"
                    control={<Checkbox  />}
                />
                <FormControlLabel
                    className='grow'
                    label="Пенсионер"
                    value="Пенсионер"
                    control={<Checkbox  />}
                />
                <FormControlLabel
                    className='grow'
                    label="Безработный"
                    value="Безработный"
                    control={<Checkbox  />}
                />
                <FormControlLabel
                    className='grow'
                    label="Малообеспеченый"
                    value="Малообеспеченый"
                    control={<Checkbox  />}
                />
                <FormControlLabel
                    className='grow'
                    label="Другое"
                    value="Другое"
                    control={<Checkbox  />}
                />
            </FormControl>
        </Box>
        <Box className='flex justify-center py-5'>
            <Button variant="outlined" type='submit' color="success">Потдердить</Button>
        </Box>
        </form>
        {
            // step && ( <Sign state={sign} setState={setSign}/>) 
        }

        {step && <> <Button onClick={createRecipient}>Отправить</Button> </>}
    </Box>

  )
}

export default Form