import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectContacts);  
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));  
  };

  return (
    <ul className={css.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <Contact id={id} name={name} number={number} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

