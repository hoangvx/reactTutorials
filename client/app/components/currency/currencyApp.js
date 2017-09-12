import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

class CurrencyApp extends Component {
  componentDidMount() {
    this.props.fetchCountries();
    this.props.fetchRates();
  }

  changeSource(e) {
    const { value } = e.target;
    this.props.fetchCurrency(1, value, this.props.currency.target, this.props.rates.items);
  }

  changeTarget(e) {
    const { value } = e.target;
    this.props.fetchCurrency(1, this.props.currency.source, value, this.props.rates.items);
  }

  changeAmount(e) {
    const { value } = e.target;
    this.props.fetchCurrency(value, this.props.currency.source, this.props.currency.target, this.props.rates.items);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="display-4">Currency App</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-6">
              <select className="form-control" 
                value={this.props.currency.source}
                onChange={(e) => this.changeSource(e)}>
                {this.renderSelector()}
              </select>
            </div>
            <div className="form-group col-6">
              <select className="form-control" 
                value={this.props.currency.target}
                onChange={(e) => this.changeTarget(e)}>
                {this.renderSelector()}
              </select>
            </div>
          </div>
          <div className="form-group">
            <input className="form-control form-control-lg text-right" type="number" placeholder="Enter amount of money"
              value={this.props.currency.amount}
              onChange={(e) => this.changeAmount(e)}/>
          </div>
          {this.props.currency.result}
        </form>
      </div>
    );
  }

  renderSelector() {
    if (this.props.countries.isFetching) {
      return <option>Loading</option>
    } else {
      return Object.keys(this.props.countries.items).map((k, i) => {
        return <option key={i} value={k}>{this.props.countries.items[k]}</option>
      });
    }
  }
}

const mapStateToProps = state => {
  return {
      currency: state.currency,
      countries: state.countries,
      rates: state.rates
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    ActionCreators,
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyApp);
