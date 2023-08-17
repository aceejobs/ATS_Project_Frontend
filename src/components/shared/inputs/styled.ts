import styled from 'styled-components';

export const MainInput = styled.input<{
  error?: boolean | string;
  type: string;
  value: string | number | readonly string[] | undefined;
}>`
  border-color: transparent;

  box-shadow: none;
  &:focus {
    border-color: #0017b7;
    background-color: transparent;
    box-shadow: none;
  }
`;
