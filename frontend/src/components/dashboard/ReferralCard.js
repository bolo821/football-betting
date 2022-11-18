import { useSelector } from 'react-redux';
import { Card, Stack, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DCard from './DCard';
import ReferralCountImg from '../../assets/images/referral-count.png';
import ReferralEarningImg from '../../assets/images/referral-earning.png';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useWeb3React } from '@web3-react/core';

const RCard = styled(Card)({
    padding: '40px',
    height: '100%',
    marginTop: '30px',
    '@media screen and (max-width: 465px)': {
        padding: '20px',
    }
});

const ReferralCard = (props) => {
    const { account } = useWeb3React();
    const { count, profit } = useSelector(state => state.referral);

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
                        <input type="text" value={`${process.env.REACT_APP_URL}/?referrer=${account}`} readOnly />
                        <IconButton>
                            <CopyToClipboard text={`${process.env.REACT_APP_URL}/?referrer=${account}`}>
                                <ContentCopyIcon sx={{fill: 'white'}} />
                            </CopyToClipboard>
                        </IconButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <DCard Image={ReferralCountImg} label={count} description="Total Referral Count" bgColor="#322a71" />
                    </div>
                    <div className="col-md-6 col-12">
                        <DCard Image={ReferralEarningImg} label={`${profit} ETH`} description="Total Referral Profit" bgColor="#322a71" />
                    </div>
                </div>
            </Stack>
        </RCard>
    )
}

export default ReferralCard;