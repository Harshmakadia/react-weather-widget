import React from 'react';
import {Icon, Input} from 'semantic-ui-react';

const InputExampleInput = (props: {
    placeholder: String;
    onChange: any;
    onClearClick: any;
    value: String;
}) => {
    return (
        <Input
            placeholder={props.placeholder}
            onChange={props.onChange}
            icon={<Icon name="remove" link onClick={props.onClearClick} />}
            value={props.value}
            focus
        />
    );
};

export default InputExampleInput;
