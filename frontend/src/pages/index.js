import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading';
import { onBet, onStatusUpdate, onClaimed, onMatchScoreUpdatd } from '../actions';
import AdminRoute from '../AdminRoute';
import WalletRoute from '../WalletRoute';
import Home from './Home';
import Admin from './Admin';
import History from './History';
import AddMatch from './AddMatch';

import BackImg from '../assets/images/background.png';

const Index = () => {
	const dispatch = useDispatch();
	const { loading, loadingText } = useSelector(state => state.flow);

	useEffect(() => {
		dispatch(onBet());
		dispatch(onStatusUpdate());
		dispatch(onClaimed());
		dispatch(onMatchScoreUpdatd());
	}, [dispatch]);

	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} autoClose={5000} hideProgressBar={false} closeOnClick />
			<Loading loading={loading} loadingText={loadingText}>
				<div className="background-container-rt">
					<div>
						<Router>
							<Switch>
								<Route exact path="/" component={Home} />
								<AdminRoute path="/admin" component={Admin} />
								<AdminRoute path="/addmatch" component={AddMatch} />
								<WalletRoute path="/history" component={History} />
								<Redirect to="/" />
							</Switch>
						</Router>
					</div>
				</div>
			</Loading>
		</>
	);
}

export default Index;