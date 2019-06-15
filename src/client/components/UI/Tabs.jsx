import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = tab => {
    this.setState({activeTab: tab});
  };

  render() {
    const {
      onClickTabItem,
      props: {children},
      state: {activeTab},
    } = this;

    return (
      <div className="tabs h-full flex flex-col flex-no-wrap items-stretch">
        <ul className="flex border-b px-2 pt-2 -mt-px flex-none">
          {children.map((child, index) => {
            const {label} = child.props;

            return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
          })}
        </ul>
        <div className="flex-1 h-0">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
