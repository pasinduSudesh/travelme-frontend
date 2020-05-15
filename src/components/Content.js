import React from 'react';


const Content = (props) =>{
    console.log(props);
    setTimeout(() => {
      props.history.push('/about');
    }, 2000);
    return(
        <div className="container">
        <h4 className="center">Content</h4>
        <p className="center">lorm fjkv fojnf vjoviviirb buehbujgv bg gnhbbnnjfjvf vuf bbhv beeb0f8rg-hu -wguh gw0wh84hg u r5t48 uv- vjoviviirb</p>
        </div>
    )
}   

export default Content