import React from 'react'

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
    Paper,
} from '@material-ui/core';

const Users = ({users}) => {
    return (
        <div>
            <Typography variant="h2">Users</Typography>
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
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="left">{user.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default Users
