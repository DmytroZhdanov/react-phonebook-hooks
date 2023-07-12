import PropTypes from 'prop-types'
import { Input, Label } from 'components/ContactForm/ContactForm.styled';

export const Filter = ({ filter, onChange }) => {
  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <>
      <Label htmlFor="input-search">Find contacts by name</Label>
      <Input
        type="text"
        id="input-search"
        onChange={handleChange}
        name="filter"
        value={filter}
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}