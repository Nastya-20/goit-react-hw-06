import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Too short, min 3 letters!')
    .max(50, 'Too long, max 50 letters!')
    .required('This field is required!'),
  userPhone: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Must be exactly 7 digits separated by dashes')
    .required('This field is required!'),
});

export default function ContactForm({ onAdd }) {
  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.userName,
      number: values.userPhone,
    };
    onAdd(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        userName: '',
        userPhone: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor="userName">Name</label>
          <Field className={css.name} type="text" name="userName" id="userName" placeholder="Enter name..."/>
          <ErrorMessage name="userName" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label} htmlFor="userPhone">Number</label>
          <Field className={css.phone} type="text" name="userPhone" id="userPhone" placeholder="Enter number..."/>
          <ErrorMessage name="userPhone" component="span" className={css.error} />
        </div>
        <button className={css.add} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}


