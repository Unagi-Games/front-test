import React from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <Select value={selectedOption} onChange={onChange}>
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default Dropdown;
