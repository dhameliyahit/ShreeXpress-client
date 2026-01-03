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
            } text-white shadow-lg px-4 py-3`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center w-full">
                {/* LEFT */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-base">
                    <IoCall className="text-lg" />
                    <span className="font-bold">CALL US :</span>
                    <a href="tel:+919638601192" className="text-[#D8262D] font-bold hover:underline">
                        +91-0000000000
                    </a>
                </div>

                {/* CENTER */}
                <div className="text-center flex flex-col gap-1">
                    <div className="text-md sm:text-lg lg:text-xl font-bold tracking-wide">
                        !! THIS IS A DEMO PROJECT !!
                    </div>
                    <div className="text-red-400 text-sm lg:text-base underline decoration-wavy">
                        || श्री गणेशाय नमः ||
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-center lg:justify-end gap-4">

                    <Tooltip title="Toggle Theme" arrow>
                        <div>
                            <ThemeToggle onClick={toggleTheme} />
                        </div>
                    </Tooltip>

                    {token && user ? (
                        <Stack direction="row" spacing={1}>

                            <Link to="/" className="font-semibold hover:underline flex items-center">
                                Home
                            </Link>

                            <Button
                                variant="contained"
                                size="medium"
                                startIcon={<FaTachometerAlt />}
                                sx={{
                                    backgroundColor: '#2E7D32',
                                    '&:hover': { backgroundColor: '#1B5E20' },
                                    textTransform: 'none',
                                    px: 2
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
                                backgroundColor: '#3949ab',
                                '&:hover': { backgroundColor: '#303f9f' },
                                textTransform: 'none',
                                px: 3
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
