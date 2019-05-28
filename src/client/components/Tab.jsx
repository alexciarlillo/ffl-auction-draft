import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const {label, onClick} = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: {activeTab, label},
    } = this;

    let liClassName = '';
    let aClassName = 'inline-block py-2 px-4 font-semibold';

    if (activeTab === label) {
      aClassName += ' border-l border-t border-r py-2 px-4 text-gray-700 bg-gray-300';
      liClassName += ' -mb-px';
    } else {
      aClassName += ' text-gray-500 bg-gray-100';
    }

    return (
      <li className={liClassName} onClick={onClick}>
        <a className={aClassName}>{label}</a>
      </li>
    );
  }
}

export default Tab;
