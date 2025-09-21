import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #8caed3;
  border-radius: 5px;
  margin: 1rem;
  max-width: 50rem;
`;

const WrapperTitle = styled.h3`
  padding: 1rem;
  border-bottom: 2px solid #8caed3;
  background: #8caed3;
  color: #084d97;
`;

const WrapperContent = styled.div`
  padding: 1rem;
`;

const ComponentWrapper = ({ title, children }: Props): JSX.Element => {
  return (
    <Wrapper>
      <WrapperTitle>{title}</WrapperTitle>
      <WrapperContent>{children}</WrapperContent>
    </Wrapper>
  );
};

export default ComponentWrapper;
