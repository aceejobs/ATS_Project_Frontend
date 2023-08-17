import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  @media (min-width: 1024px) {
    height: max-content;
  }
`;
