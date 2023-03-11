import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

class SearchBar extends React.Component {
  state = {
    searchTerm: "",
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.searchTerm);
  };

  handleSearch = (value) => {
    this.props.handleFormSubmit(value);
  };

  render() {
    return (
      <div className="flex justify-center">
        <form onSubmit={this.handleSubmit}>
          <Search
            className=" w-96 justify-center rounded-full shadow-lg"
            placeholder="Search"
            enterButton={<SearchOutlined />}
            size="large"
            onChange={this.handleChange}
            value={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
