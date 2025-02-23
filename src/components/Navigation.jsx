import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authActions';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Navigation = () => {
    const { user, role } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser())
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    toast.success('Logged out successfully!');
                    navigate('/login');
                }
            });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hotel Booking
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                Welcome, {user.username}!
                            </Typography>
                            {role === 'client' && (
                                <IconButton size="large" aria-label="show cart items" color="inherit" component={Link} to="/cart">
                                    <ShoppingCart />
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        {cart.length}
                                    </Typography>
                                </IconButton>
                            )}

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Dashboard
                                    </Link>
                                </MenuItem>

                                {role === 'admin' && (
                                    <>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/add-hotel" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                Add Hotel
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to="/hotel" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                Manage Hotels
                                            </Link>
                                        </MenuItem>
                                    </>
                                )}

                                {role === 'client' && (
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            My Bookings
                                        </Link>
                                    </MenuItem>
                                )}

                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;