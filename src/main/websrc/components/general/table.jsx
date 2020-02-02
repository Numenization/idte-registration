import React from 'react';
import '../../css/styles.css';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rownum: this.props.rownum, data: this.props.data };
  }

  render() {
    const id = this.props.key;
    const onClick = this.props.onClick;
    const className = this.props.className;
    const cols = this.props.columns;

    return (
      <tr
        className={className}
        key={id}
        data-columns={JSON.stringify(this.state.data)}
      >
        {cols.map((col, i) => {
          if (this.state.data.hasOwnProperty(col)) {
            return (
              <td key={i} onClick={onClick}>
                {this.state.data[col]}
              </td>
            );
          }
        })}
      </tr>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curCol: null,
      nxtCol: null,
      pageX: null,
      curColWidth: null,
      nxtColWidth: null
    };

    this.resizeMouseDown = this.resizeMouseDown.bind(this);
    this.resizeMouseUp = this.resizeMouseUp.bind(this);
    this.resizeMouseMoved = this.resizeMouseMoved.bind(this);
  }

  resizeMouseDown(e) {
    const curCol = e.target.parentElement;
    const nxtCol = curCol.nextElementSibling;
    const pageX = e.pageX;

    const curColWidth = curCol.offsetWidth;
    var nxtColWidth = null;
    if (nxtCol) nxtColWidth = nxtCol.offsetWidth;

    this.setState({
      curCol: curCol,
      nxtCol: nxtCol,
      pageX: pageX,
      curColWidth: curColWidth,
      nxtColWidth: nxtColWidth
    });
  }

  resizeMouseUp(e) {
    this.setState({
      curCol: null,
      nxtCol: null,
      pageX: null,
      curColWidth: null,
      nxtColWidth: null
    });
  }

  resizeMouseMoved(e) {
    if (this.state.curCol) {
      var diffX = e.pageX - this.state.pageX;

      if (this.state.nxtCol)
        this.state.nxtCol.style.width = this.state.nxtColWidth - diffX + 'px';

      this.state.curCol.style.width = this.state.curColWidth + diffX + 'px';
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.resizeMouseMoved);
    document.addEventListener('mouseup', this.resizeMouseUp);
  }

  render() {
    const loading = this.props.loading;
    const columns = this.props.columns;
    const className = this.props.className;
    const rows = this.props.children;

    // const size = 'calc(100% * ' + (this.props.children.length + 1) + ')';
    const size = '100%';

    const resizeDivStyle = {
      top: 0,
      right: 0,
      width: '5px',
      position: 'absolute',
      cursor: 'col-resize',
      height: size,
      userSelect: 'none'
    };

    if (loading) {
      return <h2>Loading Data...</h2>;
    }

    return (
      <table className={className}>
        <thead>
          <tr>
            {columns.map((col, key) => {
              return (
                <td key={key} style={{ position: 'relative' }}>
                  {col}
                  <div
                    style={resizeDivStyle}
                    onMouseDown={this.resizeMouseDown}
                  ></div>
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {React.Children.map(rows, (child, key) => {
            return React.cloneElement(child);
          })}
        </tbody>
      </table>
    );
  }
}

export { Table, TableRow };
