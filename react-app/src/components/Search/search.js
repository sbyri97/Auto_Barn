import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCars } from '../../store/search';
import '../AllCars/allcars.css'
import CarSearch from './CarSearch';
import PreSearch from './preSearch';

export default function SearchCars() {
    const [results, setResults] = useState(true)
    const [searchItem, setSearchItem] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            dispatch(searchCars(searchItem))
          }, 500)
          return () => clearTimeout(delaySearch)
    }, [searchItem, dispatch])


    return (
        <div>
            <div className='search-form-outer'>
                <form className='search-form-inner'>
                    <input className="search-bar-main-search"
                    text='text'
                    placeholder="Search for Vehicles by Make or Model"
                    value={searchItem}
                    onChange={(e) => {
                        setSearchItem(e.target.value)
                        setResults(false)
                    }}
                    />
                </form>
            </div>
            <div className='search-results-main-container'>
                {(!searchItem) ?
                    <PreSearch />
                :
                    <div>
                        <CarSearch searchItem={searchItem} results={results}/>
                    </div>
                }
            </div>
        </div>
    )
}
