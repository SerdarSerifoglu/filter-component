import { useSelector } from "react-redux";
import FilterTag from "./FilterTag";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CheckedCheckboxes = () => {
  const selectedList = useSelector((state: any) => state.filter.selectedList);

  return (
    <>
      <Wrapper>
        {selectedList.map((e: any) => {
          return (
            <>
              <FilterTag
                filterKey={e.filterKey}
                text={e.text}
                value={e.value}
                checked={e.checked}
              />
            </>
          );
        })}
      </Wrapper>
    </>
  );
};

export default CheckedCheckboxes;
