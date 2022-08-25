import Input from "../Input/Input";
import Button from "../Button/Button";
import UseFetch from "../../hooks/useFetch";
import { MdOutlineSearch } from "react-icons/md";
import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { SEARCH_QUERY } from "../../graphql/queries";
import { SearchApiResponse } from "../../types/Buesiness";
import style from "./SearchForm.module.scss";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const {
    fetchedData: searchResult,
    loading,
    error,
    sendQuery,
  } = UseFetch<SearchApiResponse>(SEARCH_QUERY, {
    term: search,
    location: location,
    limit: 10,
  });

  return (
    <>
      <form className={style["search-form"]}>
        <Input
          placeholder="Search"
          icon={<MdOutlineSearch />}
          cornersStyle="input--left-rounded"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Input
          placeholder="Location"
          icon={<MdOutlineLocationOn />}
          cornersStyle="input--right-rounded"
          onChange={(event) => setLocation(event.target.value)}
        />
        <Button onClick={() => sendQuery()}>Search</Button>
      </form>
      {loading && <h3>Loading...</h3>}
      {error && <h3>{error.message}</h3>}
      {searchResult &&
        searchResult.search?.business.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
    </>
  );
};

export default SearchForm;
