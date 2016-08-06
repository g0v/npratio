import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Suggestions from './Suggestions';

const keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40
};

const initialState = {
  highlightedItem: -1,
  searchTerm: '',
  suggestions: [],
  value: ''
}

class SearchBar extends React.Component {

  state = initialState;

  componentWillMount() {
    const { onChange, delay } = this.props;

    this.setState(initialState);

    this.autosuggest = _.debounce((input) => {
      if (!input) {
        this.setState(initialState);
        return;
      }

      onChange(input, (suggestions) => {
        this.setState({
          highlightedItem: -1,
          searchTerm: input,
          suggestions
        });
      });
    }, delay || 1000);
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) this.refs.input.focus();
  }

  normalize(input) {
    return (input || '').toLowerCase().trim();
  }

  scroll(key) {
    const { highlightedItem: item, suggestions } = this.state;
    const lastItem = suggestions.length - 1;
    let nextItem;

    if (key === keyCodes.UP) {
      nextItem = (item <= 0) ? lastItem : item - 1;
    } else {
      nextItem = (item === lastItem) ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: nextItem,
      value: suggestions[nextItem].name
    });
  }

  search(target) {
    const { onSearch } = this.props;

    this.refs.input.blur();

    const { highlightedItem, suggestions } = initialState;
    this.setState({ highlightedItem, suggestions, value: target.name });

    if (onSearch) onSearch(target);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
    this.autosuggest(this.normalize(e.target.value));
  }

  onKeyDown = (e) => {
    const { highlightedItem, suggestions } = this.state;

    const key = e.which || e.keyCode;
    switch (key) {
      case keyCodes.UP:
      case keyCodes.DOWN:
        e.preventDefault();
        this.scroll(key);
        break;
      case keyCodes.ENTER:
        this.search(suggestions[highlightedItem < 0 ? 0 : highlightedItem]);
        break;
      case keyCodes.ESCAPE:
        this.refs.input.blur();
        break;
      default:
    }
  }

  onSelection = (suggestion) => this.search(suggestion);

  onSearch(e) {
    const { highlightedItem, suggestions } = this.state;
    this.search(suggestions[highlightedItem < 0 ? 0 : highlightedItem]);
  }

  render() {
    const { suggestions, isFocused } = this.state;
    return (
      <div className="search-bar-wrapper">
        <div className={classNames(
          'search-bar-field',
          {'is-focused': isFocused},
          {'has-suggestions': suggestions.length > 0}
        )}>
          <input
            className="search-bar-input"
            name={this.props.inputName}
            type="text"
            maxLength="100"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            ref="input"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange.bind(this)}
            onBlur={() => this.setState({isFocused: false, suggestions: []})}
            onKeyDown={this.state.suggestions && this.onKeyDown.bind(this)}
            onFocus={() => this.setState({isFocused: true})} />
            { this.state.value &&
              <span
                className="icon search-bar-clear"
                onClick={() => this.setState(initialState)}>
              </span> }
          <input
            className="icon search-bar-submit"
            type="submit"
            onClick={this.onSearch} />
        </div>
        { this.state.suggestions.length > 0 &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.onSelection.bind(this)} /> }
      </div>
    );
  }
}

SearchBar.propTypes = {
  autoFocus: React.PropTypes.bool,
  delay: React.PropTypes.number,
  inputName: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func,
  placeholder: React.PropTypes.string
};

SearchBar.defaultProps = {
  autoFocus: true,
  delay: 200
};

export default SearchBar;
