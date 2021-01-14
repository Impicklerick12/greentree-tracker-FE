import React from 'react'
import { 
    Typography,
    Grid
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(contact, information) {
    return { contact, information };
} 

const rows = [
    createData('Phone', '(07) 3800 1973'),
    createData('Email', 'nursery@nurserywholesale.com.au'),
    createData('Address', '14 Adelaide Street, Brisbane QLD 4000')
]

const Contact = () => {
    return (
        <div>
            <Typography variant="h5">
                Contact Us
            </Typography>
            

            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.978764016295!2d153.02095171505695!3d-27.469920482890775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a0467886afb%3A0x7e7af927778ca136!2s14%20Adelaide%20St%2C%20Brisbane%20City%20QLD%204000!5e0!3m2!1sen!2sau!4v1610415566345!5m2!1sen!2sau" 
                width="600" 
                height="450" 
                frameborder="0" 
                style={{ border: 0 }} 
                allowfullscreen="" 
                aria-hidden="false" 
                tabindex="0">
            </iframe>

        </div>
    )
}

export default Contact
