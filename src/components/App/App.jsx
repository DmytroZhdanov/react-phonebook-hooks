import { useEffect } from 'react';
import { useState } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container, Message, Title1, Title2, Wrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    contactsLS && setContacts(contactsLS);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = newContact => {
    const matchedContact = contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (matchedContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const filterHandler = filterQuery => {
    setFilter(filterQuery);
  };

  const contactDeleteHandler = idToDelete => {
    setContacts(() => {
      const newContactsArr = [...contacts].filter(
        ({ id }) => id !== idToDelete
      );
      return newContactsArr;
    });
  };

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title1>Phonebook</Title1>
      <ContactForm onSubmit={formSubmitHandler} />
      <Title2>Contacts</Title2>
      <Wrapper>
        {contacts.length > 0 ? (
          <>
            <Filter filter={filter} onChange={filterHandler} />
            {filteredContacts.length > 0 ? (
              <ContactList
                contacts={filteredContacts}
                onDeleteContact={contactDeleteHandler}
              />
            ) : (
              <Message>
                Sorry, we didn't find any contacts matching your query
              </Message>
            )}
          </>
        ) : (
          <Message>You don't have any contacts yet</Message>
        )}
      </Wrapper>
    </Container>
  );
};
