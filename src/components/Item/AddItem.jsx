import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
    TextField,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';

const AddItem = ({ onClose, setItems, items }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddItem = async () => {
        try {
            const itemsCollection = collection(db, 'items');
            const newItemRef = await addDoc(itemsCollection, {
                name: name,
                description: description,
            });

            const newItem = {
                id: newItemRef.id,
                name: name,
                description: description,
            };

            setItems([...items, newItem]);
            onClose();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <DialogContent>
                <DialogContentText>
                    Enter the details for the new item:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddItem} color="primary">
                    Add Item
                </Button>
            </DialogActions>
        </div>
    );
};

export default AddItem;