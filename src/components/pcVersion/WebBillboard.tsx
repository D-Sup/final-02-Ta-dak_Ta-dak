import { useLocation } from "react-router-dom";

import styled from "styled-components"

const WebBillboard = () => {

  const location = useLocation();

  const hideBillboardPaths = [
    '/splash',
    '/login',
    '/signup',
    '/signup/profile',
    '/introduce',
    '/feed',
    '/recommendfeed',
    '/profile'
  ]

  const hideBillboard = hideBillboardPaths.includes(location.pathname);

  return (
    <>
      {!hideBillboard &&
        <AreaOccupy>
        </AreaOccupy>
      }
    </>
  )
}

export default WebBillboard

const AreaOccupy = styled.div`
  width: 392px;
`;
