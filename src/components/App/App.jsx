import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from '../../redux/store';
import { addContact, deleteContact, selectContacts } from '../../redux/contactsSlice';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import initialContacts from '../../contacts.json';
import css from './App.module.css';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (!savedContacts) {
      localStorage.setItem('contacts', JSON.stringify(initialContacts));
      initialContacts.forEach(contact => dispatch(addContact(contact)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );
    if (isDuplicate) {
      alert(`${newContact.name} or ${newContact.number} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = (value) => {
    dispatch(changeFilter(value));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <h1 className={css.title}>
        <FontAwesomeIcon icon={faBook} className={css.iconBook} />
        Phonebook
      </h1>
      <div className={css.container}>
        <div className={css.wrapper}>
          <ContactForm onAdd={handleAddContact} />
          <SearchBox value={filter} onSearch={handleChangeFilter} />
        </div>
        <ContactList contacts={visibleContacts} onDelete={handleDeleteContact} />
       </div>
    </PersistGate>
  );
}



