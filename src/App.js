// Upgraded to heroku-24 stack

import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
//import Clarifai from 'clarifai'; //move clarifai to the backend (api)

/*
// Move to backend.

const app = new Clarifai.App({
  apiKey: 'da15187eb5694a0fb22b164ba4dd2757'
});
*/

const initialState = {
      input: '',
      imageUrl: '',
      box: [],    //{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  /*
  componentDidMount() {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(console.log)
  }
  */

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {

    if (data && data.outputs) {
      // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

      const allRegions = data.outputs[0].data.regions;
      // console.log(data.outputs[0].data.regions);
      // App.js is the parent here. When i have import FaceRecognition here in App.js, i can get its...
      //... respective id.
      /*
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width, //clarifaiFace.left_col is the % of width, so * by width
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), //with respect from the left side.
      bottomRow: height - (clarifaiFace.bottom_row * height) //with respect from the top
    }
    */

      // Need to persist your mappings
      const finalRegions = allRegions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;

        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          leftCol: clarifaiFace.left_col * width, //clarifaiFace.left_col is the % of width, so * by width
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width, //with respect from the left side.
          bottomRow: height - clarifaiFace.bottom_row * height, //with respect from the top
        };
      });

      return finalRegions;
    }
    return;


    /*
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // App.js is the parent here. When i have import FaceRecognition here in App.js, i can get its...
    //... respective id.
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width, //clarifaiFace.left_col is the % of width, so * by width
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), //with respect from the left side.
      bottomRow: height - (clarifaiFace.bottom_row * height) //with respect from the top
    }
    */

  }

  displayFaceBox = (box) => {
    if (box) {
      this.setState({box: box});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    //Moved clarifai call to backend. The below responses remain.
    //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(....below...

    fetch('https://stormy-temple-70795.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json()) //respond from backend is a json; convert to javascript here
    .then(response => {
      if (response) {
        fetch('https://stormy-temple-70795.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }) //1 stone kills 2 birds
    .catch(err => console.log(err));  
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      //this.setState({isSignedIn: false});
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {

    const {route, isSignedIn, box, imageUrl} = this.state;

    const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <div className="App">
      <Particles className='particles'
       id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />

      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
      { route === 'home' 
        ? <div>  
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        : (
            route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          )

        
        
      }
    </div>
  );
  }
}

export default App;
