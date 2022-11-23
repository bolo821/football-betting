import { useState } from 'react';

import { Stack, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

const SIconButton = styled(IconButton)({
    backgroundColor: '#291b6b',
    '&:hover': {
        backgroundColor: '#571ce0'
    }
});

const Pagination = props => {
    const { currentPage, setCurrentPage, totalCount, pageSize } = props;
    const [pageCount] = useState(Math.floor(totalCount / pageSize));

    const next = () => {
        setCurrentPage(Math.min(pageCount, currentPage+1));
    }

    const prev = () => {
        setCurrentPage(Math.max(0, currentPage-1));
    }

    const first = () => {
        setCurrentPage(0);
    }

    const last = () => {
        setCurrentPage(pageCount);
    }

    return (
        <Stack direction="row" spacing="5px" alignItems="center">
            <SIconButton onClick={first} sx={{  }}>
                <FirstPageIcon sx={{ fill: 'white' }} />
            </SIconButton>
            <SIconButton onClick={prev}>
                <NavigateBeforeIcon sx={{ fill: 'white' }} />
            </SIconButton>
            <Stack justifyContent="center" alignItems="center" padding="10px" backgroundColor="#571ce0" borderRadius="50%">
                <Typography variant="span" color="white" lineHeight="1">
                    {currentPage}
                </Typography>
            </Stack>
            <SIconButton onClick={next}>
                <NavigateNextIcon sx={{ fill: 'white' }} />
            </SIconButton>
            <SIconButton onClick={last}>
                <LastPageIcon sx={{ fill: 'white' }} />
            </SIconButton>
        </Stack>
    )
}

export default Pagination;