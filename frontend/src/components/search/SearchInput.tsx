import { ChangeEvent, FC } from "react";
import { TextField } from "@mui/material";

type SearchInputProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
};

export const SearchInput: FC<SearchInputProps> = ({
  handleChange,
  searchTerm,
}) => {
  return (
    <TextField
      sx={{
        width: "100%",
      }}
      type="search"
      label="Search books"
      margin="normal"
      size="small"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
