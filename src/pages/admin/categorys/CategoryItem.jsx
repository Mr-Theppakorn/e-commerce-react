import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeCategory, updateCategory } from '../../../api/category';

const CategoryItem = ({ category: { _id, name }, token, onUpdateCategoryList, onRemoveCategoryList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        updateCategory(token, _id, editedName)
            .then((res) => {
                onUpdateCategoryList(res.data);
            }).catch((err) => {
                console.log(err);
            });
        setIsEditing(false);
    };

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            removeCategory(token, _id)
                .then((res) => {
                    onRemoveCategoryList(_id);
                }).catch((err) => {
                    console.log(err);
                });
        }
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedName(name);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setEditedName(event.target.value);
    };



    return (
        <div className='bg-blue-600 p-3 m-3 rounded w-full h-full'>
            {isEditing ? (
                <div>
                    <TextField variant='outlined' value={editedName} onChange={handleChange} />
                    <Button className='text-white' onClick={handleSaveClick}>Save</Button>
                    <Button className='text-white' onClick={handleCancelClick}>Cancel</Button>
                </div>
            ) : (
                <div className='flex justify-between'>
                    <div>{name}</div>
                    <div className='flex justify-self-end'>
                        <EditIcon onClick={handleEditClick} />
                        <DeleteIcon onClick={onDelete} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryItem;