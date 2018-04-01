// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import Input from './fields/Input';
import Select from './fields/Select';

// Actions
//import * as actions from './actions';

// Utils
//import { isFirstRender } from '../../lib/utils/frontend';

class Form extends Component {
  static propTypes = {
    title : PropTypes.string,
    onSubmit : PropTypes.func,
    actionLabel : PropTypes.string,
    fields : PropTypes.array
  };

  constructor(props) {
    super(props);
    this.fields = this.props.fields || [];
    this.noError = {status:null,message:''};
    //intialize state
    this.state = {
      'formData': {},
      'errors':{}
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.validate = this.validate.bind(this);
  }

  // componentWillMount() {
  //   const {
  //     match: {
  //       params: {
  //         id = 0
  //       }
  //     }
  //   } = this.props;
  //
  //   this.setState({
  //     displaySingleBook: id > 0
  //   });
  //
  //   if (id > 0) {
  //     this.props.loadSingleBook({ id });
  //   } else {
  //     this.props.loadBooks();
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     match: {
  //       params: {
  //         id = 0
  //       }
  //     }
  //   } = nextProps;
  //
  //   if (nextProps.match.params !== this.props.match.params) {
  //     this.setState({
  //       displaySingleBook: id > 0
  //     });
  //
  //     if (id > 0) {
  //       this.props.loadSingleBook({ id });
  //     }
  //   }
  // }

  // renderSingleBook(book) {
  //   return (
  //     <div>
  //       <h1>{book.title}</h1>
  //       <p>Autor: {book.author}</p>
  //       <p><img src={book.image} style={{ maxWidth: '300px' }} /></p>
  //       <p><Link to="/library">Go back</Link></p>
  //     </div>
  //   );
  // }

  // renderBooksList(books) {
  //   return (
  //     <div>
  //       <h1>Library</h1>
  //
  //       <ul>
  //         {
  //           books.map((book, key) => {
  //             return (
  //               <li key={key}>
  //                 <Link to={`/library/${book.id}`}>{book.title}</Link> - {book.author}
  //               </li>
  //             )
  //           })
  //         }
  //       </ul>
  //     </div>
  //   );
  // }

  //////////////////////////////
  handleChange(field, e) {
    console.log(e);
    var formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({ 'formData': formData });

    //si el campo tiene validacion por cada cambio
    if(field.validateOnChange){
      this.validate(field.name, field.validateOnChange);
    }

  }

  getValue(key) {
    return this.state.formData[key] || '';
  }

  getErrors(key) {
    return this.state.errors[key] || this.noError;
  }

  manageErrors(key, error){

    var errors = this.state.errors;
    if(!errors[key]){
      errors[key]={};
    }

    errors[key] = {status: error.status, message:error.message};
    this.setState({ 'errors': errors });
  }

  validate(key, validateFn) {

    if(validateFn){
      this.manageErrors(key, validateFn(this.state.formData[key]))
    }
  }

  getInputClass(key){
    return 'input-'+key;
  }

  getField(field){
    var htmlField = '';

    switch(field.type) {
      case 'select':
        htmlField = (
          <Select
            key={field.name}
            className={this.getInputClass(field.name)}
            label={field.label}
            name={field.name}
            options={field.options}
            onChange={this.handleChange.bind(this, field)}
            validate={this.validate.bind(this, field.name, field.validate)}
            helpText={field.helpText}
            size={field.size}
            error={this.getErrors(field.name)}
          />)
          break;
      case 'textarea':
          htmlField = ''
          break;
      default:
        htmlField = (
          <Input
            key={field.name}
            className={this.getInputClass(field.name)}
            label={field.label}
            name={field.name}
            value={this.getValue(field.name)}
            type={field.type}
            onChange={this.handleChange.bind(this, field)}
            validate={this.validate.bind(this, field.name, field.validate)}
            helpText={field.helpText}
            size={field.size}
            error={this.getErrors(field.name)}
          />
        )
    }

    return htmlField;
  }

  render() {

    const {
      title = 'Formulario',
      onSubmit,
      actionLabel = 'ok',
      noError = {status:null,message:''},
      formData
    } = this.props;

    var fields = this.fields.map( field =>{
      return this.getField(field);
    });

    return (
      <form className="form-container">
        <h1>{title}</h1>
          <Row>
            {fields}
          </Row>
          <button
            className="btn"
            onClick={onSubmit.bind(formData)}>
            {actionLabel}
          </button>
      </form>
    );
  }
}

export default connect(state => ({
  formData: state.form.formData
}), null)(Form);
