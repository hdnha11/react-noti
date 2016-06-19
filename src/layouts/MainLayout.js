import React from 'react';

import Header from '../components/Header';

class MainLayout extends React.Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
