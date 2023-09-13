import React, { useState, useMemo } from 'react' // for debounce search
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import {FormRow, FormRowSelect} from './index'


export default function SearchContainer() {
  const [localSearch, setLocalSearch] = useState('') // for debounce search
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useAppContext()

 // for regular search (select)
  const handleSearch = (e) => {
    handleChange({name: e.target.name, value: e.target.value})
  }


  // for debounce search
  const debouncedHandleSearch = useMemo(() => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value); // display typing input
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value }); // search 1s after type
      }, 1000);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow labelText='Search' type='text' name='search' value={localSearch} handleChange={debouncedHandleSearch} />
          {/* search by status */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />
          {/* search by jobType */}
          <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />
          {/* sort */}
          <FormRowSelect labelText='sort' name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}
