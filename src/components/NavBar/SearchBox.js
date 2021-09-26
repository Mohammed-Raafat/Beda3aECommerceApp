import React, { useState } from "react";
import { Button, Input } from "semantic-ui-react";

import SearchModal from "../SearchModal";

const SearchBox = (props) => {
  const { loading } = props;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if(isSubmitting) {
      setIsSubmitting(false);
    }
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          action
          fluid
          disabled={loading}
        >
          <input value={searchTerm} onChange={handleChange} />
          <SearchModal searchTerm={isSubmitting? searchTerm : ''} >
            <Button type="submit" icon="search" disabled={loading} />
          </SearchModal>
        </Input>
      </form>
  );
};

export default SearchBox;