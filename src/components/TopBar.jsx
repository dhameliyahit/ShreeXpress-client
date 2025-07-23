import React, { useContext } from 'react';
import { IoCall } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '../context/Theme/ThemeContext';
import useAuth from '../hooks/useAuth';
import { Button, Stack, Tooltip } from '@mui/material';
import { FaTachometerAlt } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from "react-icons/fi";

export const TopBar = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`${theme === 'dark' ? 'bg-[#111317] border-b border-[#1F242A]' : 'bg-[#292929]'} text-white flex justify-between items-center flex-wrap shadow-lg py-2 px-4`}>
            {/* Left - Call Info */}
            <div className="flex items-center gap-2">
                <IoCall className="text-lg" />
                <span className="text-sm font-bold">CALL US NOW :</span>
                <a href="tel:+919638601192" className="text-sm font-bold text-[#D8262D] hover:underline">+91-9638601192</a>
            </div>

            {/* Right - Theme, Links & Buttons */}
            <div className="flex items-center gap-3 ml-auto">
                <Tooltip title="Toggle Theme" arrow>
                    <div><ThemeToggle onClick={toggleTheme} /></div>
                </Tooltip>

                {token && user ? (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '10px',
                        }}
                    >
                        <Link
                            to="/"
                            className="text-sm font-medium text-white hover:underline underline-offset-4"
                        >
                            Home
                        </Link>

                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FaTachometerAlt />}
                            sx={{
                                fontSize: '0.8rem',
                                textTransform: 'none',
                                backgroundColor: '#2E7D32', // dark muted green
                                color: '#fff',
                                fontWeight: 500,
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#1B5E20',
                                    boxShadow: 'none',
                                    transform: 'translateY(-1px)',
                                },
                            }}
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        variant="contained"
                        size="medium"
                        startIcon={<FiLogIn />}
                        sx={{
                            backgroundColor: '#3949ab', // classic muted blue
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 500,
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#303f9f',
                                transform: 'translateY(-1px)',
                            },
                        }}
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                )}

            </div>
        </div>
    );
};
