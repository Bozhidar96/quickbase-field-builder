import styled from "styled-components";
import { ReactNode } from "react";
import colors from "../../styles/theme/colors";

interface Props {
  title: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${colors.builderBlueLight};
  border-radius: 5px;
  margin: 1rem;
  max-width: 50rem;
`;

const WrapperTitle = styled.h3`
  padding: 1rem;
  border-bottom: 2px solid ${colors.builderBlueLight};
  background: ${colors.builderBlueLight};
  color: ${colors.builderBlue};
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
