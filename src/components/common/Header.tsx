// src/components/common/Header.tsx
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/theme/colors';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  background-color: ${colors.white};
  border-bottom: 2px solid ${colors.builderBlueLight};
  box-shadow: 0 2px 4px ${colors.shadow};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoImage = styled.img`
  height: 100px;
  width: 100px;
`;

// const ActionsSection = styled.div`
//   display: flex;
//   align-items: center;
// `;

interface HeaderProps {
  logoSrc?: string;
  logoText?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  logoSrc
}) => {
  return (
    <HeaderContainer>
      <LogoSection>
        {logoSrc ? (
          <LogoImage src={logoSrc} alt="Logo" />
        ) : (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: colors.builderBlue,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            QuickBase
          </div>
        )}
      </LogoSection>
{/*       
      <ActionsSection>
      </ActionsSection> */}
    </HeaderContainer>
  );
};

export default Header;