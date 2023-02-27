import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface Handle {
  handleInput: Function;
  handleSearch: Function;
  handleOnSampleStarkKey: Function;
  handleOnSampleContract: Function;
  handleOnSampleSequenceID: Function;
  handleClearInput: Function;
  address: string;
}

const SearchBar = ({
  handleInput,
  handleSearch,
  handleOnSampleStarkKey,
  handleOnSampleContract,
  handleOnSampleSequenceID,
  handleClearInput,
  address,
}: Handle): JSX.Element => {
  return (
    <Stack
      spacing={4}
      direction="row"
      display="flex"
      alignItems="center"
      justify={'center'}
      padding={1}
    >
      <InputGroup width="container.md">
        <Input
          onChange={(event) => handleInput(event)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch(event);
            }
          }}
          placeholder={'Search by Sequence ID / Stark Key / Address'}
          value={address}
        ></Input>
        {address !== undefined ? (
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={(event) => handleClearInput(event)}
            >
              Clear
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
      <Button onClick={(event) => handleSearch(event)}>
        <SearchIcon />
      </Button>
      <Menu>
        <MenuButton as={Button}>Sample</MenuButton>
        <MenuList>
          <MenuItem onClick={(event) => handleOnSampleSequenceID(event)}>
            Sequence ID
          </MenuItem>
          <MenuItem onClick={(event) => handleOnSampleStarkKey(event)}>
            Stark Key
          </MenuItem>
          <MenuItem onClick={(event) => handleOnSampleContract(event)}>
            Contract Address
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default SearchBar;
