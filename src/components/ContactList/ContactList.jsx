import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectContacts);  
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));  
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <Contact id={id} name={name} number={number} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

