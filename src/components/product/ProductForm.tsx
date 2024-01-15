import { Alert, FormControl, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Button from '../Button';
import BoxTitle from '../BoxTitle';

export interface IProductFormProps {
}

export default function ProductForm(props: IProductFormProps) {

  const [title, setTitle] = useState()
  const [errMsg, setErrMsg] = useState()
  const [loading, setLoading] = useState()

  const handleSubmit = ()=> {
    
  }
  
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <BoxTitle>Add New Product</BoxTitle>
        <form className="space-y-4 md:space-y-6" action="#">
          <FormControl fullWidth>
            <TextField id="title" label="Title" variant="outlined" className='w-full' defaultValue={title} />
          </FormControl>
          
          {errMsg &&
            <Alert severity="error">{errMsg}</Alert>
          }
          <Button className="w-full" onClick={handleSubmit} loading={loading}>Add</Button>
        </form>
      </div>
    </div>
  );
}
