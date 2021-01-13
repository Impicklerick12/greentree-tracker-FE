import Alert from '@material-ui/lab/Alert';

export function successBanner(message) {
    return <Alert severity="success">{message}</Alert>
}

export function alertBanner(message) {
    return <Alert severity="error">{message}</Alert>
}