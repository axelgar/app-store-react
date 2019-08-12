import React, {Component} from 'react';
import appStoreService from '../services/app-store-service.js';

class AppList extends Component {
  state = {
    apps: [],
  };

  componentDidMount() {
    appStoreService.getAllApps()
    .then(response => {
      console.log(response);
      this.setState({
       apps: response.data.listOfApps
      })
    })
  }

  handleDeleteClick = (id) => {
    appStoreService.deleteOneApp(id)
    .then(() => {
      const filteredApps = this.state.apps.filter((singleApp) => {
        return singleApp._id !== id
      })
      this.setState({
        apps: filteredApps,
      })
    })
  }


  render() {
    const {apps} = this.state;
    return (
      <div>
        <h1>App List</h1>
        <section className='list-container'>
        {apps.length > 0 ? apps.map((app) => {
          return (
            <article key={app._id} className='app-container'>
              <div className='image-container'>
               <img src={app.image} alt={app.name}/>
              </div>
              <h3>{app.name}</h3>
              <p>{app.date}</p>
              <p>{app.price} €</p>
              <button onClick={() => {
                this.handleDeleteClick(app._id)
              }}>X</button>
            </article>
          )
        }) : <p>Loading...</p>}
        </section>
      </div>
    );
  }
}

export default AppList;
