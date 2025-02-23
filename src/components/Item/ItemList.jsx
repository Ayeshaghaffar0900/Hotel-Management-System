import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import AddItem from './AddItem';
import EditItem from './Item/EditItem';

const ItemList = () => {
    const { role } = useSelector((state) => state.auth);
    const [items, setItems] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);
    const [isEditItemOpen, setIsEditItemOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(db, 'items');
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setItems(itemsList);
        };

        fetchItems();
    }, []);

    const handleDeleteConfirmationOpen = (id) => {
        setItemToDeleteId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setItemToDeleteId(null);
        setDeleteConfirmationOpen(false);
    };

    const handleAddItemOpen = () => {
        setIsAddItemOpen(true);
    };

    const handleAddItemClose = () => {
        setIsAddItemOpen(false);
    };

    const handleEditItemOpen = (item) => {
        setItemToEdit(item);
        setIsEditItemOpen(true);
    };

    const handleEditItemClose = () => {
        setItemToEdit(null);
        setIsEditItemOpen(false);
    };

    const handleDeleteItem = async () => {
        try {
            await deleteDoc(doc(db, 'items', itemToDeleteId));
            setItems(items.filter((item) => item.id !== itemToDeleteId));
            handleDeleteConfirmationClose();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            {role === 'admin' && (
                <Button variant="contained" color="primary" onClick={handleAddItemOpen}>
                    Add Item
                </Button>
            )}

            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={item.description} />
                        {(role === 'admin' || role === 'teacher') && (
                            <ListItemSecondaryAction>
                                {role === 'admin' && (
                                    <>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => handleEditItemOpen(item)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteConfirmationOpen(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ))}
            </List>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmationOpen}
                onClose={handleDeleteConfirmationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteItem} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Item Dialog */}
            <Dialog open={isAddItemOpen} onClose={handleAddItemClose} aria-labelledby="add-item-dialog-title">
                <DialogTitle id="add-item-dialog-title">Add New Item</DialogTitle>
                <DialogContent>
                    <AddItem onClose={handleAddItemClose} setItems={setItems} items={items} />
                </DialogContent>
            </Dialog>

            {/* Edit Item Dialog */}
            <Dialog open={isEditItemOpen} onClose={handleEditItemClose} aria-labelledby="edit-item-dialog-title">
                <DialogTitle id="edit-item-dialog-title">Edit Item</DialogTitle>
                <DialogContent>
                    <EditItem onClose={handleEditItemClose} item={itemToEdit} setItems={setItems} items={items} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItemList;