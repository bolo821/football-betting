import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    URI_AVAILABLE,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import Config from "../config"
import {
    Box,
    List,
    Link,
    Dialog,
    Tooltip,
    ListItem,
    IconButton,
    ListItemIcon,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import { Wallets, ConnectedWallet } from "../constants/wallets";

import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from '@mui/icons-material/Replay';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';

import { walletconnect } from "../constants/connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";

import config from "../config";
import { setUserWallet } from "../actions";

const ConnectWalletModal = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const triedEager = useEagerConnect();
    const {
        activate,
        active,
        account,
        deactivate,
        connector,
        error,
        setError,
    } = useWeb3React();

    const [activatingConnector, setActivatingConnector] = useState(false);
    const [isSelectingWallet, setIsSelectingWallet] = useState(true);
    const cWallet = ConnectedWallet();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    useEffect(() => {
        const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useEffect(() => {
        if (account) {
            dispatch(setUserWallet(account));
        }
    }, [account]);

    useInactiveListener(!triedEager);

    const onConnectWallet = async (item) => {
        setActivatingConnector(item.connector);
        setIsSelectingWallet(false);
        await activate(item.connector);
    };

    const onDeactiveWallet = () => {
        setIsSelectingWallet(true);
        deactivate(true);
    };

    const retryConnect = async (activating) => {
        setError(null);
        if (window.ethereum) {
            try {
                await window.ethereum
                    .request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: `0x${Config.netId.toString(16)}` }],
                    })
                    .then(() => {
                        toast.success(
                            "You have successfully changed to Ethereum main network."
                        );
                    })
                    .catch((error) => {
                        toast.error(error.toString());
                    });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    try {
                        window.ethereum
                            .request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: `0x${Config.netId.toString(16)}`,
                                        chainName: "Ethereum Mainnet",
                                        rpcUrls: [
                                            Config.rpcUrl,
                                        ],
                                        nativeCurrency: {
                                            name: Config.nativeCoin.name,
                                            symbol: Config.nativeCoin.symbol,
                                            decimals: Config.nativeCoin.decimal,
                                        },
                                        blockExplorerUrls: [
                                            Config.blockExplorer,
                                        ],
                                    },
                                ],
                            })
                            .then(() => {
                                toast.success(
                                    "You have successfully changed to Ethereum Main Network."
                                );
                            })
                            .catch((error) => {
                                toast.error(error.toString());
                            });
                    } catch (addError) {
                        
                    }
                }
            }
        }

        onConnectWallet(activating);
    };
    const changeWallet = (error) => {
        if (!error) {
            return true;
        } else {
            setError(null);
            setIsSelectingWallet(true);
        }
    }
    const handleClose = () => {
        setIsOpen(false);
    };
    const getErrorMessage = (error) => {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
            classes={{
                paper: "cwallet-paper"
            }}
            sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', '& .cwallet-paper': {backgroundColor: '#382590', padding: '30px', width: '350px'}}}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="30px">
                <Typography variant="h5" color="white" fontSize="20px">
                    {!active ? "Select Wallet" : "Your Account"}
                </Typography>
                <IconButton
                    sx={{padding: '0'}}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    <CloseIcon sx={{fill: 'white'}} />
                </IconButton>
            </Stack>
            <Box padding="0">
                {active && (
                    <List>
                        <ListItem sx={{padding: 0, marginBottom: '20px', justifyContent: 'space-between'}}>
                            <Stack direction="row" alignItems="center">
                                <ListItemIcon className="symbol">
                                    <img src={cWallet.logo} alt={cWallet.name} style={{ maxWidth: '36px' }} />
                                </ListItemIcon>
                                <Typography color="white">{`Connected to ${cWallet.name}`}</Typography>
                            </Stack>
                            <Tooltip arrow title="Disconnect wallet">
                                <IconButton size="small" onClick={onDeactiveWallet}>
                                    <LowPriorityRoundedIcon sx={{fill: 'white'}} />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        <ListItem sx={{padding: 0, justifyContent: 'space-between'}}>
                            <Stack direction="row" alignItems="center">
                                <ListItemIcon className="symbol">
                                    <AccountBalanceWalletRoundedIcon sx={{fill: 'white'}} />
                                </ListItemIcon>
                                <Typography color="white">
                                    {`${account.substring(0, 5)}...${account.substring(account.length - 3)}`}
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Link
                                    href={`${config.blockExplorer}/address/${account}`}
                                    target="_blank"
                                    underline="none"
                                >
                                    <Tooltip arrow title="View on explorer">
                                        <IconButton size="small">
                                            <LaunchRoundedIcon sx={{fill: 'white'}} />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                <CopyToClipboard
                                    text={account}
                                >
                                    <Tooltip arrow title="Copy address">
                                        <IconButton size="small">
                                            <AssignmentTurnedInRoundedIcon sx={{fill: 'white'}} />
                                        </IconButton>
                                    </Tooltip>
                                </CopyToClipboard>
                            </Stack>
                        </ListItem>
                    </List>
                )}
                {
                    !active && (() => {
                        if (isSelectingWallet) {
                            return (
                                <List sx={{'& > li:not(:last-child)': {marginBottom: '20px'}}}>
                                    {Wallets.map((item, idx) => {
                                        return (
                                            <ListItem
                                                key={idx}
                                                padding="0"
                                                sx={{cursor: 'pointer'}}
                                                onClick={() => onConnectWallet(item)}
                                            >
                                                <ListItemIcon className="symbol">
                                                    <img
                                                        src={item.logo}
                                                        alt={item.logo}
                                                        width="30px"
                                                    />
                                                </ListItemIcon>
                                                <Typography color="white">{item.title}</Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            )
                        } else if (!isSelectingWallet) {
                            const activating = Wallets.find(item => (item.connector === activatingConnector || item.connector === connector));
                            return (
                                <List>
                                    <ListItem sx={{padding: 0, marginBottom: '20px'}}>
                                        <ListItemIcon>
                                            {error ? (
                                                <IconButton>
                                                    <WarningRoundedIcon sx={{fill: 'white'}} />
                                                </IconButton>
                                            ) : <CircularProgress sx={{fill: 'white'}} />}
                                        </ListItemIcon>
                                        <Typography color="white">
                                            {error ? getErrorMessage(error) : "Initializing..."}
                                        </Typography>
                                        {
                                            error && (
                                                <IconButton onClick={() => retryConnect(activating)}>
                                                    <ReplayIcon sx={{fill: 'white'}} />
                                                </IconButton>
                                            )
                                        }
                                    </ListItem>
                                    <ListItem
                                        className="item activating-item"
                                        onClick={() => changeWallet(error)}
                                        sx={{padding: 0, cursor: 'pointer'}}
                                    >
                                        <ListItemIcon className="symbol">
                                            <img
                                                src={activating ? activating.logo : ""}
                                                alt={activating ? activating.logo : ""}
                                                width="30px"
                                            />
                                        </ListItemIcon>
                                        <Typography color="white">
                                            {activating ? activating.title : ""}
                                            <br />
                                            <font color="#AAAAAA">{activating ? activating.description : ""}</font>
                                        </Typography>
                                    </ListItem>
                                </List>
                            )
                        }
                    })()
                }
            </Box>
        </Dialog>
    );
};

export default ConnectWalletModal;
