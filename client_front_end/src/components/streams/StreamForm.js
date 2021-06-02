import React from 'react';
import { Field, reduxForm} from 'redux-form';



class StreamForm extends React.Component{

    
    
    renderError({error,touched}){

       if(touched && error)
{
return (
<div className="ui error message">
    <div className="header"> {error} </div>
</div>
);
           }
     else{
 
          }
        };



    renderInput=({input,label,meta})=>{

        const className=`field ${meta.error&&meta.touched ? 'error': ''}`
       
         return (
                 <div className={className}>
                   <label> {label}</label>
                   <input {...input} autoComplete="off"/>
                   {  this.renderError(meta) }
                  </div>
                )
    };

onSubmit=(formValues)=>{

    this.props.onSubmit(formValues);

}


    
    render() {

       
           return (
             
     
                 <form 
                 onSubmit= { this.props.handleSubmit(this.onSubmit)}
                 className="ui form error">
                   <Field name="title" component={this.renderInput} label="Enter Title : "/>
                   <Field name="description" component={this.renderInput} label="Enter Description : "/>
                   {/* <Field name="email" component={this.renderInput} label="Enter email : "/> */}
                 <button className="ui button primary">Submit</button>
                  </form>
    
                 )
        };


}


const validate = (formValues)=>{
    const errors ={};

    if(!formValues.title){
         errors.title ='you must enter a title'
    }
    if(!formValues.description){
        errors.description ='you must enter a description'
   }

//    if (!formValues.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
//     errors.email = 'Invalid email address'
//   } if (!formValues.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
//     errors.email = 'Invalid email address'
//   }

   return errors;

};



export default reduxForm({
    form:'streamForm',
    validate: validate
})(StreamForm) ;


