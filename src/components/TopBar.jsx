import React, { useContext } from 'react';
import { IoCall } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ThemeContext from '../context/Theme/ThemeContext';
import useAuth from '../hooks/useAuth';
import { Button, Stack, Tooltip } from '@mui/material';
import { FaTachometerAlt } from 'react-icons/fa';
import { FiLogIn } from "react-icons/fi";

export const TopBar = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`w-full ${theme === 'dark'
            ? 'bg-[#111317] border-b border-[#1F242A]'
            : 'bg-[#292929]'
            } text-white shadow-lg px-3 py-2`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full">
                {/* LEFT */}
                <div className='self-start flex sm:justify-evenly justify-between items-center w-full'>
                    <div className="flex items-center gap-1 text-sm sm:text-base">
                        <IoCall className="text-base sm:text-lg" />
                        <span className="font-semibold">CALL US :</span>
                        <a href="tel:+919638601192" className="text-[#D8262D] font-bold hover:underline text-sm sm:text-base">
                            +91-0000000
                        </a>
                    </div>

                    {/* CENTER */}
                    <div className="flex flex-col items-center sm:flex-1 text-center text-xs sm:text-sm md:text-base">
                        <div className="font-bold text-wrap wrap-anywhere tracking-wide truncate max-w-[180px] sm:max-w-[250px]">
                            !! THIS IS A DEMO PROJECT !!
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center sm:ml-0 ml-auto gap-2 sm:gap-4">
                    <Tooltip title="Toggle Theme" arrow>
                        <div>
                            <ThemeToggle onClick={toggleTheme} />
                        </div>
                    </Tooltip>

                    {token && user ? (
                        <Stack direction="row" spacing={1}>
                            <Link to="/" className="font-semibold hover:underline flex items-center text-sm sm:text-base">
                                Home
                            </Link>
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<FaTachometerAlt />}
                                sx={{
                                    backgroundColor: '#2E7D32',
                                    '&:hover': { backgroundColor: '#1B5E20' },
                                    textTransform: 'none',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.75rem'
                                }}
                                onClick={() => navigate("/dashboard")}
                            >
                                Dashboard
                            </Button>
                        </Stack>
                    ) : (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FiLogIn />}
                            sx={{
                                backgroundColor: '#3949ab',
                                '&:hover': { backgroundColor: '#303f9f' },
                                textTransform: 'none',
                                px: 2,
                                py: 0.5,
                                fontSize: '0.75rem'
                            }}
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
