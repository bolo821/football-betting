import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Dialog, IconButton, Stack, List, ListItem,Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import config from '../config';

const MobileMenu = ({ isOpen, setIsOpen, path }) => {
    const history = useHistory();
    const { account } = useWeb3React();

    return (
        <Dialog
            onClose={() => setIsOpen(false)}
            open={isOpen}
            classes={{
                paper: "mobile-menu-paper-rt"
            }}
            sx={{'& .mobile-menu-paper-rt': {backgroundColor: '#382590', padding: '30px', width: '100vw', maxWidth: '100vw', height: '100vh', margin: '0', maxHeight: '100vh'}}}
        >
            <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={() => setIsOpen(false)}>
                    <CloseIcon sx={{fill: 'white'}} />
                </IconButton>
            </Stack>
            <Stack marginTop="30px">
                <List>
                    <ListItem className="d-flex justify-content-center" >
                        <Typography
                            onClick={() => {history.push('/'); setIsOpen(false)}}
                            fontSize="20px"
                            color={path === '/' ? 'var(--head-color)' : 'white'}
                        >
                            Home
                        </Typography>
                    </ListItem>
                    <ListItem className="d-flex justify-content-center" >
                        <Typography
                            onClick={() => {history.push('/trade'); setIsOpen(false)}}
                            fontSize="20px"
                            color={path === '/trade' ? 'var(--head-color)' : 'white'}
                        >
                            Trade
                        </Typography>
                    </ListItem>
                    <ListItem className="d-flex justify-content-center">
                        <a className="nav-link text-white" onClick={() => setIsOpen(false)} href="https://wcibets.com" target="_blank" rel="noreferrer noopener" style={{fontSize: '20px'}}>
                            PvP
                        </a>
                    </ListItem>
                    { account ?
                        <>
                            <ListItem className="d-flex justify-content-center">
                                <Typography
                                    onClick={() => {history.push('/dashboard'); setIsOpen(false)}}
                                    fontSize="20px"
                                    color={path === '/dashboard' ? 'var(--head-color)' : 'white'}
                                >
                                    Dashboard
                                </Typography>
                            </ListItem>
                            {/* <ListItem className="d-flex justify-content-center">
                                <Typography
                                    onClick={() => {history.push('/collaterals'); setIsOpen(false)}}
                                    fontSize="20px"
                                    color={path === '/collaterals' ? 'var(--head-color)' : 'white'}
                                >
                                    Collaterals
                                </Typography>
                            </ListItem> */}
                            <ListItem className="d-flex justify-content-center">
                                <Typography
                                    onClick={() => {history.push('/history'); setIsOpen(false)}}
                                    fontSize="20px"
                                    color={path === '/history' ? 'var(--head-color)' : 'white'}
                                >
                                    History
                                </Typography>
                            </ListItem>
                            <ListItem className="d-flex justify-content-center">
                                <Typography
                                    onClick={() => {history.push('/leaderboard'); setIsOpen(false)}}
                                    fontSize="20px"
                                    color={path === '/leaderboard' ? 'var(--head-color)' : 'white'}
                                >
                                    Leaderboard
                                </Typography>
                            </ListItem>
                        </> :
                        <></>
                    }
                    { (account === config.adminWalletAddress || account === config.oldAdminWalletAddress) &&
                        <ListItem className="d-flex justify-content-center">
                            <Typography
                                onClick={() => {history.push('/admin'); setIsOpen(false)}}
                                fontSize="20px"
                                color={path === '/admin' ? 'var(--head-color)' : 'white'}
                            >
                                Admin
                            </Typography>
                        </ListItem>
                    }
                </List>
            </Stack>
        </Dialog>
    );
}

export default MobileMenu;