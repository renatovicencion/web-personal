import { BrowserRouter, Route, Switch } from "react-router-dom"; 
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';
import './App.scss';


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

function RouteWithSubRoutes(route) {
  return (
    <Route  
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );  
};

export default App;
