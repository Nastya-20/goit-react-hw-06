import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';  
import css from './Contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();  
  
  const handleDelete = () => {
    dispatch(deleteContact(id)); 
  };

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.infoGroup}>
          <FontAwesomeIcon className={css.icon} icon={faUser} />
          <p className={css.name}>{name}</p>
        </div>
        <div className={css.infoGroup}>
          <FontAwesomeIcon className={css.icon} icon={faPhone} />
          <p className={css.number}>{number}</p>
        </div>
      </div>
      <button className={css.btn} onClick={handleDelete}>Delete</button>
    </div>
  );
}
