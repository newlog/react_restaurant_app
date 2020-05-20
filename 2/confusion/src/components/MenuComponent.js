import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Menu extends Component {

    render() {
        // Iterate for every dish and for each one return the div
        const menu = this.props.dishes.map((dish) => {
            return (
                // Whenever you construct a list of item in React, every item requires a "key" attribute.
                // The key helps React to recognize every item when rendering and only modify specific items on updates
                // onClick property in the Component properties (this.props.onClick) is a function passed from MainComponent, which eventually calls MainComponent.onDishSelect()
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;