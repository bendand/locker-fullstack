import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Item from '../../../classes/Item';
import Autocomplete from '@mui/joy/Autocomplete';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Button from '@mui/joy/Button';
import { useState, useEffect } from 'react';

export default function SearchItemForm() {
    const [searchableItems, setSearchableItems] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [itemValue, setItemValue] = useState();
    const [inputValue, setInputValue] = useState('');
    const userId = sessionStorage.getItem('userId');

    console.log('search input\'s options: ');
    if (searchableItems !== null) {
      console.log(searchableItems);
    }


    useEffect(() => {
        handleFetchItems();
    }, []);

    async function handleFetchItems() {
        let items = [];
        let response;
        let itemsData;

      try {
          response = await fetch(`http://localhost:8080/${userId}/items`);
            
          if (response.status === 204 || response.status === 400) {
              console.log('response message');
              console.log(response.message);
              setErrorMessage(response.message);
              return;
          }
        
          itemsData = await response.json();
          itemsData.forEach(item => {
              let newItem = new Item(item.itemId, item.name, item.quantity, item.description);
              items.push(newItem);
          });

          setSearchableItems(items);
      } catch (error) {
          setErrorMessage(error.message);
      }
    }


    return (
        <ModalDialog>
            <DialogTitle>Find an item</DialogTitle>
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
            {searchableItems !== null && (
              <Stack spacing={2} sx={{ width: 300 }}>
                  <FormControl>
                      <Autocomplete
                          name='searchInput'
                          placeholder="Search here"
                          value={itemValue}
                          onChange={(event, newItemValue) => {
                            setItemValue(newItemValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          options={searchableItems == null && searchableItems.length === 0 ? 'No items' : searchableItems.map((item) => item.name)}
                      />
                  </FormControl>
                  <Button 
                      variant="outlined" 
                      color="neutral" 
                      disabled={!itemValue}
                      size="md"
                  >
                      Find Item
                  </Button>
              </Stack>
            )}
        </ModalDialog> 
    );
}
