import React from 'react';
import {StyledNoResultFoundWrapper} from './noResultFound.styled';
import {TEXT} from '../../common/constants';
import {Icon} from 'semantic-ui-react';
function noResultFoundComponent() {
    return (
        <StyledNoResultFoundWrapper>
            <Icon name="cloudversify" size={'massive'} />
            {TEXT.NO_RESULT_FOUND}
        </StyledNoResultFoundWrapper>
    );
}

export default noResultFoundComponent;
