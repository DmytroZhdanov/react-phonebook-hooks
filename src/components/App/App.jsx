import { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container, Message, Title1, Title2, Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  formSubmitHandler = newContact => {
    const matchedContact = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (matchedContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  filterHandler = filterQuery => {
    this.setState({ filter: filterQuery });
  };

  contactDeleteHandler = idToDelete => {
    this.setState(prevState => {
      const newContactsArr = [...prevState.contacts].filter(
        ({ id }) => id !== idToDelete
      );
      return { contacts: newContactsArr };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <Container>
        <Title1>Phonebook</Title1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Title2>Contacts</Title2>
        <Wrapper>
          {this.state.contacts.length > 0 ? (
            <>
              <Filter
                filter={this.state.filter}
                onChange={this.filterHandler}
              />
              {filteredContacts.length > 0 ? (
                <ContactList
                  contacts={filteredContacts}
                  onDeleteContact={this.contactDeleteHandler}
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
  }
}
