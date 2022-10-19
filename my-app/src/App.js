import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
  // const name = 'Peter'
  // const x = false
  return (
    <div className="container">
      {/*<h1>{ name }</h1>
      { 1 + 1 }</p>
  <p>Condition { x ? "oui" : "no" }</p>*/}
        <Header/>
        <Tasks/>
    </div>
  );
}

export default App;
