import React from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';

const StyledTag = styled(Tag)`
  width: 70px;
  height: 40px;
  margin: 10px;
  transition: transform 0.1s ease;
  text-align: center;
  font-size: 1.2rem;
  line-height: 40px;
  vertical-align: middle;

  &:hover {
    transform: scale(1.2);
  }
`;

interface TimeSlotProps {
  time: string;
  isDisabled: boolean;
  onClick: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, isDisabled, onClick }) => {
  return (
    <StyledTag
      color={isDisabled ? "#cecece" : "#01A0EC"}
      onClick={!isDisabled ? onClick : undefined}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', pointerEvents: isDisabled ? 'none' : 'auto' }}
    >
      {time}
    </StyledTag>
  );
};

export default TimeSlot;
