import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Tabs } from './components/Tabs/Tabs';
import { BasketPage } from './pages/Basket/BasketPage';
import { DiscountPage } from './pages/Discount/DiscountPage';
import { ShopPage } from './pages/Shop/ShopPage';

const routes = [
    {
        name: 'Shop',
        path: '/shop',
        component: ShopPage
    },
    {
        name: 'Discounts',
        path: '/discounts',
        component: DiscountPage
    },
    {
        name: 'My Basket',
        path: '/basket',
        component: BasketPage
    },
    {
        path: '/',
        redirect: '/shop',
  },
]

const App = () => {
    return (
        <div className="App"
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.5)),
                url(${process.env.REACT_APP_MEDIA_HOST}/media/background.jpeg)`,
            }}
        >
            <Router basename='/'>
                <Tabs tabs={routes} />
                <Switch>
                    {routes.map((route: any, i: number) =>
                        (route.redirect
                            ? <Redirect
                                key={i}
                                exact
                                from={route.path}
                                to={route.redirect}
                            />
                            : <Route
                                key={i}
                                path={route.path}
                                render={(props) => 
                                    <route.component {...props} />
                                }
                            />
                        ))
                    }
                </Switch>
            </Router>
        </div>
    );
}

export default App;
