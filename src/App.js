import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

import awsExports from "./1aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  const editTodo = (event, todo, index) => {
    event.preventDefault();
    alert('todo: ', todo, index);
  };

  async function deleteTodo1 (event, index) {
    try{
      event.preventDefault();
      const todo = [...todos ];
      const updatedTodo = todo.filter((x,i) => i !== index);
      setTodos(updatedTodo);
      await API.graphql(graphqlOperation(deleteTodo, {input: updatedTodo}));
    } catch(err) {
      console.log('error in deleting todo: ', err);
    } 
  };

  return (
    <div style={styles.container}>
      <header className="App-header">
    <AmplifySignOut />
    <h2>Todos APP from dev branch</h2>
</header>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      <hr />
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <span>
            <p style={styles.todoDescription}>{todo.description}</p>
            <button type='button' onClick={(e) => editTodo(e,todo, index)}>Edit</button>
            <button type='button' onClick={(e) =>deleteTodo1(e, index)} >Delte</button>
            </span>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  border: '1px solid red', marginBottom: 15, marginTop: 10 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);