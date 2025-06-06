import css from "./SearchBox.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBox = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search notes"
      className={css.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
