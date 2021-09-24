import React, { Component } from 'react'
import loader from './ajax-loader.gif';
export class Loader extends Component {
    render() {
        return (
            <div className="text-center">
                <p>Loading...</p>
                <img className="my-2"  src={loader} alt="loading" />
            </div>
        )
    }
}

export default Loader
