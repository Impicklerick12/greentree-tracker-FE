import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Button,
    Grid
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    userEmail: {
        filter: "blur(3px)",
        '&:hover': {
            filter: 'none'
        }
    }
}))

const Users = ({users, loading}) => {
    const classes = useStyles()

    return (
        <div>
            <Typography variant="h2">Users</Typography>
            { loading ? (
                <Grid container justify="center">
                    <CircularProgress color="secondary" size={100}/>
                </Grid>
            ) : (
                <Card>
                    <CardContent>
                        <TableContainer>
                            <Table aria-label="Quote Plant Table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><strong>User ID</strong></TableCell>
                                        <TableCell align="left"><strong>Username</strong></TableCell>
                                        <TableCell align="left"><strong>Email</strong></TableCell>
                                        <TableCell align="left"><strong>Role</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { users.map((user, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">{user._id}</TableCell>
                                            <TableCell align="left">{user.username}</TableCell>
                                            <TableCell align="left" className={classes.userEmail}>{user.email}</TableCell>
                                            <TableCell align="left">{user.role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Users
