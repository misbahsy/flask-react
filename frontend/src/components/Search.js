import React, { useState } from 'react'

function Search(props) {
  const [ query, setQuery ] = useState('')

  const getInfo = (event) => {
    event.preventDefault();
    props.submitSearch(query)
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value)
  }

    return (
      <form onSubmit={getInfo}>
        <input
          placeholder="Search questions..."
          onChange={handleInputChange}
        />
        <input type="submit" value="Submit" className="button"/>
      </form>
    )

}

export default Search
