import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading';
import { onBet } from '../actions';
import AdminRoute from '../AdminRoute';
import WalletRoute from '../WalletRoute';
import Home from './Home';
import Admin from './Admin';
import History from './History';

const Index = () => {
	const dispatch = useDispatch();
	const { loading, loadingText } = useSelector(state => state.flow);

	useEffect(() => {
		dispatch(onBet());
	}, [dispatch]);

	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} autoClose={5000} hideProgressBar={false} closeOnClick />
			<Loading loading={loading} loadingText={loadingText}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<AdminRoute path="/admin" component={Admin} />
						<WalletRoute path="/history" component={History} />
					</Switch>
				</Router>
			</Loading>
		</>
	);
}

export default Index;