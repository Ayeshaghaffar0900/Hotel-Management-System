import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material';
import { toast } from 'react-toastify';
import BookingCard from './BookingCard';

const BookingList = () => {
    const { user } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            return; // Don't fetch if no user is logged in
        }

        const fetchBookings = async () => {
            try {
                const bookingsQuery = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid) // Filter by user ID
                );

                // Use onSnapshot to get real-time updates
                const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
                    const bookingList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setBookings(bookingList);
                    setLoading(false);
                }, (err) => {
                    setError(err.message);
                    setLoading(false);
                });

                // Clean up the listener when the component unmounts
                return () => unsubscribe();

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                My Bookings
            </Typography>
            {bookings.length === 0 ? (
                <Typography variant="body1">No bookings found.</Typography>
            ) : (
                <List>
                    {bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </List>
            )}
        </Container>
    );
};

export default BookingList;