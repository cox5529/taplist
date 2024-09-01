import React from 'react';

import Button from '../../../../shared/components/buttons/Button';

interface Props {
  targetName: string;
  current?: string;
  click?: () => void;
}

const AssignmentButton = (props: Props) => {
  return (
    <Button click={props.click}>
      Assign to {props.targetName}
      <br />
      Current: {props.current ? props.current : 'None'}
    </Button>
  );
};

export default AssignmentButton;
