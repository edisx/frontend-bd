import React from 'react';
import { Link } from 'react-router-dom';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    let activeStep = 0;
    if (step1) activeStep = 1;
    if (step2) activeStep = 2;
    if (step3) activeStep = 3;
    if (step4) activeStep = 4;

    activeStep -= 1;

    const steps = ['Log In', 'Shipping', 'Payment', 'Place Order'];

    return (
        <Box sx={{ width: '100%', mb: 6 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    let linkPath = "";

                    switch (index) {
                        case 0:
                            linkPath = "/login";
                            break;
                        case 1:
                            linkPath = "/shipping";
                            break;
                        case 2:
                            linkPath = "/payment";
                            break;
                        case 3:
                            linkPath = "/placeorder";
                            break;
                        default:
                            break;
                    }

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel>
                                {index < activeStep ? (
                                    <Link to={linkPath} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {label}
                                    </Link>
                                ) : (
                                    <span style={{ color: index === activeStep ? '#1976d2' : '#c0c0c0' }}>
                                        {label}
                                    </span>
                                )}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default CheckoutSteps;
