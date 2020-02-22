import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Location extends Component {
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
      render() {
        return (
            <div>
                <section className="about_us_2 about_us_2_animated">
                    <div className="about_text">
                    <div style={{ height: '100vh', width: '100%' }}>
                            <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyAtqgKhqfCi91s3GL1SM5HEt9pfqQvnZDw' }}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                            >
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                            </GoogleMapReact>
                        </div>
                    </div>
                    </section>
            </div>
        )
      }
}
export default Location;