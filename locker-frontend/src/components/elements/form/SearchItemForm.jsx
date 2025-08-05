import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Item from '../../../classes/Item';
import Autocomplete from '@mui/joy/Autocomplete';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Button from '@mui/joy/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function SearchItemForm({ onSubmission }) {
    // state variables for searchable items (total user's items), error messages, selected items and inputs, etc.
    const [searchableItems, setSearchableItems] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [itemValue, setItemValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    // variable that holds either a list containing item objects or a string with a 'no items' value
    const options = (searchableItems == null || searchableItems.length === 0)
     ? 'No items' : searchableItems.map((item) => (item));

    // effect fetches items immediately
    useEffect(() => {
        handleFetchItems();
    }, []);

    async function handleFetchItems() {
        let items = [];
        let response;
        let itemsData;

      try {
          response = await fetch(`http://localhost:8080/${userId}/items`);
            
          // catches one of two erroneous responses sent from server
          if (response.status === 204 || response.status === 400) {
              setErrorMessage(response.message);
              return;
          }
        
          // gets json out of response, formats data, and pushes to item list
          itemsData = await response.json();
          itemsData.forEach(item => {
              let newItem = new Item(item.id, item.name, item.quantity, item.description);
              items.push(newItem);
          });

          // no we have searchable items
          setSearchableItems(items);
      } catch (error) {
          setErrorMessage(error.message);
      }
    }


    async function handleFindItem() {
      let itemId = JSON.stringify(itemValue.id);
      let response;
      let itemData;

      try {
          response = await fetch(`http://localhost:8080/items/${itemId}`);
            
          if (response.status === 404) {
              setErrorMessage(response.message);
              return;
          }
        
          itemData = await response.json();
          onSubmission.closeModal();
          navigate(`/lockerlist/${itemData.lockerId}/${itemData.lockerName}/${itemData.containerId}/${itemData.containerName}`);
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
                  <FormControl
                  >
                      {/* Material UI component that holds all users items and manages state of inputs selected */}
                      <Autocomplete
                          placeholder="Search here"
                          value={itemValue}
                          onChange={(event, newValue) => {
                            setItemValue(newValue);
                          }}                   
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          options={options}
                          getOptionLabel={(option) => option.name}
                      />
                  </FormControl>
                  <Button 
                      variant="outlined" 
                      color="neutral" 
                      disabled={!itemValue}
                      size="md"
                      onClick={() => handleFindItem()}
                  >
                      Find Item
                  </Button>
              </Stack>
            )}
        </ModalDialog> 
    );
}
