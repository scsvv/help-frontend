import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from '../../firebaseConfig';
import styled from 'styled-components';



function TableRow() {
    const [recipient, setRecipient] = useState([]);
    const recipientCollectionRef = collection(db, "recipients");
  
  
useEffect(() => {
    const getRecipient = async () => {
      const data = await getDocs(recipientCollectionRef);
      setRecipient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getRecipient();
  }, []);

  console.log(recipient)

return (
  <Tb>
    { recipient.map(el => (
      <div key={el.id}>
        ФИО: <span>{el.name} {el.surname} {el.fathers} </span>
        <br />
        Телефон: <span>{el.phone} </span>
        <br /> 
        Адресс: <span>{el.city},  {el.address} </span>
        <br />
        Дети до 3 лет  - <span>{el.child_less} </span> 
        <br />
        Дети 3 - 18  - <span>{el.child_more}</span>
      </div>
    )) }
  </Tb>
  )
}

export default TableRow

const Tb = styled.div`
  padding-top: 10px;
  & > div {
    border: 1px solid black;  
    margin-bottom: 10px;
    padding: 2px;
  }
`