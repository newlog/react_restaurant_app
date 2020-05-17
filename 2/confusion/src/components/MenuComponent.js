import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Iterate for every dish and for each one return the div
        const menu = this.props.dishes.map((dish) => {
            return (
                // Whenever you construct a list of item in React, every item requires a "key" attribute.
                // The key helps React to recognize every item when rendering
                <div key={dish.id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={dish.image} alt={dish.name}/>
                        </Media>
                        <Media body className="ml-5">
                            <Media heading>{dish.name}</Media>
                            <p>{dish.description}</p>
                        </Media>
                    </Media>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        );
    }

}

export default Menu;