import { Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';

const LTypography = styled(Typography)({
    '@media screen and (max-width: 500px)': {
        fontSize: '24px',
        marginBottom: '10px',
    }
});

const DTypography = styled(Typography)({
    '@media screen and (max-width: 500px)': {
        fontSize: '16px',
    }
});

const DCard = (props) => {
    const { Image, label, description, bgColor } = props;

    return (
        <Card sx={{backgroundColor: bgColor || '#120f54', borderRadius: '20px', padding: '20px', height: '100%'}}>
            <Stack direction="row" alignItems="center" justifyContent="center" height="100%">
                <img src={Image} alt="total" width="96px" />
                <Stack marginLeft='16px'>
                    <LTypography variant="h4">{label}</LTypography>
                    <DTypography color="var(--head-color)">{description}</DTypography>
                </Stack>
            </Stack>
        </Card>
    )
}

export default DCard;