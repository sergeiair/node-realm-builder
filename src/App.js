import React, { Component } from 'react';

import CancellationRoot from './components/cancellation/cancellation.root.component';
import TopBar from './components/common/topBar.component';
import Footer from './components/common/footer.component';


class App extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <div className="py-5 main">
          <CancellationRoot/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
