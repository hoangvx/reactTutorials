import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

class CurrencyApp extends Component {

  btnClicked() {
    this.props.fetchCurrency(1, 'USA', 'JPY');
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Currency App</h1>
        {this.props.currency.amount}
        <button onClick={() => this.btnClicked() }>Test</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    ActionCreators,
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyApp);
