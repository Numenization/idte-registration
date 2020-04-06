import React from 'react';
import '../../css/styles.css';
import '../../css/registerform.css';

class TechDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const defaultValue = this.props.selected
      ? this.props.selected
      : '-- select a technology --';
    return (
      <select
        id={this.props.id}
        defaultValue={defaultValue}
        onChange={this.props.onChange}
      >
        <option disabled value='-- select a technology --'>
          -- select a technology --
        </option>
        {this.props.technologies.map((tech, k) => {
          return (
            <option key={k} value={tech}>
              {tech}
            </option>
          );
        })}
      </select>
    );
  }
}

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const checkboxName = this.props.id + '-checkbox';
    const dropdownName = this.props.id + '-dropdown';

    let checkbox = this.props.checked ? (
      <input
        type='checkbox'
        id={checkboxName}
        onChange={this.props.onChange}
        defaultChecked
      ></input>
    ) : (
      <input
        type='checkbox'
        id={checkboxName}
        onChange={this.props.onChange}
      ></input>
    );

    return (
      <div className='date-tech-selector-row' id={this.props.id}>
        {checkbox}
        <label htmlFor={checkboxName} id={this.props.date}>
          {this.props.text}
        </label>
        <TechDropdown
          id={dropdownName}
          technologies={this.props.technologies}
          onChange={this.props.onChange}
          selected={this.props.selected}
        ></TechDropdown>
      </div>
    );
  }
}

export { DateSelector, TechDropdown };
