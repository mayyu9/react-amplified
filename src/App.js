import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import TodoApp from './ToDoApp/Todo';
import EmailSES from './Email/EmailSES';


const App = () => {

  return (
    <div style={styles.container}>
      <Router>
      <header className="App-header">
        <menu>
          <ul>
            <li><Link to="/">TodoApp</Link></li>
            <li><Link to="/email">Email</Link></li>
          </ul>
        </menu>
    <h2>AWS Learning</h2>
    <AmplifySignOut />
</header>
<Switch>
<Route exact path="/" component={TodoApp} />
<Route path="/email" component={EmailSES} />
</Switch>
      </Router>
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }
}

export default withAuthenticator(App);