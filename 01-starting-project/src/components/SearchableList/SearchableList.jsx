import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {

    const lastChange = useRef();

    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()));
    //JSON.stringify(item) is used to convert the item to a string so that we can search for the term in the item
    //toLowerCase() is used to make the search case-insensitive
    //includes() is used to check if the search term is present in the item

    function handleChange(event) {
        if (lastChange.current) {
            clearTimeout(lastChange.current);//If the user types again before the 500ms, the previous setTimeout will be cleared
        }

        lastChange.current = setTimeout(() => {//Debouncing means that the handleChange function will only be called after 500ms of the user stopping typing
            lastChange.current = null;//This is to ensure that the clearTimeout is not called after the setTimeout
            setSearchTerm(event.target.value);//It is useful when we want to reduce the number of API calls or expensive operations
        }, 500);//It will only trigger when the user stops typing for 500ms
    }

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search..." onChange={handleChange} />
            <ul>
                {searchResults.map((item, index) => <li key={itemKeyFn(item)}>{children(item)}</li>)}
            </ul>
        </div>
    );
}