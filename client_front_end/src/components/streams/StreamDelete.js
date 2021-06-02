import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import {deleteStream,fetchStream} from '../../actions';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
        
    }


    deleteStreamNow(props){
        this.props.deleteStream(this.props.match.params.id);
    }



renderActions(){

    return (

        <React.Fragment>
       <button onClick={e=>{this.deleteStreamNow(this.props.match.params.id)}} className="ui button negative">Delete</button>
         <Link to="/" className="ui button">Cancel</Link>
         </React.Fragment>
    );
    }

renderContent = ()=>{
    if(!this.props.stream){
        return 'Are you Sure You Want To Delete This  Stream ?'
    }
    else {
        return `Are you Sure You Want To Delete  Stream  with Title: ${this.props.stream.title}`
    }
}


    render() {

    return (
        <Modal
        title="Delete Stream"
        content={this.renderContent()}
       actions = {this.renderActions()}
       onDismiss={()=> history.push('/')}
        />
    );

    }


}

const mapStateToProps = (state,ownProps)=>{
return{stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,deleteStream}) (StreamDelete) ;