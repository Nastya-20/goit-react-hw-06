import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from '../../redux/store';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import initialContacts from '../../contacts.json';
import Loader from '../Loader/Loader'; 
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

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

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <h1 className={css.title}>
        <FontAwesomeIcon icon={faBook} className={css.iconBook} />
        Phonebook
      </h1>
      <div className={css.container}>
        <div className={css.wrapper}>
          <ContactForm />
          <SearchBox />
        </div>
        <ContactList />
      </div>
    </PersistGate>
  );
};

export default App;






