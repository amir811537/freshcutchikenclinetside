import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* full screen */
  width: 100%;
  gap: 10px;

  .dot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
  }

  .dot:nth-child(1) {
    background: #ff4d6d; /* pink */
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    background: #1ecbe1; /* cyan */
    animation-delay: 0.2s;
  }
  .dot:nth-child(3) {
    background: #3ddc97; /* green */
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    from {
      transform: translateY(0);
      opacity: 0.7;
    }
    to {
      transform: translateY(-20px);
      opacity: 1;
    }
  }
`;

export default Loader;
