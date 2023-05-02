import styled from "@emotion/styled";
import { InputAdornment, TextField } from "@mui/material";

const SearchBoxStyle = styled(TextField)`
  margin-bottom: 8px;
`;

interface HeaderIconsProps {
  color: string;
  className?: string;

  onClick?: () => void;
}
const SearchIcon = (props: HeaderIconsProps) => (
  <svg
    className={props.className}
    onClick={props.onClick}
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 6.5C13 7.93437 12.5344 9.25937 11.75 10.3344L15.7062 14.2937C16.0969 14.6844 16.0969 15.3188 15.7062 15.7094C15.3156 16.1 14.6812 16.1 14.2906 15.7094L10.3344 11.75C9.25937 12.5375 7.93437 13 6.5 13C2.90937 13 0 10.0906 0 6.5C0 2.90937 2.90937 0 6.5 0C10.0906 0 13 2.90937 13 6.5ZM6.5 11C8.98437 11 11 8.98437 11 6.5C11 4.01562 8.98437 2 6.5 2C4.01562 2 2 4.01562 2 6.5C2 8.98437 4.01562 11 6.5 11Z"
      fill={props.color}
    />
  </svg>
);

const SearchBox = (props: any) => {
  const { value, onChangeEvent } = props;

  return (
    <>
      <SearchBoxStyle
        value={value}
        onChange={(e) => {
          onChangeEvent(e);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="#CF7B00" />
            </InputAdornment>
          ),
        }}
        size="small"
      />
    </>
  );
};

export default SearchBox;
