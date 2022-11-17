import { Card, Stack, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DCard from './DCard';
import ReferralCountImg from '../../assets/images/referral-count.png';
import ReferralEarningImg from '../../assets/images/referral-earning.png';
import { CopyToClipboard } from "react-copy-to-clipboard";

const RCard = styled(Card)({
    padding: '40px',
    height: '100%',
    marginTop: '30px',
    '@media screen and (max-width: 465px)': {
        padding: '20px',
    }
});

const ReferralCard = (props) => {
    return (
        <RCard sx={{borderRadius: '20px', backgroundColor: '#120f54'}}>
            <Stack>
                <Typography variant='h5'>
                    Refer to others to earn referral profit.
                </Typography>
                <Typography variant="p" color="#AAAAAA" fontSize="16px">
                    You will get 0.3 ETH if you refer this betting platform to other and he bets more than 5 ETH.
                </Typography>
                <div className="referral-bar">
                    <p>My Referral Link</p>
                    <div className="input-area">
                        <input type="text" value="https://wcibets.club/refer/1" readOnly />
                        <IconButton>
                            <CopyToClipboard text="https://wcibets.club/refer/1">
                                <ContentCopyIcon sx={{fill: 'white'}} />
                            </CopyToClipboard>
                        </IconButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <DCard Image={ReferralCountImg} label="0" description="Total Referral Count" bgColor="#322a71" />
                    </div>
                    <div className="col-md-6 col-12">
                        <DCard Image={ReferralEarningImg} label="0 ETH" description="Total Referral Profit" bgColor="#322a71" />
                    </div>
                </div>
            </Stack>
        </RCard>
    )
}

export default ReferralCard;