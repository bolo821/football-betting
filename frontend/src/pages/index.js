import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading';
import { onBet, onStatusUpdate, onClaimed, onMatchScoreUpdatd, onRefresh } from '../actions';
import AdminRoute from '../AdminRoute';
import WalletRoute from '../WalletRoute';
import Home from './Home';
import Collaterals from './Collaterals';
import Admin from './Admin';
import History from './History';
import AddMatch from './AddMatch';
import Trade from './Trade';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';

const Index = () => {
	const dispatch = useDispatch();
	const { loading, loadingText } = useSelector(state => state.flow);

	useEffect(() => {
		dispatch(onBet());
		dispatch(onStatusUpdate());
		dispatch(onClaimed());
		dispatch(onMatchScoreUpdatd());
		dispatch(onRefresh());
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
								<Route exact path="/trade" component={Trade} />
								<AdminRoute exact path="/admin" component={Admin} />
								<AdminRoute exact path="/addmatch" component={AddMatch} />
								<WalletRoute exact path="/history" component={History} />
								<WalletRoute exact path="/collaterals" component={Collaterals} />
								<WalletRoute exact path="/dashboard" component={Dashboard} />
								<WalletRoute exact path="/leaderboard" component={Leaderboard} />
								<Route path="/:referral" component={Home} />
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