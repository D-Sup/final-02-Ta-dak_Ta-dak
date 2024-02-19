import styled from 'styled-components'

const UserId = ({ id }: { id: string }) => {
  return (
    <UserIdStyled>
      @ {id}
    </ UserIdStyled>
  )
}

export default UserId

const UserIdStyled = styled.div`
    color: var(--text-color-2);
    font-size: var(--font--size-sm);
`;
