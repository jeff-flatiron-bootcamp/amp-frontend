import React, { Component } from 'react';

export default class ConditionalContentPanel extends Component
{
    

    conditionalRender = () => {

    }

    render(){
    return (
            <>
            {this.conditionalRender()}
            </>        
    );}
}