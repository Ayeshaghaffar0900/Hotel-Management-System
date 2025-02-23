import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
    TextField,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';

const EditItem = ({ onClose, item, setItems, items }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
        }
    }, [item]);

    const handleEditItem = async () => {
        try {
            const itemDocRef = doc(db, 'items', item.id);
            await updateDoc(itemDocRef, {
                name: name,
                description: description,
            });

            // Update the item in the local state
            const updatedItems = items.map((i) =>
                i.id === item.id ? { ...i, name: name, description: description } : i
            );
            setItems(updatedItems);

            onClose();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            <DialogContent>
                <DialogContentText>
                    Edit the details for the item:
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
                <Button onClick={handleEditItem} color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </div>
    );
};

export default EditItem;