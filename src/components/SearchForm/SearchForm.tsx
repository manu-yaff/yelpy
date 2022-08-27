import Input from "../Input/Input";
import Button from "../Button/Button";
import style from "./SearchForm.module.scss";
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { FunctionComponent } from "react";

interface IProps {
  formFunctions: {
    setSearch: Function;
    setLocation: Function;
    sendQuery: Function;
  };
}

const SearchForm: FunctionComponent<IProps> = ({ formFunctions }) => {
  return (
    <>
      <form
        className={style["search-form"]}
        onSubmit={(event) => {
          event.preventDefault();
          formFunctions.sendQuery();
        }}
      >
        <Input
          placeholder="Search"
          icon={<MdOutlineSearch />}
          cornersStyle="left-rounded"
          onChange={(event) => formFunctions.setSearch(event.target.value)}
        />
        <Input
          placeholder="Location"
          icon={<MdOutlineLocationOn />}
          cornersStyle="right-rounded"
          onChange={(event) => formFunctions.setLocation(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
};

export default SearchForm;
