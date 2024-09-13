import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistor } from '../../redux/store';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader'; 
import css from './App.module.css';

const App = () => {
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






