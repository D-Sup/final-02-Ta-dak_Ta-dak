import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserId = ({ id, loading }: { id: string, loading?: boolean }) => {
  return (
    <UserIdStyled>
      {
        loading ?
          <Skeleton baseColor={'var(--skeleton-color)'} width={100} style={{ marginTop: '5px' }} />
          :
          '@' + id
      }
    </ UserIdStyled>
  )
}

export default UserId

const UserIdStyled = styled.div`
    color: var(--text-color-2);
    font-size: var(--font--size-sm);
`;
