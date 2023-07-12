import PropTypes from 'prop-types';
import { ContactItem, DeleteButton } from './Contact.styled';

export const Contact = ({ onDeleteContact, name, number, id }) => {
  const handleDelete = id => {
    onDeleteContact(id);
  };

  return (
    <ContactItem>
      <p>
        {name}: {number}
      </p>
      <DeleteButton
        type="button"
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete
      </DeleteButton>
    </ContactItem>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
