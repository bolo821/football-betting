import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../components/Loading';
import { useRouterContract } from '../hooks/useContract';
import { onBet } from '../actions';
import AdminRoute from '../AdminRoute';
import Home from './Home';
import Admin from './Admin';

const Index = () => {
	const dispatch = useDispatch();
	const { loading, loadingText } = useSelector(state => state.flow);
	const routerContract = useRouterContract();

	useEffect(() => {
		if (routerContract) {
			dispatch(onBet(routerContract));
		}
	}, [routerContract]);

	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} autoClose={5000} hideProgressBar={false} closeOnClick />
			<Loading loading={loading} loadingText={loadingText}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<AdminRoute path="/admin" component={Admin} />
					</Switch>
				</Router>
			</Loading>
		</>
	);
}

export default Index;